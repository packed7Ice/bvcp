# BVCP 開発環境

## 起動

```bash
docker compose -f infra/compose/docker-compose.yml up -d
```

## サービス

| サービス      | ポート | 接続情報                                                                  |
| ------------- | ------ | ------------------------------------------------------------------------- |
| PostgreSQL    | 5432   | `postgresql://bvcp:bvcp_dev_password@localhost:5432/bvcp`                 |
| Redis         | 6379   | `redis://localhost:6379`                                                  |
| MinIO API     | 9000   | `http://localhost:9000`                                                   |
| MinIO Console | 9001   | `http://localhost:9001` (user: `bvcp_minio`, pass: `bvcp_minio_password`) |

## 停止

```bash
docker compose -f infra/compose/docker-compose.yml down
```

## データ削除

```bash
docker compose -f infra/compose/docker-compose.yml down -v
```
