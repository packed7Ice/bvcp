"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import styles from "../dashboard.module.css";

interface Repository {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  fileVersions: Array<{
    id: string;
    path: string;
    size: string;
    createdAt: string;
  }>;
}

export default function RepositoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchRepository(token);
  }, [params.id, router]);

  const fetchRepository = async (token: string) => {
    try {
      const res = await fetch(`/api/repositories/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error?.message || "リポジトリの取得に失敗しました");
        return;
      }

      setRepository(data.data);
    } catch (err) {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？この操作は取り消せません。")) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`/api/repositories/${params.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("削除に失敗しました");
    }
  };

  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  if (error || !repository) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/dashboard" className={styles.logo}>BVCP</Link>
        </header>
        <main className={styles.main}>
          <p style={{ color: "var(--secondary)" }}>{error || "リポジトリが見つかりません"}</p>
          <Link href="/dashboard" style={{ marginTop: "1rem" }}>ダッシュボードに戻る</Link>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/dashboard" className={styles.logo}>BVCP</Link>
      </header>

      <main className={styles.main}>
        <div className={styles.titleRow}>
          <div>
            <h1>{repository.name}</h1>
            <p style={{ color: "var(--secondary)", marginTop: "0.25rem" }}>
              {repository.description || "説明なし"}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleDelete} className="btn btn-secondary">
              削除
            </button>
          </div>
        </div>

        <section style={{ marginTop: "2rem" }}>
          <h2 style={{ fontSize: "1.125rem", marginBottom: "1rem" }}>ファイル履歴</h2>
          
          {repository.fileVersions.length === 0 ? (
            <div className={styles.empty}>
              <p>ファイル履歴がありません</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
                デスクトップアプリからファイルを同期してください
              </p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "0.75rem 0" }}>パス</th>
                  <th style={{ textAlign: "right", padding: "0.75rem 0" }}>サイズ</th>
                  <th style={{ textAlign: "right", padding: "0.75rem 0" }}>日時</th>
                </tr>
              </thead>
              <tbody>
                {repository.fileVersions.map((file) => (
                  <tr key={file.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "0.75rem 0" }}>{file.path}</td>
                    <td style={{ textAlign: "right", padding: "0.75rem 0" }}>
                      {formatBytes(Number(file.size))}
                    </td>
                    <td style={{ textAlign: "right", padding: "0.75rem 0", color: "var(--secondary)" }}>
                      {new Date(file.createdAt).toLocaleString("ja-JP")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
