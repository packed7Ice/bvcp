import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>BVCP Desktop</h1>
        <p className={styles.subtitle}>Binary Version Control Platform</p>
        <p className={styles.description}>
          バイナリファイル向けバージョン管理
        </p>
        <div className={styles.actions}>
          <Link to="/login" className="btn btn-primary">
            ログイン
          </Link>
          <Link to="/register" className="btn btn-secondary">
            新規登録
          </Link>
        </div>
      </div>
    </div>
  );
}
