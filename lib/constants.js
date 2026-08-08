export const PRIORITIES = {
  high: { label: "高", color: "#f2a0a0" },
  medium: { label: "中", color: "#ffcf94" },
  low: { label: "低", color: "#a8d8c9" },
};

export const PRIORITY_ORDER = ["high", "medium", "low"];

export function priorityWeight(priority) {
  const index = PRIORITY_ORDER.indexOf(priority);
  return index === -1 ? PRIORITY_ORDER.indexOf("medium") : index;
}

export const GOAL_COLORS = [
  "#ff9466",
  "#8fc9a9",
  "#7aa7d9",
  "#c99ee0",
  "#e0b25a",
  "#e07f9f",
];

export const NO_GOAL_LABEL = "その他";
