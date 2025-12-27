"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./dashboard.module.css";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Repository {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
    fetchRepositories(token);
  }, [router]);

  const fetchRepositories = async (token: string) => {
    try {
      const res = await fetch("/api/repositories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setRepositories(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch repositories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/dashboard" className={styles.logo}>
          BVCP
        </Link>
        <div className={styles.userMenu}>
          <span>{user?.name}</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            ログアウト
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.titleRow}>
          <h1>リポジトリ</h1>
          <Link href="/dashboard/new" className="btn btn-primary">
            + 新規作成
          </Link>
        </div>

        {repositories.length === 0 ? (
          <div className={styles.empty}>
            <p>リポジトリがありません</p>
            <Link href="/dashboard/new" className="btn btn-primary">
              最初のリポジトリを作成
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {repositories.map((repo) => (
              <Link
                key={repo.id}
                href={`/dashboard/${repo.id}`}
                className={styles.repoCard}
              >
                <h3>{repo.name}</h3>
                <p>{repo.description || "説明なし"}</p>
                <span className={styles.date}>
                  {new Date(repo.createdAt).toLocaleDateString("ja-JP")}
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
