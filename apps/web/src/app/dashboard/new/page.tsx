"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../dashboard.module.css";
import formStyles from "../../login/auth.module.css";

export default function NewRepositoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/repositories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error?.message || "作成に失敗しました");
        return;
      }

      router.push(`/dashboard/${data.data.id}`);
    } catch (err) {
      setError("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/dashboard" className={styles.logo}>
          BVCP
        </Link>
      </header>

      <main className={styles.main}>
        <div style={{ maxWidth: 500 }}>
          <h1 style={{ marginBottom: "1.5rem" }}>新規リポジトリ</h1>

          {error && <div className={formStyles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={formStyles.form}>
            <div className={formStyles.field}>
              <label htmlFor="name" className="label">
                リポジトリ名
              </label>
              <input
                id="name"
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={formStyles.field}>
              <label htmlFor="description" className="label">
                説明（任意）
              </label>
              <textarea
                id="description"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ resize: "vertical" }}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "作成中..." : "作成する"}
              </button>
              <Link href="/dashboard" className="btn btn-secondary">
                キャンセル
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
