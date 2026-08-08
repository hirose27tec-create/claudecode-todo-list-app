"use client";

import { useMemo, useState } from "react";
import { GOAL_COLORS, priorityWeight } from "@/lib/constants";
import { useLocalStorage } from "@/lib/useLocalStorage";
import Filters from "./components/Filters";
import GoalManager from "./components/GoalManager";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import styles from "./page.module.css";

const TASKS_KEY = "todo-list-app:tasks";
const GOALS_KEY = "todo-list-app:goals";

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function Home() {
  const [tasks, setTasks] = useLocalStorage(TASKS_KEY, []);
  const [goals, setGoals] = useLocalStorage(GOALS_KEY, []);
  const [filter, setFilter] = useState("all");

  const goalsById = useMemo(() => new Map(goals.map((g) => [g.id, g])), [goals]);

  const addTask = ({ text, priority, goalId }) => {
    setTasks((prev) => [
      {
        id: createId(),
        text,
        completed: false,
        createdAt: Date.now(),
        priority,
        goalId,
      },
      ...prev,
    ]);
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

  const addGoal = (name) => {
    setGoals((prev) => [
      ...prev,
      { id: createId(), name, color: GOAL_COLORS[prev.length % GOAL_COLORS.length] },
    ]);
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
    setTasks((prev) =>
      prev.map((task) => (task.goalId === id ? { ...task, goalId: null } : task))
    );
  };

  const filteredTasks = useMemo(() => {
    const base =
      filter === "active"
        ? tasks.filter((t) => !t.completed)
        : filter === "completed"
        ? tasks.filter((t) => t.completed)
        : tasks;

    return [...base].sort(
      (a, b) => priorityWeight(a.priority) - priorityWeight(b.priority)
    );
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

        <GoalManager goals={goals} onAdd={addGoal} onDelete={deleteGoal} />

        <TaskForm goals={goals} onAdd={addTask} />

        <Filters filter={filter} onChange={setFilter} />

        <TaskList
          tasks={filteredTasks}
          allTasksCount={tasks.length}
          filter={filter}
          goalsById={goalsById}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

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
