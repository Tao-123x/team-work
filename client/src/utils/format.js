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

export function formatDeadlineTime(value) {
  if (!value) return "Open timing";

  const date = new Date(String(value).replace(" ", "T"));
  if (Number.isNaN(date.getTime())) {
    return "Open timing";
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `Before ${hours}:${minutes}`;
}

export function isUrgentDeadline(value, minutes = 90) {
  if (!value) return false;

  const date = new Date(String(value).replace(" ", "T"));
  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const delta = date.getTime() - Date.now();
  return delta > 0 && delta <= minutes * 60 * 1000;
}
