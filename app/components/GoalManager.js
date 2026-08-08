"use client";

import { useState } from "react";
import GoalBadge from "./GoalBadge";
import styles from "./GoalManager.module.css";

export default function GoalManager({ goals, onAdd, onDelete }) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName("");
  };

  return (
    <section className={styles.section} aria-label="目標の管理">
      <h2 className={styles.heading}>🎯 目標</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="新しい目標を入力..."
          aria-label="新しい目標"
          maxLength={60}
        />
        <button className={styles.addButton} type="submit">
          追加
        </button>
      </form>

      {goals.length > 0 && (
        <ul className={styles.list}>
          {goals.map((goal) => (
            <li key={goal.id} className={styles.item}>
              <GoalBadge goal={goal} />
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => onDelete(goal.id)}
                aria-label={`${goal.name} を削除する`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
