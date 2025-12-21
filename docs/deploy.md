# BVCP デプロイガイド

## 構成

| コンポーネント | サービス | プラン |
|--------------|---------|--------|
| Web | Vercel | 無料 |
| API + DB + Redis | Railway | 30日トライアル（$5） |

---

## 1. Railway セットアップ

### 1.1 アカウント作成

1. [railway.app](https://railway.app) にアクセス
2. 「Start a New Project」をクリック
3. GitHub でログイン
4. **30日トライアル**が自動適用される

### 1.2 PostgreSQL 追加

1. ダッシュボードで「+ New」→「Database」→「PostgreSQL」
2. 作成されたら「Variables」タブで `DATABASE_URL` をコピー

### 1.3 API デプロイ

1. 「+ New」→「GitHub Repo」→ `bvcp` を選択
2. **Settings** で以下を設定：
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm ci && npx prisma generate && npm run build`
   - **Start Command**: `npx prisma migrate deploy && npm start`

3. **Variables** で環境変数を設定：

```
DATABASE_URL=<PostgreSQLからコピー>
JWT_SECRET=<32文字以上のランダム文字列>
NODE_ENV=production
PORT=3001
```

4. 「Deploy」をクリック

### 1.4 ドメイン確認

デプロイ完了後、「Settings」→「Networking」→「Generate Domain」
例: `bvcp-api-production.up.railway.app`

---

## 2. Vercel セットアップ

### 2.1 デプロイ

```bash
cd apps/web
npx vercel
```

プロンプトに従って設定：
- Scope: 個人アカウント
- Link to existing project: No
- Project name: `bvcp-web`
- Directory: `./`

### 2.2 環境変数設定

```bash
vercel env add NEXT_PUBLIC_API_URL
# 値: https://bvcp-api-production.up.railway.app
```

### 2.3 再デプロイ

```bash
vercel --prod
```

---

## 3. 動作確認

### API ヘルスチェック

```bash
curl https://bvcp-api-production.up.railway.app/health
```

### Web アクセス

ブラウザで Vercel の URL を開く

---

## 環境変数まとめ

### Railway (API)

| 変数 | 値 |
|------|-----|
| `DATABASE_URL` | PostgreSQL 接続文字列 |
| `JWT_SECRET` | ランダム文字列（32文字以上） |
| `NODE_ENV` | `production` |
| `PORT` | `3001` |

### Vercel (Web)

| 変数 | 値 |
|------|-----|
| `NEXT_PUBLIC_API_URL` | Railway API の URL |

---

## トライアル終了後

30日後に以下の選択肢：

1. **Hobby Plan** ($5/月) に移行
2. **Render** (無料) に移行
3. サービス停止
