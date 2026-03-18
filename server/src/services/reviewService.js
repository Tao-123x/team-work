import db from "../db/index.js";

export function createReview(payload) {
  const result = db
    .prepare(
      `
      INSERT INTO reviews (order_id, requester_id, helper_id, rating, comment)
      VALUES (?, ?, ?, ?, ?)
      `
    )
    .run(
      payload.order_id,
      payload.requester_id,
      payload.helper_id,
      payload.rating,
      payload.comment || null
    );

  return db.prepare("SELECT * FROM reviews WHERE id = ?").get(result.lastInsertRowid);
}
