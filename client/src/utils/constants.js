export const API_BASE_URL = "http://localhost:3000";

export const ORDER_STATUS_LABELS = {
  posted: "Posted",
  accepted: "Accepted",
  picked_up: "Picked Up",
  delivered: "Delivered",
  completed: "Completed",
  cancelled: "Cancelled"
};

export const NEXT_STATUS_ACTIONS = {
  accepted: "picked_up",
  picked_up: "delivered",
  delivered: "completed"
};
