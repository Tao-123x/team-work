import db from "../db/index.js";
import { ORDER_STATUS } from "../config/constants.js";
import { getOrderById } from "./orderService.js";

export function createManualPayment(payload) {
  const order = getOrderById(payload.order_id);

  if (order.requester_id !== payload.actor_id) {
    const error = new Error("Only the requester can record payment");
    error.status = 403;
    throw error;
  }

  if (order.status !== ORDER_STATUS.COMPLETED) {
    const error = new Error("Payment can only be recorded after completion");
    error.status = 400;
    throw error;
  }

  if (!order.helper_id) {
    const error = new Error("Cannot record payment without an assigned helper");
    error.status = 400;
    throw error;
  }

  const existing = db.prepare("SELECT * FROM payments WHERE order_id = ?").get(payload.order_id);

  if (existing) {
    const error = new Error("Payment has already been recorded for this order");
    error.status = 400;
    throw error;
  }

  const result = db
    .prepare(
      `
      INSERT INTO payments (order_id, payer_id, payee_id, amount, payment_status, payment_method, paid_at)
      VALUES (?, ?, ?, ?, 'offline_confirmed', ?, CURRENT_TIMESTAMP)
      `
    )
    .run(
      payload.order_id,
      order.requester_id,
      order.helper_id,
      order.service_fee,
      payload.payment_method || "offline"
    );

  return db.prepare("SELECT * FROM payments WHERE id = ?").get(result.lastInsertRowid);
}
