# BVCP 仕様書 v1.0

**Binary Version Control Platform**

- **作成日**: 2024-12-21
- **ステータス**: Draft
- **対象リポジトリ**: [bvcp](https://github.com/[your-username]/bvcp)

---

## 目次

1. [本仕様書の位置づけ](#1-本仕様書の位置づけ)
2. [プロジェクト概要](#2-プロジェクト概要)
3. [想定ユーザー](#3-想定ユーザー)
4. [リポジトリ作成・公開方針](#4-リポジトリ作成公開方針)
5. [GitHub に含める／含めないもの](#5-github-に含める含めないもの)
6. [リポジトリ構成（monorepo）](#6-リポジトリ構成monorepo)
7. [技術スタック詳細](#7-技術スタック詳細)
8. [システム構成概要](#8-システム構成概要)
9. [バージョン管理方式](#9-バージョン管理方式)
10. [ストレージ設計](#10-ストレージ設計)
11. [無料・課金方針](#11-無料課金方針)
12. [GitHub 開発フロー](#12-github-開発フロー)
13. [セキュリティ・公開ポリシー](#13-セキュリティ公開ポリシー)
14. [本プロジェクトの位置づけ](#14-本プロジェクトの位置づけ)
15. [実装開始までの手順（Next Actions）](#15-実装開始までの手順next-actions)

---

## 1. 本仕様書の位置づけ

本仕様書は、Binary Version Control Platform（BVCP）の**設計・実装・運用の基盤となる公式ドキュメント**である。

### 目的

- プロジェクトの技術的方針を明文化する
- 開発者・コントリビューターへのオンボーディング資料とする
- GitHub Public リポジトリでの継続開発を支える基盤とする

### 対象読者

- 開発参加者（コントリビューター）
- 技術レビュアー
- 学術・研究目的での参照者

### 更新方針

本仕様書は `docs/spec.md` に配置し、Pull Request を通じて更新する。  
重要な変更は CHANGELOG セクションまたは別ファイルで追跡する。

---

## 2. プロジェクト概要

### 名称

**Binary Version Control Platform（BVCP）**

### ミッション

バイナリファイル（画像・音声・動画・3Dモデル・DAWプロジェクト等）に特化したバージョン管理プラットフォームを構築し、クリエイターの制作ワークフローを革新する。

### 背景

Git は優れたバージョン管理システムだが、以下の点でバイナリファイルの管理に課題がある：

| 課題 | 詳細 |
|------|------|
| 差分管理 | バイナリは差分計算が非効率、リポジトリ肥大化 |
| プレビュー | GitHub 上でのバイナリ差分可視化が不十分 |
| 大容量対応 | Git LFS は追加コスト・設定が必要 |
| 履歴保持 | 大容量バイナリの全履歴管理は現実的でない |

### 解決アプローチ

BVCP は以下の設計思想で課題を解決する：

1. **オブジェクト分離**: バイナリ本体とメタデータを分離管理
2. **ハッシュ単位管理**: BLAKE3 によるコンテンツアドレス管理
3. **柔軟なストレージ**: Managed / External（Google Drive等）の切替
4. **差分可視化**: 対応形式でのビジュアル差分表示
5. **GitHub 思想の踏襲**: 履歴・レビュー・無料＋規模課金モデル

---

## 3. 想定ユーザー

### 主要ターゲット

| ユーザー層 | 用途 |
|-----------|------|
| イラストレーター | PSD, PNG, SVG 等の版管理 |
| 映像クリエイター | 動画プロジェクト・素材管理 |
| 音楽制作者 | DAW プロジェクト・音源管理 |
| 3D アーティスト | Blender, Maya 等のシーンファイル管理 |
| ゲーム開発者 | アセット（テクスチャ・モデル・音声）管理 |
| 研究者・学生 | 実験データ・成果物の履歴管理 |

### ペルソナ例

**ペルソナ A: 個人イラストレーター**
- 制作データを自分で管理したい
- 履歴を遡って差分確認したい
- ストレージは Google Drive を使いたい
- 無料で基本機能を使いたい

**ペルソナ B: 小規模ゲームスタジオ**
- チームでアセットを共有管理したい
- レビューワークフローを導入したい
- ストレージ容量に応じた課金は許容
- Desktop アプリで効率的に操作したい

---

## 4. リポジトリ作成・公開方針

### 基本方針

| 項目 | 決定事項 |
|------|----------|
| 可視性 | **Public** |
| ライセンス | Apache License 2.0 |
| ホスティング | GitHub |
| 開発形態 | オープンソース開発 |

### Public 運用の理由

1. **透明性**: 設計・コードの公開による信頼性確保
2. **コミュニティ**: コントリビューターの参加促進
3. **学習資源**: 学生・研究者への教育的価値提供
4. **フィードバック**: Issue / Discussion による改善サイクル

### 公開における制約

- 大容量バイナリファイルは含めない
- 実運用データは一切含めない
- 秘密鍵・トークン等のシークレットは含めない
- 個人情報・プライベートデータは含めない

---

## 5. GitHub に含める／含めないもの

### 含めるもの

| カテゴリ | 内容 |
|----------|------|
| ソースコード | 全アプリケーション・ライブラリのコード |
| 設計ドキュメント | 仕様書、設計書、ADR（Architecture Decision Records） |
| 設定ファイル | Docker Compose, CI 設定, ESLint 等 |
| テストコード | ユニットテスト、E2E テスト |
| ドキュメント | README, CONTRIBUTING, LICENSE |
| サンプルデータ | 開発用の軽量テストデータ（数KB〜数十KB） |

### 含めないもの

| カテゴリ | 理由 |
|----------|------|
| 大容量バイナリ | リポジトリ肥大化防止 |
| 実運用データ | セキュリティ・プライバシー |
| シークレット | `.env` 等のローカルファイルで管理 |
| ビルド成果物 | `dist/`, `build/` は `.gitignore` で除外 |
| 依存関係 | `node_modules/`, `target/` 等は除外 |
| 個人設定 | `.vscode/settings.json` 等のローカル設定 |

### Git LFS について

**Git LFS は原則使用しない。**

理由：
- 本プロジェクト自体がバイナリ管理の代替ソリューション
- LFS の管理コスト・複雑性を排除
- GitHub Free の LFS 制限を回避

---

## 6. リポジトリ構成（monorepo）

### ディレクトリ構造

```
bvcp/
├── README.md                 # プロジェクト概要
├── LICENSE                   # ライセンス
├── .github/
│   ├── workflows/            # GitHub Actions
│   ├── ISSUE_TEMPLATE/       # Issue テンプレート
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── spec.md               # 本仕様書
│   ├── architecture.md       # アーキテクチャ設計
│   ├── api/                  # API ドキュメント
│   └── adr/                  # Architecture Decision Records
├── apps/
│   ├── web/                  # Next.js Web アプリ
│   ├── desktop/              # Tauri + React Desktop アプリ
│   └── api/                  # Fastify Backend API
├── packages/
│   ├── core/                 # Rust 同期・差分コア
│   ├── shared/               # TypeScript 共有ライブラリ
│   └── ui/                   # React UI コンポーネント
├── infra/
│   ├── docker/               # Dockerfile 群
│   ├── compose/              # Docker Compose 設定
│   └── scripts/              # インフラスクリプト
├── .gitignore
├── .gitattributes
├── package.json              # root package.json (workspaces)
└── Cargo.toml               # Rust workspace
```

### monorepo 採用理由

1. **依存関係の一元管理**: packages/ で共有コードを管理
2. **CI の統合**: 単一リポジトリで全体テスト・ビルド
3. **コードレビューの効率化**: 関連変更を単一 PR で管理
4. **バージョン同期**: apps/ と packages/ のバージョン整合性確保

### ワークスペース管理

- **TypeScript**: npm workspaces または pnpm workspaces
- **Rust**: Cargo workspace

---

## 7. 技術スタック詳細

### コア（同期・差分エンジン）

| 項目 | 技術 | 理由 |
|------|------|------|
| 言語 | Rust | 高速・安全・クロスプラットフォーム |
| ハッシュ | BLAKE3 | 高速・セキュア・ストリーミング対応 |
| 差分 | bsdiff / rolling hash（検討中） | バイナリ差分圧縮 |

### Desktop アプリ

| 項目 | 技術 | 理由 |
|------|------|------|
| フレームワーク | Tauri 2.x | 軽量・Rust バックエンド統合 |
| UI | React + TypeScript | 開発効率・エコシステム |
| スタイリング | CSS Modules / Tailwind（検討中） | コンポーネント単位のスタイル管理 |
| 対応 OS | Windows, macOS, Linux | Linux ネイティブ対応を重視 |

### Web アプリ

| 項目 | 技術 | 理由 |
|------|------|------|
| フレームワーク | Next.js 14+ (App Router) | SSR/SSG・エコシステム |
| 言語 | TypeScript | 型安全・開発効率 |
| スタイリング | CSS Modules / Tailwind（Desktop と統一） | 開発効率 |

### Backend API

| 項目 | 技術 | 理由 |
|------|------|------|
| フレームワーク | Fastify | 高速・TypeScript 対応 |
| 言語 | TypeScript | フロントエンドとの型共有 |
| ORM | Prisma / Drizzle（検討中） | 型安全・生産性 |
| 認証 | JWT / OAuth 2.0 | 業界標準 |

### データベース

| 項目 | 技術 | 理由 |
|------|------|------|
| Primary DB | PostgreSQL | 信頼性・拡張性・JSON 対応 |
| Cache | Redis | 高速キャッシュ・セッション管理 |
| Queue | Redis (BullMQ) | ジョブキュー（差分計算等） |

### ストレージ

| 項目 | 技術 | 理由 |
|------|------|------|
| Managed Storage | S3 互換 (MinIO) | 自己管理・コスト効率 |
| External Storage | Google Drive | 既存資産活用・OAuth 対応 |

### インフラ・CI

| 項目 | 技術 | 理由 |
|------|------|------|
| コンテナ | Docker / Docker Compose | 再現性・移植性 |
| CI/CD | GitHub Actions | GitHub 統合・無料枠 |
| リンター | ESLint, Clippy, Prettier | コード品質維持 |

---

## 8. システム構成概要

### 全体アーキテクチャ

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
├──────────────────┬──────────────────┬───────────────────────────┤
│   Desktop App    │    Web App       │   IDE Extensions (将来)   │
│   (Tauri+React)  │   (Next.js)      │                           │
└────────┬─────────┴────────┬─────────┴───────────────────────────┘
         │                  │
         │  REST API        │
         ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Backend API (Fastify)                      │
├─────────────────────────────────────────────────────────────────┤
│  • 認証 / 認可                                                   │
│  • メタデータ管理                                                │
│  • ストレージ抽象化                                              │
│  • ジョブ管理                                                    │
└────────┬───────────────────────────────────────────┬────────────┘
         │                                           │
         ▼                                           ▼
┌─────────────────┐                     ┌────────────────────────┐
│   PostgreSQL    │                     │     Redis              │
│   (メタデータ)   │                     │  (Cache / Queue)       │
└─────────────────┘                     └────────────────────────┘
         │
         │ Storage Abstraction
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Storage Layer                                │
├──────────────────────────┬──────────────────────────────────────┤
│   Managed Storage        │   External Storage                   │
│   (MinIO / S3)           │   (Google Drive)                     │
└──────────────────────────┴──────────────────────────────────────┘
```

### コンポーネント責務

| コンポーネント | 責務 |
|---------------|------|
| Desktop App | ローカルファイル監視、同期操作、プレビュー |
| Web App | ブラウザからの閲覧、プレビュー、管理操作 |
| Backend API | 認証、メタデータ管理、ストレージ操作の統合 |
| PostgreSQL | ファイルメタデータ、履歴、ユーザー情報 |
| Redis | セッション、キャッシュ、バックグラウンドジョブ |
| Core (Rust) | ハッシュ計算、差分生成、ローカル同期エンジン |

---

## 9. バージョン管理方式

### 基本概念

BVCP は**コンテンツアドレスストレージ（CAS）** の設計思想を採用する。

```
File Content → BLAKE3 Hash → Object Storage
                  │
                  └──→ Metadata DB (hash, path, timestamp, user, etc.)
```

### オブジェクト管理

| 概念 | 説明 |
|------|------|
| Object | バイナリファイルの実体（不変） |
| Object ID | BLAKE3 ハッシュ値（64文字の16進数） |
| Version | 特定時点のファイル状態を示すスナップショット |
| Commit | 1つ以上の Version をまとめた変更単位 |

### メタデータ構造（概念）

```
Project
  └── Repository
        ├── Branch
        │     └── Commit
        │           └── FileVersion
        │                 ├── path: "assets/hero.png"
        │                 ├── object_id: "a8f3b2c1..."
        │                 ├── size: 1234567
        │                 └── created_at: "2024-..."
        └── Object
              ├── id: "a8f3b2c1..."
              ├── storage_type: "managed"
              └── storage_uri: "s3://..."
```

### 差分管理

対応形式では**ビジュアル差分**を提供する。

| 形式 | 差分表示 |
|------|---------|
| 画像（PNG, JPEG, WebP） | スライダー比較、オーバーレイ |
| 動画（MP4, WebM） | フレーム単位比較（将来） |
| テキスト系（SVG, JSON） | テキスト差分 |
| バイナリ全般 | サイズ・ハッシュ変更表示 |

---

## 10. ストレージ設計

### ストレージ種別

BVCP は 2 種類のストレージバックエンドをサポートする。

| 種別 | 説明 | 用途 |
|------|------|------|
| Managed | BVCP 管理下の S3 互換ストレージ | 商用サービス、チーム利用 |
| External | 外部ストレージ（Google Drive 等） | 個人利用、既存資産活用 |

### Managed Storage

- **実装**: MinIO（開発）/ AWS S3, Cloudflare R2 等（本番）
- **特徴**:
  - 完全な制御が可能
  - 高速なアップロード・ダウンロード
  - 容量・転送量の詳細な計測

### External Storage（MVP: Google Drive）

- **認証**: OAuth 2.0 による委任認証
- **連携方式**: ユーザーの Drive 領域に専用フォルダを作成
- **制約**:
  - API Rate Limit の考慮が必要
  - 転送速度は Drive 依存
  - 将来: Dropbox, OneDrive 対応も検討

### ストレージ抽象化

```typescript
interface StorageProvider {
  upload(objectId: string, data: Buffer): Promise<StorageResult>;
  download(objectId: string): Promise<Buffer>;
  exists(objectId: string): Promise<boolean>;
  delete(objectId: string): Promise<void>;
}

class ManagedStorageProvider implements StorageProvider { /* ... */ }
class GoogleDriveStorageProvider implements StorageProvider { /* ... */ }
```

### オブジェクト配置戦略

Object ID（BLAKE3 ハッシュ）の先頭 2 文字でディレクトリ分割する。

```
objects/
  ├── a8/
  │     └── a8f3b2c1...
  ├── b2/
  │     └── b2d4e6f8...
  └── ...
```

---

## 11. 無料・課金方針

### 基本方針

GitHub の**「無料でコア機能、規模に応じて課金」** モデルを踏襲する。

### 無料で提供する機能

| 機能 | 説明 |
|------|------|
| 履歴管理 | 全バージョン履歴の閲覧・管理 |
| 差分確認 | 対応形式でのビジュアル差分表示 |
| プレビュー | ブラウザ・Desktop でのファイルプレビュー |
| Desktop アプリ | ローカル同期・操作機能 |
| IDE 拡張 | VS Code 等への統合（将来） |
| External Storage 連携 | Google Drive 等との連携 |

### 課金対象

| 項目 | 単位 | 備考 |
|------|------|------|
| Managed Storage 容量 | GB / 月 | 一定容量まで無料 |
| 転送量（Egress） | GB / 月 | ダウンロード転送量 |
| 履歴保持期間 | 日数 | 長期保持はオプション |
| チーム機能 | ユーザー数 | 共同編集・権限管理 |
| 高度な差分解析 | 利用回数 | AI 差分要約等 |

### 料金体系（草案）

| プラン | 料金 | 内容 |
|--------|------|------|
| Free | 無料 | 1GB Managed Storage, 基本機能 |
| Pro | $5/月 | 50GB Managed Storage, 優先サポート |
| Team | $10/ユーザー/月 | チーム機能, 100GB 共有ストレージ |

> **注**: 料金は暫定値であり、正式リリース前に見直す。

---

## 12. GitHub 開発フロー

### ブランチ戦略

**GitHub Flow** をベースに運用する。

```
main ─────●─────●─────●─────●─────●─────●───→
            \         /       \         /
             ●───●───●         ●───●───●
            feature/xxx       feature/yyy
```

| ブランチ | 用途 |
|----------|------|
| `main` | 常にデプロイ可能な状態を維持 |
| `feature/*` | 機能開発用（短命） |
| `fix/*` | バグ修正用 |
| `docs/*` | ドキュメント更新用 |

### Pull Request ルール

1. **必須レビュー**: main へのマージには 1 名以上のレビュー承認が必要
2. **CI 通過必須**: 全テスト・リント通過が必須
3. **コミットメッセージ**: Conventional Commits 形式を推奨
4. **PR テンプレート**: `.github/PULL_REQUEST_TEMPLATE.md` を使用

### Conventional Commits

```
<type>(<scope>): <subject>

# Examples
feat(desktop): add file preview panel
fix(api): correct auth token validation
docs(spec): update storage design section
chore(ci): add lint workflow
```

### CI/CD パイプライン

```yaml
# .github/workflows/ci.yml の概要
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    # ESLint, Prettier, Clippy

  test:
    # Unit tests, Integration tests

  build:
    # Build all apps
    needs: [lint, test]

  # deploy は別ワークフローで管理（将来）
```

### Issue 管理

| ラベル | 用途 |
|--------|------|
| `bug` | バグ報告 |
| `feature` | 機能要望 |
| `docs` | ドキュメント関連 |
| `good first issue` | 初心者向け |
| `help wanted` | 協力募集 |
| `priority:high` | 優先度高 |

---

## 13. セキュリティ・公開ポリシー

### シークレット管理

| 環境 | 管理方法 |
|------|----------|
| ローカル開発 | `.env` ファイル（`.gitignore` で除外） |
| CI/CD | GitHub Secrets |
| 本番環境 | クラウドプロバイダの Secret Manager |

### 公開リポジトリでの注意事項

1. **コミット前チェック**: シークレットの誤コミット防止（pre-commit hook）
2. **依存関係監査**: `npm audit`, `cargo audit` の定期実行
3. **脆弱性アラート**: GitHub Dependabot の有効化

### セキュリティ報告

セキュリティ脆弱性を発見した場合の報告手順を `SECURITY.md` に記載する。

```markdown
# Security Policy

## Reporting a Vulnerability

Please report security vulnerabilities by emailing: [security@example.com]
Do NOT create public issues for security vulnerabilities.
```

### 認証・認可

| レイヤー | 方式 |
|----------|------|
| ユーザー認証 | OAuth 2.0（GitHub, Google） + Email/Password |
| API 認証 | JWT（Access Token + Refresh Token） |
| リソース認可 | RBAC（Role-Based Access Control） |

---

## 14. 本プロジェクトの位置づけ

### 既存ソリューションとの比較

| 観点 | Git + GitHub | Git LFS | BVCP |
|------|-------------|---------|------|
| テキスト差分 | ◎ | ◎ | ○ |
| バイナリ差分 | △ | △ | ◎ |
| 大容量対応 | × | ○ | ◎ |
| プレビュー | △ | △ | ◎ |
| 無料利用 | ◎ | △ | ◎ |
| 既存ストレージ連携 | × | × | ◎ |
| 学習コスト | 高 | 中 | 低（目標） |

### Git / GitHub との共存

BVCP は Git を**置き換える**のではなく、**補完する**位置づけである。

推奨ワークフロー：
1. **コード** → Git / GitHub で管理
2. **バイナリアセット** → BVCP で管理
3. **連携** → BVCP Desktop / IDE 拡張で統合操作

### 学術・研究用途

本プロジェクトは以下の観点で**学術・研究用途**にも適している：

- オープンソースで設計・実装が透明
- コンテンツアドレスストレージの実践例
- 分散ストレージ・差分管理の学習教材
- 卒業研究・修士論文のテーマとして展開可能

---

## 15. 実装開始までの手順（Next Actions）

### Phase 0: リポジトリ準備（優先度: 最高）✅

- [x] GitHub リポジトリ作成（Public）
- [x] LICENSE ファイル追加（Apache-2.0）
- [x] README.md 更新（プロジェクト概要）
- [x] `.gitignore` 設定
- [x] `.gitattributes` 設定
- [x] Issue / PR テンプレート追加
- [x] 本仕様書（`docs/spec.md`）配置

### Phase 1: 開発環境構築（優先度: 高）✅

- [x] monorepo 構造の作成
  - [x] `apps/`, `packages/`, `infra/`, `docs/` ディレクトリ
  - [x] npm workspaces 設定（`package.json`）
  - [x] Cargo workspace 設定（`Cargo.toml`）
- [x] Docker Compose 環境構築
  - [x] PostgreSQL
  - [x] Redis
  - [x] MinIO
- [x] GitHub Actions CI 設定
  - [x] Lint ワークフロー
  - [x] テストワークフロー

### Phase 2: MVP コア実装（優先度: 高）

- [ ] `packages/core` (Rust)
  - [ ] BLAKE3 ハッシュ計算
  - [ ] ファイル監視（notify crate）
- [ ] `apps/api` (Fastify)
  - [ ] 基本 API 設計
  - [ ] 認証（JWT）
  - [ ] ファイルメタデータ CRUD
- [ ] データベーススキーマ設計
  - [ ] ユーザー
  - [ ] プロジェクト / リポジトリ
  - [ ] オブジェクト / バージョン

### Phase 3: クライアント実装（優先度: 中）

- [ ] `apps/desktop` (Tauri + React)
  - [ ] 基本 UI シェル
  - [ ] Rust Core 統合
  - [ ] ローカル同期機能
- [ ] `apps/web` (Next.js)
  - [ ] 認証UI
  - [ ] ファイル一覧表示
  - [ ] プレビュー表示

### Phase 4: ストレージ連携（優先度: 中）

- [ ] Managed Storage（MinIO / S3）実装
- [ ] External Storage（Google Drive）実装
- [ ] ストレージ Provider 抽象化

### Phase 5: 差分・プレビュー機能（優先度: 中〜低）

- [ ] 画像差分表示（スライダー、オーバーレイ）
- [ ] 対応形式の拡充
- [ ] サムネイル生成

---

## 変更履歴

| バージョン | 日付 | 内容 |
|-----------|------|------|
| v1.0 | 2024-12-21 | 初版作成 |

---

## 付録

### A. 用語集

| 用語 | 説明 |
|------|------|
| CAS | Content-Addressable Storage。コンテンツのハッシュ値でアドレスするストレージ |
| BLAKE3 | 高速な暗号学的ハッシュ関数 |
| Object | BVCP が管理するバイナリファイルの実体 |
| Managed Storage | BVCP が管理するストレージ（S3互換） |
| External Storage | ユーザー所有の外部ストレージ（Google Drive等） |

### B. 参考資料

- [Git LFS](https://git-lfs.github.com/)
- [BLAKE3](https://github.com/BLAKE3-team/BLAKE3)
- [Tauri](https://tauri.app/)
- [Content-Addressable Storage (Wikipedia)](https://en.wikipedia.org/wiki/Content-addressable_storage)

---

*本仕様書はYorikawa Aiseによって管理されています。*
