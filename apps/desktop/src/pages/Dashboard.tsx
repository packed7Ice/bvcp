import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import styles from "./Dashboard.module.css";

interface Repository {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRepoName, setNewRepoName] = useState("");
  const [newRepoDesc, setNewRepoDesc] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchRepositories(token);
  }, [navigate]);

  const fetchRepositories = async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/api/repositories`, {
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

  const createRepository = async () => {
    const token = localStorage.getItem("token");
    if (!token || !newRepoName) return;

    try {
      const res = await fetch(`${API_URL}/api/repositories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newRepoName, description: newRepoDesc }),
      });
      const data = await res.json();
      if (data.success) {
        setRepositories([data.data, ...repositories]);
        setShowCreateModal(false);
        setNewRepoName("");
        setNewRepoDesc("");
      }
    } catch (err) {
      console.error("Failed to create repository:", err);
    }
  };

  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>リポジトリ</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          + 新規作成
        </button>
      </div>

      {repositories.length === 0 ? (
        <div className={styles.empty}>
          <p>リポジトリがありません</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            最初のリポジトリを作成
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {repositories.map((repo) => (
            <div key={repo.id} className={styles.card}>
              <h3>{repo.name}</h3>
              <p>{repo.description || "説明なし"}</p>
              <span>
                {new Date(repo.createdAt).toLocaleDateString("ja-JP")}
              </span>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>新規リポジトリ</h2>
            <div className={styles.field}>
              <label className="label">リポジトリ名</label>
              <input
                type="text"
                className="input"
                value={newRepoName}
                onChange={(e) => setNewRepoName(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className="label">説明（任意）</label>
              <input
                type="text"
                className="input"
                value={newRepoDesc}
                onChange={(e) => setNewRepoDesc(e.target.value)}
              />
            </div>
            <div className={styles.modalActions}>
              <button onClick={createRepository} className="btn btn-primary">
                作成
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="btn btn-secondary"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
