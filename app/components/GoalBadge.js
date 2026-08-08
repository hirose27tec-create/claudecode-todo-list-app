import { NO_GOAL_LABEL } from "@/lib/constants";
import styles from "./GoalBadge.module.css";

export default function GoalBadge({ goal }) {
  if (!goal) {
    return (
      <span className={`${styles.badge} ${styles.badgeNone}`}>
        {NO_GOAL_LABEL}
      </span>
    );
  }

  return (
    <span className={styles.badge} style={{ background: goal.color }}>
      {goal.name}
    </span>
  );
}
