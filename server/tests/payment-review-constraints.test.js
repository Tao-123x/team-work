import test from "node:test";
import assert from "node:assert/strict";
import { createTestServer } from "./helpers/testServer.js";
import { resetTestDatabase } from "./helpers/testDb.js";

test.beforeEach(() => {
  resetTestDatabase();
});

test("manual payment rejects incomplete orders", async () => {
  const { request, close } = await createTestServer();

  try {
    const response = await request("/api/payments/manual-confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer local-token-1"
      },
      body: JSON.stringify({
        order_id: 1,
        payer_id: 1,
        payee_id: 2,
        amount: 2.5
      })
    });

    assert.equal(response.status, 400);
  } finally {
    await close();
  }
});

test("manual payment rejects actors who are not the requester", async () => {
  const { request, close } = await createTestServer();

  try {
    const response = await request("/api/payments/manual-confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer local-token-2"
      },
      body: JSON.stringify({
        order_id: 2,
        payer_id: 2,
        payee_id: 1,
        amount: 2.5
      })
    });

    assert.equal(response.status, 403);
  } finally {
    await close();
  }
});

test("review rejects incomplete orders", async () => {
  const { request, close } = await createTestServer();

  try {
    const response = await request("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer local-token-1"
      },
      body: JSON.stringify({
        order_id: 1,
        requester_id: 1,
        helper_id: 2,
        rating: 5,
        comment: "Fast"
      })
    });

    assert.equal(response.status, 400);
  } finally {
    await close();
  }
});

test("review rejects ratings outside 1 to 5", async () => {
  const { request, close } = await createTestServer();

  try {
    const response = await request("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer local-token-1"
      },
      body: JSON.stringify({
        order_id: 2,
        requester_id: 1,
        helper_id: 2,
        rating: 6,
        comment: "Too high"
      })
    });

    assert.equal(response.status, 400);
  } finally {
    await close();
  }
});
