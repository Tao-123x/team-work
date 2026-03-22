import db from "../db/index.js";
import { ALLOWED_STATUS_TRANSITIONS, ORDER_STATUS } from "../config/constants.js";
import { generateOrderNo } from "../utils/orderNo.js";

function getTimeline(orderId) {
  return db
    .prepare(
      `
      SELECT to_status, created_at, action_note
      FROM order_status_logs
      WHERE order_id = ?
      ORDER BY created_at ASC, id ASC
      `
    )
    .all(orderId);
}

function getOrderById(orderId) {
  const order = db
    .prepare(
      `
      SELECT
        o.*,
        requester.nickname AS requester_nickname,
        helper.nickname AS helper_nickname
      FROM delivery_orders o
      JOIN users requester ON requester.id = o.requester_id
      LEFT JOIN users helper ON helper.id = o.helper_id
      WHERE o.id = ?
      `
    )
    .get(orderId);

  if (!order) {
    const error = new Error("Order not found");
    error.status = 404;
    throw error;
  }

  return {
    ...order,
    requester: {
      id: order.requester_id,
      nickname: order.requester_nickname
    },
    helper: order.helper_id
      ? {
          id: order.helper_id,
          nickname: order.helper_nickname
        }
      : null,
    timeline: getTimeline(orderId)
  };
}

function appendStatusLog(orderId, operatorId, fromStatus, toStatus, actionNote = null) {
  db.prepare(
    `
    INSERT INTO order_status_logs (order_id, operator_id, from_status, to_status, action_note)
    VALUES (?, ?, ?, ?, ?)
    `
  ).run(orderId, operatorId, fromStatus, toStatus, actionNote);
}

export function listOrders({ status = ORDER_STATUS.POSTED, dorm_building, page = 1, page_size = 20 }) {
  const offset = (Number(page) - 1) * Number(page_size);
  const clauses = [];
  const values = [];

  if (status) {
    clauses.push("o.status = ?");
    values.push(status);
  }

  if (dorm_building) {
    clauses.push("o.dorm_building = ?");
    values.push(dorm_building);
  }

  const whereClause = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const list = db
    .prepare(
      `
      SELECT
        o.*,
        requester.nickname AS requester_nickname
      FROM delivery_orders o
      JOIN users requester ON requester.id = o.requester_id
      ${whereClause}
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
      `
    )
    .all(...values, Number(page_size), offset);

  const total = db
    .prepare(`SELECT COUNT(*) AS total FROM delivery_orders o ${whereClause}`)
    .get(...values).total;

  return { list, total };
}

export function listMyOrders(userId, role) {
  const field = role === "helper" ? "helper_id" : "requester_id";
  const list = db
    .prepare(
      `
      SELECT *
      FROM delivery_orders
      WHERE ${field} = ?
      ORDER BY created_at DESC
      `
    )
    .all(userId);

  return { list };
}

export function createOrder(payload) {
  const orderNo = generateOrderNo();
  const result = db
    .prepare(
      `
      INSERT INTO delivery_orders (
        order_no,
        requester_id,
        pickup_location,
        dorm_building,
        floor_no,
        room_no,
        takeaway_type,
        note,
        service_fee,
        status,
        deadline_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
    )
    .run(
      orderNo,
      payload.requester_id,
      payload.pickup_location,
      payload.dorm_building,
      payload.floor_no,
      payload.room_no,
      payload.takeaway_type || null,
      payload.note || null,
      Number(payload.service_fee || 0),
      ORDER_STATUS.POSTED,
      payload.deadline_at || null
    );

  appendStatusLog(result.lastInsertRowid, payload.requester_id, null, ORDER_STATUS.POSTED, "Order created");

  return getOrderById(result.lastInsertRowid);
}

export function acceptOrder(orderId, helperId) {
  const order = getOrderById(orderId);
  if (order.status !== ORDER_STATUS.POSTED) {
    const error = new Error("Only posted orders can be accepted");
    error.status = 400;
    throw error;
  }

  db.prepare(
    `
    UPDATE delivery_orders
    SET helper_id = ?, status = ?, accepted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND status = ?
    `
  ).run(helperId, ORDER_STATUS.ACCEPTED, orderId, ORDER_STATUS.POSTED);

  appendStatusLog(orderId, helperId, order.status, ORDER_STATUS.ACCEPTED, "Order accepted");
  return getOrderById(orderId);
}

export function updateOrderStatus(orderId, operatorId, nextStatus) {
  const order = getOrderById(orderId);
  const allowedNextStatus = ALLOWED_STATUS_TRANSITIONS[order.status];

  if (nextStatus !== allowedNextStatus) {
    const error = new Error(`Invalid next status: ${nextStatus}`);
    error.status = 400;
    throw error;
  }

  if (nextStatus === ORDER_STATUS.COMPLETED) {
    if (order.requester_id !== operatorId) {
      const error = new Error("Only the requester can confirm completion");
      error.status = 403;
      throw error;
    }
  } else if (order.helper_id !== operatorId) {
    const error = new Error("Only the assigned helper can update this status");
    error.status = 403;
    throw error;
  }

  const timestampField =
    nextStatus === ORDER_STATUS.PICKED_UP
      ? "picked_up_at"
      : nextStatus === ORDER_STATUS.DELIVERED
        ? "delivered_at"
        : "completed_at";

  db.prepare(
    `
    UPDATE delivery_orders
    SET status = ?, ${timestampField} = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    `
  ).run(nextStatus, orderId);

  appendStatusLog(orderId, operatorId, order.status, nextStatus, "Status updated");

  if (nextStatus === ORDER_STATUS.COMPLETED && order.helper_id) {
    db.prepare(
      `
      UPDATE users
      SET completed_count = completed_count + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `
    ).run(order.helper_id);
  }

  return getOrderById(orderId);
}

export function cancelOrder(orderId, requesterId, reason) {
  const order = getOrderById(orderId);

  if (order.requester_id !== requesterId) {
    const error = new Error("Only the requester can cancel the order");
    error.status = 403;
    throw error;
  }

  if (![ORDER_STATUS.POSTED, ORDER_STATUS.ACCEPTED].includes(order.status)) {
    const error = new Error("This order can no longer be cancelled");
    error.status = 400;
    throw error;
  }

  db.prepare(
    `
    UPDATE delivery_orders
    SET status = ?, cancelled_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    `
  ).run(ORDER_STATUS.CANCELLED, orderId);

  appendStatusLog(orderId, requesterId, order.status, ORDER_STATUS.CANCELLED, reason || "Cancelled");
  return getOrderById(orderId);
}

export { getOrderById };
