请用 superpowers skills 帮我对这个“宿舍帮取外卖”项目做一次完整复查。

要求按这个流程执行：
1. 先用 requesting-code-review 做全面审查，重点看订单状态流转、并发抢单、权限校验、取消/退款、消息通知、异常处理和边界条件。
2. 把发现的问题按严重程度排序。
3. 对高优先级问题，用 writing-plans 生成修复计划。
4. 对每个具体 bug，先用 systematic-debugging 找根因，不要直接猜修法。
5. 修复时按 test-driven-development 做，先补失败测试，再写实现。
6. 在宣布完成前，必须执行 verification-before-completion。

先从第 1 步开始。
# Dorm Takeaway Backend Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Secure the dorm takeaway backend against identity spoofing, stale concurrent order mutations, and invalid payment/review records while adding regression tests and a review report.

**Architecture:** Add auth middleware that resolves the demo token into `req.user`, shift controllers/services to server-derived actor identity, and harden order writes with guarded SQL updates plus affected-row checks. Restrict payment/review writes to valid completed orders and authorized participants, then capture all findings and fixes in a generated review document.

**Tech Stack:** Node.js 25, Express 4, node:sqlite, Node test runner, custom `.docx` generation script

---

### Task 1: Add Server Test Harness

**Files:**
- Modify: `server/package.json`
- Create: `server/tests/helpers/testServer.js`
- Create: `server/tests/helpers/testDb.js`

- [ ] **Step 1: Write the failing test harness usage**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { createTestServer } from "./helpers/testServer.js";

test("test harness can boot a fresh app and health-check it", async () => {
  const { request, close } = await createTestServer();
  const response = await request("/api/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.ok, true);

  await close();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --test-name-pattern="test harness can boot a fresh app and health-check it"`
Expected: FAIL because the test script / helper does not exist yet

- [ ] **Step 3: Write minimal implementation**

```js
// server/package.json
{
  "scripts": {
    "test": "node --test tests/**/*.test.js"
  }
}
```

```js
// server/tests/helpers/testServer.js
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function createTestServer() {
  const appModule = await import(pathToFileURL(path.resolve("src/app.js")).href + `?t=${Date.now()}`);
  const server = appModule.createServer(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const port = server.address().port;

  return {
    async request(url, options = {}) {
      const response = await fetch(`http://127.0.0.1:${port}${url}`, options);
      return {
        status: response.status,
        body: await response.json()
      };
    },
    async close() {
      await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
    }
  };
}
```

```js
// server/tests/helpers/testDb.js
import fs from "node:fs";
import path from "node:path";

export function resetTestDatabase() {
  const dbPath = path.resolve("data", "app.db");
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --test-name-pattern="test harness can boot a fresh app and health-check it"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add server/package.json server/tests/helpers/testServer.js server/tests/helpers/testDb.js
git commit -m "test: add server integration harness"
```

### Task 2: Lock Requests To Authenticated Users

**Files:**
- Modify: `server/src/app.js`
- Create: `server/src/middleware/auth.js`
- Modify: `server/src/controllers/ordersController.js`
- Modify: `server/src/controllers/paymentsController.js`
- Modify: `server/src/controllers/reviewsController.js`
- Modify: `client/src/api/http.js`

- [ ] **Step 1: Write the failing auth regression tests**

```js
test("accept order rejects requests without auth", async () => {
  const { request, close } = await createTestServer();
  const response = await request("/api/orders/1/accept", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });

  assert.equal(response.status, 401);
  await close();
});

test("my orders endpoint ignores spoofed user_id and uses authenticated user", async () => {
  const { request, close } = await createTestServer();
  const response = await request("/api/me/orders?user_id=999&role=requester", {
    headers: { Authorization: "Bearer local-token-1" }
  });

  assert.equal(response.status, 200);
  assert.equal(response.body.list.every((order) => order.requester_id === 1), true);
  await close();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/auth-authorization.test.js`
Expected: FAIL because protected routes currently allow unauthenticated / spoofed access

- [ ] **Step 3: Write minimal implementation**

```js
// auth middleware parses Bearer token, validates local-token-<id>, loads user, sets req.user
// controllers remove actor IDs from public body contract and derive actor from req.user.id
// client request helper sends Authorization when a token exists in storage
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/auth-authorization.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add server/src/app.js server/src/middleware/auth.js server/src/controllers/ordersController.js server/src/controllers/paymentsController.js server/src/controllers/reviewsController.js client/src/api/http.js server/tests/auth-authorization.test.js
git commit -m "fix: bind protected actions to authenticated users"
```

### Task 3: Make Order Mutations Atomic

**Files:**
- Modify: `server/src/services/orderService.js`
- Modify: `server/src/middleware/errorHandler.js`
- Create: `server/tests/order-concurrency.test.js`

- [ ] **Step 1: Write the failing order mutation tests**

```js
test("second acceptance attempt returns conflict and does not append a fake log", async () => {
  // seed posted order, accept once as helper 2, accept again as helper 1
});

test("cancelling an accepted order after it was picked up returns conflict instead of overwriting status", async () => {
  // drive order to picked_up, then issue cancel based on stale expectation
});

test("completion only increments helper completed_count once", async () => {
  // complete order twice and assert completed_count increases by exactly 1
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/order-concurrency.test.js`
Expected: FAIL because stale writes currently succeed or log incorrectly

- [ ] **Step 3: Write minimal implementation**

```js
// guarded UPDATEs:
// accept: WHERE id = ? AND status = 'posted' AND helper_id IS NULL
// status update: WHERE id = ? AND status = ?
// cancel: WHERE id = ? AND status IN ('posted', 'accepted')
// check result.changes before logging / side effects
// return 409 when the row changed underneath us
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/order-concurrency.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add server/src/services/orderService.js server/src/middleware/errorHandler.js server/tests/order-concurrency.test.js
git commit -m "fix: harden order state transitions against stale writes"
```

### Task 4: Enforce Payment And Review Business Rules

**Files:**
- Modify: `server/src/services/paymentService.js`
- Modify: `server/src/services/reviewService.js`
- Create: `server/tests/payment-review-constraints.test.js`

- [ ] **Step 1: Write the failing business rule tests**

```js
test("manual payment rejects incomplete orders", async () => {
  // pay for posted order => 400
});

test("manual payment rejects non-requester actors", async () => {
  // helper attempts payment => 403
});

test("review rejects incomplete orders and invalid ratings", async () => {
  // review before completion => 400
  // rating 6 => 400
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/payment-review-constraints.test.js`
Expected: FAIL because service layer currently inserts records without lifecycle checks

- [ ] **Step 3: Write minimal implementation**

```js
// payment: load order, require completed state, require requester actor, require helper exists, freeze payer/payee/amount from order
// review: load order, require completed state, require requester actor, require helper match, require rating 1..5, reject duplicates cleanly
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- tests/payment-review-constraints.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add server/src/services/paymentService.js server/src/services/reviewService.js server/tests/payment-review-constraints.test.js
git commit -m "fix: enforce payment and review lifecycle rules"
```

### Task 5: Record Findings In A Word Review Report

**Files:**
- Create: `tools/generate_review_report.py`
- Create: `docs/reports/2026-03-27-dorm-takeaway-review-report.docx`

- [ ] **Step 1: Write the failing report generation smoke test**

```python
from pathlib import Path
from generate_review_report import build_report

def test_build_report_writes_docx(tmp_path: Path):
    output = tmp_path / "report.docx"
    build_report(output, {"title": "Demo", "sections": []})
    assert output.exists()
    assert output.read_bytes()[:2] == b"PK"
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m pytest tools/tests/test_generate_review_report.py -q`
Expected: FAIL because generator does not exist yet

- [ ] **Step 3: Write minimal implementation**

```python
# build a small valid .docx zip with [Content_Types].xml, _rels/.rels, word/document.xml, and word/styles.xml
# render findings, root causes, fixes, and verification sections from structured data
```

- [ ] **Step 4: Run test to verify it passes**

Run: `python -m pytest tools/tests/test_generate_review_report.py -q`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tools/generate_review_report.py docs/reports/2026-03-27-dorm-takeaway-review-report.docx tools/tests/test_generate_review_report.py
git commit -m "docs: generate dorm takeaway review report"
```
