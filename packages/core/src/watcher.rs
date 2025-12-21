// Copyright 2025 Yorikawa Aise
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! ファイル監視モジュール
//!
//! 指定ディレクトリ内のファイル変更を監視し、イベントを通知します。

use std::path::Path;
use std::sync::mpsc::{channel, Receiver};
use std::time::Duration;

use anyhow::Result;
use notify::{Config, Event, RecommendedWatcher, RecursiveMode, Watcher};
use thiserror::Error;

/// ファイル監視エラー
#[derive(Error, Debug)]
pub enum WatcherError {
    #[error("監視の初期化に失敗しました: {0}")]
    InitializationFailed(String),

    #[error("パスの監視に失敗しました: {0}")]
    WatchFailed(String),
}

/// ファイル変更イベントの種類
#[derive(Debug, Clone, PartialEq)]
pub enum FileEventKind {
    /// ファイルが作成された
    Created,
    /// ファイルが変更された
    Modified,
    /// ファイルが削除された
    Removed,
    /// ファイルがリネームされた
    Renamed,
    /// その他のイベント
    Other,
}

/// ファイル変更イベント
#[derive(Debug, Clone)]
pub struct FileEvent {
    /// イベントの種類
    pub kind: FileEventKind,
    /// 対象ファイルのパス
    pub paths: Vec<std::path::PathBuf>,
}

impl From<Event> for FileEvent {
    fn from(event: Event) -> Self {
        use notify::EventKind;

        let kind = match event.kind {
            EventKind::Create(_) => FileEventKind::Created,
            EventKind::Modify(_) => FileEventKind::Modified,
            EventKind::Remove(_) => FileEventKind::Removed,
            EventKind::Other => FileEventKind::Other,
            _ => FileEventKind::Other,
        };

        FileEvent {
            kind,
            paths: event.paths,
        }
    }
}

/// ファイル監視を行う構造体
pub struct FileWatcher {
    _watcher: RecommendedWatcher,
    receiver: Receiver<Result<Event, notify::Error>>,
}

impl FileWatcher {
    /// 新しい FileWatcher を作成し、指定パスの監視を開始する
    ///
    /// # Arguments
    ///
    /// * `path` - 監視するディレクトリのパス
    ///
    /// # Example
    ///
    /// ```ignore
    /// use bvcp_core::watcher::FileWatcher;
    ///
    /// let watcher = FileWatcher::new("./my-project")?;
    /// for event in watcher.events() {
    ///     println!("Event: {:?}", event);
    /// }
    /// ```
    pub fn new<P: AsRef<Path>>(path: P) -> Result<Self, WatcherError> {
        let (tx, rx) = channel();

        let mut watcher = RecommendedWatcher::new(
            move |res| {
                let _ = tx.send(res);
            },
            Config::default().with_poll_interval(Duration::from_secs(1)),
        )
        .map_err(|e| WatcherError::InitializationFailed(e.to_string()))?;

        watcher
            .watch(path.as_ref(), RecursiveMode::Recursive)
            .map_err(|e| WatcherError::WatchFailed(e.to_string()))?;

        Ok(FileWatcher {
            _watcher: watcher,
            receiver: rx,
        })
    }

    /// イベントを受信する（ブロッキング）
    pub fn recv(&self) -> Option<FileEvent> {
        match self.receiver.recv() {
            Ok(Ok(event)) => Some(FileEvent::from(event)),
            _ => None,
        }
    }

    /// イベントを受信する（タイムアウト付き）
    pub fn recv_timeout(&self, timeout: Duration) -> Option<FileEvent> {
        match self.receiver.recv_timeout(timeout) {
            Ok(Ok(event)) => Some(FileEvent::from(event)),
            _ => None,
        }
    }

    /// イベントを受信する（ノンブロッキング）
    pub fn try_recv(&self) -> Option<FileEvent> {
        match self.receiver.try_recv() {
            Ok(Ok(event)) => Some(FileEvent::from(event)),
            _ => None,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use std::time::Duration;

    #[test]
    fn test_file_event_kind() {
        let event = FileEvent {
            kind: FileEventKind::Created,
            paths: vec![],
        };
        assert_eq!(event.kind, FileEventKind::Created);
    }

    #[test]
    fn test_watcher_creation() {
        let temp_dir = std::env::temp_dir().join("bvcp_test_watcher");
        fs::create_dir_all(&temp_dir).unwrap();

        let result = FileWatcher::new(&temp_dir);
        assert!(result.is_ok());

        fs::remove_dir_all(&temp_dir).ok();
    }

    #[test]
    fn test_watcher_detects_file_creation() {
        let temp_dir = std::env::temp_dir().join("bvcp_test_watcher_create");
        fs::create_dir_all(&temp_dir).unwrap();

        let watcher = FileWatcher::new(&temp_dir).unwrap();

        // ファイルを作成
        let test_file = temp_dir.join("test.txt");
        fs::write(&test_file, "Hello, BVCP!").unwrap();

        // イベントを待機（タイムアウト付き）
        let event = watcher.recv_timeout(Duration::from_secs(2));

        // クリーンアップ
        fs::remove_dir_all(&temp_dir).ok();

        // イベントが検出されたことを確認
        assert!(event.is_some());
    }
}
