import test from "node:test";
import assert from "node:assert/strict";

import { ORDER_STATUS } from "../src/config/constants.js";
import { buildStatusUpdatePlan } from "../src/services/orderService.js";

test("buildStatusUpdatePlan allows helper to move accepted orders to picked_up", () => {
  const plan = buildStatusUpdatePlan(
    { status: ORDER_STATUS.ACCEPTED, helper_id: 7, requester_id: 3 },
    7,
    ORDER_STATUS.PICKED_UP
  );

  assert.equal(plan.timestampField, "picked_up_at");
});

test("buildStatusUpdatePlan requires the requester to complete delivered orders", () => {
  assert.throws(
    () =>
      buildStatusUpdatePlan(
        { status: ORDER_STATUS.DELIVERED, helper_id: 7, requester_id: 3 },
        7,
        ORDER_STATUS.COMPLETED
      ),
    /Only the requester can confirm completion/
  );
});

test("buildStatusUpdatePlan rejects skipping to delivered from accepted orders", () => {
  assert.throws(
    () =>
      buildStatusUpdatePlan(
        { status: ORDER_STATUS.ACCEPTED, helper_id: 7, requester_id: 3 },
        7,
        ORDER_STATUS.DELIVERED
      ),
    /Invalid next status: delivered/
  );
});
