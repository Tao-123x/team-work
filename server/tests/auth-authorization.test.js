import test from "node:test";
import assert from "node:assert/strict";
import { createTestServer } from "./helpers/testServer.js";
import { resetTestDatabase } from "./helpers/testDb.js";

test.beforeEach(() => {
  resetTestDatabase();
});

test("accept order rejects requests without auth", async () => {
  const { request, close } = await createTestServer();

  try {
    const response = await request("/api/orders/1/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    });

    assert.equal(response.status, 401);
  } finally {
    await close();
  }
});

test("create order ignores spoofed requester_id and uses the authenticated user", async () => {
  const { request, close } = await createTestServer();

  try {
    const response = await request("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer local-token-1"
      },
      body: JSON.stringify({
        requester_id: 3,
        pickup_location: "Dorm A takeaway shelf",
        dorm_building: "Dorm A",
        floor_no: "6",
        room_no: "602",
        service_fee: 2
      })
    });

    assert.equal(response.status, 201);
    assert.equal(response.body.requester.id, 1);
  } finally {
    await close();
  }
});

test("my orders uses the authenticated user instead of the query user_id", async () => {
  const { request, close } = await createTestServer();

  try {
    const response = await request("/api/me/orders?user_id=999&role=requester", {
      headers: {
        Authorization: "Bearer local-token-1"
      }
    });

    assert.equal(response.status, 200);
    assert.equal(response.body.list.length, 2);
    assert.equal(response.body.list.every((order) => order.requester_id === 1), true);
  } finally {
    await close();
  }
});
