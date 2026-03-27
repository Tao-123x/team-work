import test from "node:test";
import assert from "node:assert/strict";
import { createTestServer } from "./helpers/testServer.js";
import { resetTestDatabase } from "./helpers/testDb.js";

test.beforeEach(() => {
  resetTestDatabase();
});

test("create order rejects negative service fees", async () => {
  const { request, close } = await createTestServer();

  try {
    const response = await request("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer local-token-1"
      },
      body: JSON.stringify({
        pickup_location: "Dorm A takeaway shelf",
        dorm_building: "Dorm A",
        floor_no: "6",
        room_no: "602",
        service_fee: -1
      })
    });

    assert.equal(response.status, 400);
  } finally {
    await close();
  }
});
