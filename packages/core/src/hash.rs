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

//! BLAKE3 ハッシュ計算モジュール

use std::io::Read;
use std::path::Path;

use anyhow::Result;

/// ファイルの BLAKE3 ハッシュを計算する
///
/// # Arguments
///
/// * `path` - ハッシュを計算するファイルのパス
///
/// # Returns
///
/// 64文字の16進数文字列としてのハッシュ値
///
/// # Example
///
/// ```ignore
/// use bvcp_core::compute_blake3;
///
/// let hash = compute_blake3("path/to/file.png")?;
/// println!("Hash: {}", hash); // 64文字の16進数
/// ```
pub fn compute_blake3<P: AsRef<Path>>(path: P) -> Result<String> {
    let mut file = std::fs::File::open(path)?;
    let mut hasher = blake3::Hasher::new();

    let mut buffer = [0u8; 65536]; // 64KB buffer
    loop {
        let bytes_read = file.read(&mut buffer)?;
        if bytes_read == 0 {
            break;
        }
        hasher.update(&buffer[..bytes_read]);
    }

    Ok(hasher.finalize().to_hex().to_string())
}

/// バイトスライスの BLAKE3 ハッシュを計算する
///
/// # Arguments
///
/// * `data` - ハッシュを計算するバイトデータ
///
/// # Returns
///
/// 64文字の16進数文字列としてのハッシュ値
pub fn compute_blake3_bytes(data: &[u8]) -> String {
    blake3::hash(data).to_hex().to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compute_blake3_bytes() {
        let data = b"Hello, BVCP!";
        let hash = compute_blake3_bytes(data);

        // BLAKE3 ハッシュは常に64文字
        assert_eq!(hash.len(), 64);

        // 同じ入力は同じハッシュを生成
        let hash2 = compute_blake3_bytes(data);
        assert_eq!(hash, hash2);
    }

    #[test]
    fn test_different_input_different_hash() {
        let hash1 = compute_blake3_bytes(b"Hello");
        let hash2 = compute_blake3_bytes(b"World");

        assert_ne!(hash1, hash2);
    }
}
