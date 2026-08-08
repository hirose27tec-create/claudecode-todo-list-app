"use client";

import { PRIORITIES } from "@/lib/constants";
import GoalBadge from "./GoalBadge";
import styles from "./TaskItem.module.css";

export default function TaskItem({ task, goal, onToggle, onDelete }) {
  const priority = PRIORITIES[task.priority] ?? PRIORITIES.medium;

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`${task.text} を完了にする`}
      />
      <div className={styles.body}>
        <span
          className={`${styles.itemText} ${
            task.completed ? styles.itemTextDone : ""
          }`}
        >
          {task.text}
        </span>
        <div className={styles.tags}>
          <span
            className={styles.priorityBadge}
            style={{ background: priority.color }}
          >
            優先度: {priority.label}
          </span>
          <GoalBadge goal={goal} />
        </div>
      </div>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => onDelete(task.id)}
        aria-label={`${task.text} を削除する`}
      >
        ×
      </button>
    </li>
  );
}
