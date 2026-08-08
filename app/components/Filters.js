import styles from "./Filters.module.css";

const FILTERS = {
  all: { label: "すべて" },
  active: { label: "未完了" },
  completed: { label: "完了" },
};

export default function Filters({ filter, onChange }) {
  return (
    <nav className={styles.filters} aria-label="タスクの絞り込み">
      {Object.entries(FILTERS).map(([key, { label }]) => (
        <button
          key={key}
          type="button"
          className={`${styles.filterButton} ${
            filter === key ? styles.filterButtonActive : ""
          }`}
          onClick={() => onChange(key)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
