"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const STORAGE_KEY = "todo-list-app:tasks";

const FILTERS = {
  all: { label: "すべて" },
  active: { label: "未完了" },
  completed: { label: "完了" },
};

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // サーバー側では window が存在しないため、マウント後に
    // localStorage から読み込んでハイドレーション不整合を避ける。
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTasks(JSON.parse(saved));
      }
    } catch (error) {
      console.error("タスクの読み込みに失敗しました", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, loaded]);

  const handleAdd = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      { id: createId(), text: trimmed, completed: false, createdAt: Date.now() },
      ...prev,
    ]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const remainingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.length - remainingCount;

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>📝 ToDo リスト</h1>
          <p className={styles.subtitle}>今日やることを、ひとつずつ整理しましょう</p>
        </header>

        <form className={styles.addForm} onSubmit={handleAdd}>
          <input
            className={styles.input}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="新しいタスクを入力..."
            aria-label="新しいタスク"
            maxLength={200}
          />
          <button className={styles.addButton} type="submit">
            追加
          </button>
        </form>

        <nav className={styles.filters} aria-label="タスクの絞り込み">
          {Object.entries(FILTERS).map(([key, { label }]) => (
            <button
              key={key}
              type="button"
              className={`${styles.filterButton} ${
                filter === key ? styles.filterButtonActive : ""
              }`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <ul className={styles.list}>
          {filteredTasks.length === 0 && (
            <li className={styles.emptyState}>
              {tasks.length === 0
                ? "まだタスクがありません。上の入力欄から追加してみましょう！"
                : filter === "completed"
                ? "完了したタスクはまだありません。"
                : "未完了のタスクはありません。よくできました！"}
            </li>
          )}
          {filteredTasks.map((task) => (
            <li key={task.id} className={styles.item}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                aria-label={`${task.text} を完了にする`}
              />
              <span
                className={`${styles.itemText} ${
                  task.completed ? styles.itemTextDone : ""
                }`}
              >
                {task.text}
              </span>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => deleteTask(task.id)}
                aria-label={`${task.text} を削除する`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <footer className={styles.footer}>
            <span className={styles.count}>残り {remainingCount} 件</span>
            {completedCount > 0 && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={clearCompleted}
              >
                完了済みを削除
              </button>
            )}
          </footer>
        )}
      </div>
    </main>
  );
}
