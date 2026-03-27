import db from "../db/index.js";
import { ORDER_STATUS } from "../config/constants.js";
import { getOrderById } from "./orderService.js";

export function createReview(payload) {
  const order = getOrderById(payload.order_id);

  if (order.requester_id !== payload.actor_id) {
    const error = new Error("Only the requester can submit a review");
    error.status = 403;
    throw error;
  }

  if (order.status !== ORDER_STATUS.COMPLETED) {
    const error = new Error("Reviews can only be submitted after completion");
    error.status = 400;
    throw error;
  }

  if (!order.helper_id) {
    const error = new Error("Cannot review an order without an assigned helper");
    error.status = 400;
    throw error;
  }

  if (!Number.isInteger(payload.rating) || payload.rating < 1 || payload.rating > 5) {
    const error = new Error("rating must be an integer between 1 and 5");
    error.status = 400;
    throw error;
  }

  const existing = db.prepare("SELECT id FROM reviews WHERE order_id = ?").get(payload.order_id);
  if (existing) {
    const error = new Error("A review already exists for this order");
    error.status = 400;
    throw error;
  }

  const result = db
    .prepare(
      `
      INSERT INTO reviews (order_id, requester_id, helper_id, rating, comment)
      VALUES (?, ?, ?, ?, ?)
      `
    )
    .run(
      payload.order_id,
      order.requester_id,
      order.helper_id,
      payload.rating,
      payload.comment || null
    );

  return db.prepare("SELECT * FROM reviews WHERE id = ?").get(result.lastInsertRowid);
}
