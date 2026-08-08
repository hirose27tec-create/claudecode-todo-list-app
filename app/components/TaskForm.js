"use client";

import { useState } from "react";
import { NO_GOAL_LABEL, PRIORITIES, PRIORITY_ORDER } from "@/lib/constants";
import styles from "./TaskForm.module.css";

export default function TaskForm({ goals, onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [goalId, setGoalId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd({ text: trimmed, priority, goalId: goalId || null });
    setText("");
    setPriority("medium");
    setGoalId("");
  };

  return (
    <form className={styles.addForm} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいタスクを入力..."
        aria-label="新しいタスク"
        maxLength={200}
      />
      <select
        className={styles.select}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        aria-label="優先順位"
      >
        {PRIORITY_ORDER.map((key) => (
          <option key={key} value={key}>
            優先度: {PRIORITIES[key].label}
          </option>
        ))}
      </select>
      <select
        className={styles.select}
        value={goalId}
        onChange={(e) => setGoalId(e.target.value)}
        aria-label="関連する目標"
      >
        <option value="">{NO_GOAL_LABEL}</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <button className={styles.addButton} type="submit">
        追加
      </button>
    </form>
  );
}
