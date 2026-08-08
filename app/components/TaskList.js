import TaskItem from "./TaskItem";
import styles from "./TaskList.module.css";

export default function TaskList({
  tasks,
  allTasksCount,
  filter,
  goalsById,
  onToggle,
  onDelete,
}) {
  return (
    <ul className={styles.list}>
      {tasks.length === 0 && (
        <li className={styles.emptyState}>
          {allTasksCount === 0
            ? "まだタスクがありません。上の入力欄から追加してみましょう！"
            : filter === "completed"
            ? "完了したタスクはまだありません。"
            : "未完了のタスクはありません。よくできました！"}
        </li>
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          goal={task.goalId ? goalsById.get(task.goalId) : null}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
