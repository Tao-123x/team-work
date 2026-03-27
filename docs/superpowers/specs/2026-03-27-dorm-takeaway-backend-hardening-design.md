# Dorm Takeaway Backend Hardening Design

**Date:** 2026-03-27

## Scope

This design covers only the high-priority backend issues found in the dorm takeaway review:

1. identity spoofing and missing authorization
2. non-atomic order acceptance and status transitions
3. missing business constraints around payment and review creation

The missing notification system will be documented in the review report but will not be implemented in this round.

## Goals

- Bind every sensitive operation to an authenticated user identity instead of trusting client-supplied actor IDs.
- Make order acceptance, cancellation, and status transitions atomic so retries and concurrent requests cannot corrupt state.
- Enforce lifecycle and participant validation for payment and review records.
- Add repeatable automated tests for the above rules.
- Produce a Word review document that records findings, root causes, fixes, and verification evidence.

## Non-Goals

- No new real-time notification system
- No online payment gateway or refund engine
- No frontend redesign beyond the minimum API adjustments needed to support secure requests

## Architecture

The server will move from "IDs in request body" authorization to a simple authenticated request context. The existing login flow will still return a local demo token, but the token will be validated on each protected route and resolved to `req.user`. Controllers and services will derive actor identity from `req.user`, not from mutable client payload.

Order mutations will be rewritten around guarded SQL updates that include the current status in the `WHERE` clause and verify the affected row count before logging or incrementing statistics. This makes the database write the source of truth for concurrency decisions instead of earlier in-memory reads.

Payment and review services will validate the target order, the acting user, participant roles, status preconditions, and duplicate record rules before inserting or updating records.

## Data Flow

### Authenticated Requests

1. Client stores the login token.
2. Client sends `Authorization: Bearer <token>` on protected requests.
3. Auth middleware resolves the token to a user record and attaches `req.user`.
4. Controllers pass `req.user.id` into service methods where needed.

### Atomic Order Mutations

1. Service reads the current order snapshot for validation messages and participant checks.
2. Service executes a guarded `UPDATE ... WHERE id = ? AND status = ?`.
3. If no rows changed, service re-reads the order and returns a conflict-style error.
4. Only after a successful update does the service append a status log and update derived counters.

### Payment and Review Rules

1. Service loads the target order.
2. Service verifies authenticated user is the requester for that order.
3. Service verifies lifecycle rules:
   - payment only after `completed`
   - no payment or review on cancelled / incomplete orders
   - review only once and only for the assigned helper
4. Service writes the record and returns it.

## Error Handling

- Missing or malformed auth header returns `401`.
- Token/user mismatch returns `401`.
- Invalid participant or unauthorized actor returns `403`.
- Stale concurrent mutation returns `409`.
- Lifecycle rule violations return `400`.
- Duplicate review or duplicate finalized payment returns `400`.

## Testing Strategy

Server tests will use Node's built-in test runner. Each bug fix will follow red-green:

1. write a failing regression test
2. run the targeted test and confirm failure
3. implement the smallest fix
4. re-run targeted tests
5. run the broader server test suite

The test suite will cover:

- protected routes rejecting missing or forged identities
- order acceptance race safety
- status update / cancellation stale-write rejection
- completed count incrementing only once
- payment restrictions by order state and actor
- review restrictions by order state, actor, and rating bounds

## Deliverables

- backend code changes in `server/src`
- automated tests in `server/tests`
- plan document in `docs/superpowers/plans`
- Word review report summarizing findings, root causes, fixes, and verification evidence
