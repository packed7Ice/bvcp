# BVCP - Binary Version Control Platform

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/packed7Ice?style=flat&logo=githubsponsors&logoColor=white&label=Sponsors)](https://github.com/sponsors/packed7Ice)

[![Rust](https://img.shields.io/badge/Rust-000000?style=flat&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tauri](https://img.shields.io/badge/Tauri-FFC131?style=flat&logo=tauri&logoColor=black)](https://tauri.app/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io/)

バイナリファイル（画像・音声・動画・3D・DAW等）に特化したバージョン管理プラットフォーム。

## 概要

BVCP は、Git が不得意とするバイナリファイルの差分管理・プレビュー・大容量履歴管理を補完するプラットフォームです。GitHub の思想（履歴管理・レビュー・無料＋規模課金）を踏襲し、Git LFS の代替・上位互換を目指します。

## 特徴

- **コンテンツアドレス管理**: BLAKE3 ハッシュによる効率的なオブジェクト管理
- **ビジュアル差分**: 画像・動画等の差分を視覚的に確認
- **柔軟なストレージ**: Managed (S3互換) / External (Google Drive) 切替可能
- **クロスプラットフォーム**: Desktop (Tauri) + Web (Next.js) 対応
- **無料で基本機能**: 履歴管理・差分確認・プレビューは無料

## ドキュメント

- **[仕様書](./docs/spec.md)** - プロジェクトの詳細仕様

## 技術スタック

| 領域 | 技術 |
|------|------|
| コア | Rust (BLAKE3) |
| Desktop | Tauri + React + TypeScript |
| Web | Next.js (App Router) + TypeScript |
| Backend | Fastify + TypeScript |
| DB | PostgreSQL |
| Cache/Queue | Redis |
| Storage | S3互換 (MinIO) / Google Drive |

## リポジトリ構成

```
bvcp/
├── apps/           # アプリケーション
│   ├── web/        # Next.js Web アプリ
│   ├── desktop/    # Tauri Desktop アプリ
│   └── api/        # Fastify Backend API
├── packages/       # 共有ライブラリ
│   ├── core/       # Rust 同期・差分コア
│   ├── shared/     # TypeScript 共有
│   └── ui/         # React UI コンポーネント
├── infra/          # インフラ設定
│   ├── docker/
│   └── compose/
└── docs/           # ドキュメント
    └── spec.md     # 仕様書
```

## 開発への参加

本プロジェクトはオープンソースで開発されています。Issue や Pull Request での貢献を歓迎します。

## ライセンス

Copyright 2025 Yorikawa Aise

本プロジェクトは [Apache License 2.0](./LICENSE) に基づいて公開されています。

詳細は [ライセンスガイド](./docs/license-guide.md) を参照してください。

## Support / Sponsors

BVCP の開発を支援していただける方は、[GitHub Sponsors](https://github.com/sponsors/packed7Ice) を通じてご支援いただけます。

いただいた支援は以下の目的に活用させていただきます：

- 開発の継続・機能改善
- インフラ検証・テスト環境の維持
- ドキュメント整備・翻訳

### ご支援に関する注意事項

- **支援は任意です** — BVCP は Apache License 2.0 の下で公開されており、支援の有無に関わらず、すべての機能を自由に利用・改変・再配布できます
- **特典・優遇はありません** — スポンサーによる機能制限の解除や優先対応は設けていません
- **商用利用は自由です** — 支援なしでも商用利用・SaaS 化が可能です（Apache License 2.0 の条件に従ってください）

開発を応援していただける方のご支援をお待ちしております。

## 開発への参加

本プロジェクトはオープンソースで開発されています。Issue や Pull Request での貢献を歓迎します。
