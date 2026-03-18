import db from "../db/index.js";

export function createManualPayment(payload) {
  const existing = db.prepare("SELECT * FROM payments WHERE order_id = ?").get(payload.order_id);

  if (existing) {
    db.prepare(
      `
      UPDATE payments
      SET amount = ?, payment_status = 'offline_confirmed', payment_method = ?, paid_at = CURRENT_TIMESTAMP
      WHERE order_id = ?
      `
    ).run(payload.amount, payload.payment_method || "offline", payload.order_id);

    return db.prepare("SELECT * FROM payments WHERE order_id = ?").get(payload.order_id);
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
      payload.payer_id,
      payload.payee_id,
      payload.amount,
      payload.payment_method || "offline"
    );

  return db.prepare("SELECT * FROM payments WHERE id = ?").get(result.lastInsertRowid);
}
