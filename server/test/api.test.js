import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { once } from "node:events";

const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "dorm-takeaway-api-"));
process.env.DB_PATH = path.join(tempDir, "app.db");

const { app } = await import("../src/app.js");

let server;
let baseUrl;

test.before(async () => {
  server = app.listen(0);
  await once(server, "listening");
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await fs.rm(tempDir, { recursive: true, force: true });
  delete process.env.DB_PATH;
});

test("GET /api/orders returns the seeded posted order", async () => {
  const response = await fetch(`${baseUrl}/api/orders`);
  assert.equal(response.status, 200);

  const body = await response.json();
  assert.equal(body.total, 1);
  assert.equal(body.list[0].order_no, "DO20260311001");
  assert.equal(body.list[0].status, "posted");
});

test("POST /api/auth/login creates a user and POST /api/orders creates an order", async () => {
  const loginResponse = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      student_id: "20269999",
      nickname: "Test User",
      dorm_building: "Dorm B",
      floor_no: "3",
      room_no: "302"
    })
  });

  assert.equal(loginResponse.status, 200);
  const loginBody = await loginResponse.json();
  assert.match(loginBody.token, /^local-token-/);
  assert.ok(loginBody.user_id);

  const orderResponse = await fetch(`${baseUrl}/api/orders`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      requester_id: loginBody.user_id,
      pickup_location: "Dorm B gate",
      dorm_building: "Dorm B",
      floor_no: "3",
      room_no: "302",
      takeaway_type: "bubble tea",
      service_fee: 2
    })
  });

  assert.equal(orderResponse.status, 201);
  const orderBody = await orderResponse.json();
  assert.equal(orderBody.status, "posted");
  assert.equal(orderBody.requester.id, loginBody.user_id);
  assert.equal(orderBody.pickup_location, "Dorm B gate");
});
