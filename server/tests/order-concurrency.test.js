import test from "node:test";
import assert from "node:assert/strict";
import db from "../src/db/index.js";
import { acceptOrder, cancelOrder, updateOrderStatus } from "../src/services/orderService.js";
import { resetTestDatabase } from "./helpers/testDb.js";

test.beforeEach(() => {
  resetTestDatabase();
});

function withMockedOrderUpdate(runTest) {
  const originalPrepare = db.prepare.bind(db);

  db.prepare = (sql) => {
    if (sql.includes("UPDATE delivery_orders")) {
      return {
        run() {
          return { changes: 0 };
        }
      };
    }

    return originalPrepare(sql);
  };

  try {
    runTest();
  } finally {
    db.prepare = originalPrepare;
  }
}

test("acceptOrder rejects stale writes when the guarded update changes no rows", () => {
  withMockedOrderUpdate(() => {
    assert.throws(
      () => acceptOrder(1, 2),
      (error) => error.status === 409
    );
  });

  const acceptedLogs = db
    .prepare("SELECT COUNT(*) AS total FROM order_status_logs WHERE order_id = 1 AND to_status = 'accepted'")
    .get();

  assert.equal(acceptedLogs.total, 0);
});

test("cancelOrder rejects stale writes when the update changes no rows", () => {
  db.prepare(
    "UPDATE delivery_orders SET helper_id = 2, status = 'accepted', accepted_at = CURRENT_TIMESTAMP WHERE id = 1"
  ).run();

  withMockedOrderUpdate(() => {
    assert.throws(
      () => cancelOrder(1, 1, "No longer needed"),
      (error) => error.status === 409
    );
  });

  const cancelledLogs = db
    .prepare("SELECT COUNT(*) AS total FROM order_status_logs WHERE order_id = 1 AND to_status = 'cancelled'")
    .get();

  assert.equal(cancelledLogs.total, 0);
});

test("updateOrderStatus rejects stale writes and does not increment helper metrics", () => {
  db.prepare(
    `
    UPDATE delivery_orders
    SET helper_id = 2, status = 'delivered', accepted_at = CURRENT_TIMESTAMP, picked_up_at = CURRENT_TIMESTAMP, delivered_at = CURRENT_TIMESTAMP
    WHERE id = 1
    `
  ).run();

  const before = db.prepare("SELECT completed_count FROM users WHERE id = 2").get();

  withMockedOrderUpdate(() => {
    assert.throws(
      () => updateOrderStatus(1, 1, "completed"),
      (error) => error.status === 409
    );
  });

  const after = db.prepare("SELECT completed_count FROM users WHERE id = 2").get();
  const completedLogs = db
    .prepare("SELECT COUNT(*) AS total FROM order_status_logs WHERE order_id = 1 AND to_status = 'completed'")
    .get();

  assert.equal(after.completed_count, before.completed_count);
  assert.equal(completedLogs.total, 0);
});
