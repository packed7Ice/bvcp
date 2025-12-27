# Contributing to BVCP

BVCP へのコントリビューションに興味をお持ちいただきありがとうございます。

## 行動規範

本プロジェクトに参加するすべての方は、相互尊重の精神でコミュニケーションを行ってください。

## コントリビューションの方法

### Issue の報告

- **バグ報告**: Issue テンプレートを使用してください
- **機能リクエスト**: 背景と動機を明確に説明してください
- **質問**: Discussions を使用してください

### Pull Request

1. リポジトリを Fork する
2. feature ブランチを作成する（`git checkout -b feature/my-feature`）
3. 変更をコミットする（Conventional Commits 形式）
4. ブランチを Push する（`git push origin feature/my-feature`）
5. Pull Request を作成する

### コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/) 形式を使用してください：

```
<type>(<scope>): <subject>

# 例
feat(desktop): add file preview panel
fix(api): correct auth token validation
docs(spec): update storage design section
```

**type の種類:**

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: コードスタイル（動作に影響しない）
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: ビルド・ツール設定

## 開発環境

### 必要なツール

- Node.js 20+
- Rust 1.75+
- Docker / Docker Compose
- Git

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/packed7Ice/bvcp.git
cd bvcp

# 依存関係をインストール
npm install

# 開発環境を起動
docker compose -f infra/compose/docker-compose.yml up -d
```

## コーディング規約

### TypeScript

- ESLint / Prettier の設定に従う
- 型は明示的に定義する
- `any` の使用は避ける

### Rust

- `cargo fmt` でフォーマット
- `cargo clippy` の警告を解消する

## ライセンス

コントリビューションは Apache License 2.0 の下で提供されます。
