import { ORDER_STATUS_LABELS } from "./constants";

export function formatMoney(value) {
  const amount = Number(value || 0);
  return `¥${amount.toFixed(2)}`;
}

export function formatDormAddress(order) {
  if (!order) return "";
  return `${order.dorm_building || ""} ${order.floor_no || ""}-${order.room_no || ""}`.trim();
}

export function formatStatus(status) {
  return ORDER_STATUS_LABELS[status] || status || "Unknown";
}
