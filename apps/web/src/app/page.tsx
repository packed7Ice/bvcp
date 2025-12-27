import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>BVCP</h1>
        <p className={styles.subtitle}>Binary Version Control Platform</p>
        <p className={styles.description}>
          バイナリファイル向けバージョン管理プラットフォーム
        </p>
        <div className={styles.actions}>
          <Link href="/login" className="btn btn-primary">
            ログイン
          </Link>
          <Link href="/register" className="btn btn-secondary">
            新規登録
          </Link>
        </div>
      </div>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h3>📁 バイナリ管理</h3>
          <p>
            画像・音声・動画・3Dモデルなど、あらゆるバイナリファイルを効率的に管理
          </p>
        </div>
        <div className={styles.feature}>
          <h3>🔍 ビジュアル差分</h3>
          <p>対応形式でファイルの差分を視覚的に確認</p>
        </div>
        <div className={styles.feature}>
          <h3>☁️ 柔軟なストレージ</h3>
          <p>Managed Storage または Google Drive から選択可能</p>
        </div>
      </section>
    </main>
  );
}
