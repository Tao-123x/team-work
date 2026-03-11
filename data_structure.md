# Dorm Takeaway Help Data Structure

## Database Recommendation
- MVP recommendation: `SQLite`
- Reason: already available locally, easy to start, no deployment cost, simple for demo
- Upgrade path: keep SQL fields generic so the schema can later move to `MySQL`

## Main Tables

### 1. `users`
Purpose: store student account and dorm information.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | INTEGER / BIGINT | Yes | Primary key |
| `student_id` | TEXT | Yes | Student number, unique |
| `nickname` | TEXT | Yes | Display name |
| `phone` | TEXT | No | Contact number |
| `wechat_openid` | TEXT | No | WeChat unique identity |
| `dorm_building` | TEXT | Yes | Dorm building |
| `floor_no` | TEXT | Yes | Floor number |
| `room_no` | TEXT | Yes | Dorm room number |
| `role` | TEXT | Yes | Default `student` |
| `credit_score` | REAL | Yes | Default 5.0 |
| `completed_count` | INTEGER | Yes | Number of completed deliveries |
| `created_at` | DATETIME | Yes | Create time |
| `updated_at` | DATETIME | Yes | Update time |

### 2. `delivery_orders`
Purpose: store each takeaway help request.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | INTEGER / BIGINT | Yes | Primary key |
| `order_no` | TEXT | Yes | Unique business number |
| `requester_id` | INTEGER / BIGINT | Yes | User who created the request |
| `helper_id` | INTEGER / BIGINT | No | User who accepted the request |
| `pickup_location` | TEXT | Yes | Example: takeaway shelf at dorm gate |
| `dorm_building` | TEXT | Yes | Delivery building |
| `floor_no` | TEXT | Yes | Delivery floor |
| `room_no` | TEXT | Yes | Delivery room |
| `takeaway_type` | TEXT | No | Milk tea, meal, fruit, etc. |
| `note` | TEXT | No | Extra notes |
| `service_fee` | DECIMAL(10,2) | Yes | Helper fee |
| `status` | TEXT | Yes | `posted`, `accepted`, `picked_up`, `delivered`, `completed`, `cancelled` |
| `deadline_at` | DATETIME | No | Desired latest time |
| `accepted_at` | DATETIME | No | Time helper accepted |
| `picked_up_at` | DATETIME | No | Time helper picked up |
| `delivered_at` | DATETIME | No | Time helper delivered |
| `completed_at` | DATETIME | No | Time requester confirmed |
| `cancelled_at` | DATETIME | No | Time requester cancelled |
| `created_at` | DATETIME | Yes | Create time |
| `updated_at` | DATETIME | Yes | Update time |

### 3. `order_status_logs`
Purpose: keep status history for audit and debugging.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | INTEGER / BIGINT | Yes | Primary key |
| `order_id` | INTEGER / BIGINT | Yes | Related order |
| `operator_id` | INTEGER / BIGINT | Yes | User who triggered the action |
| `from_status` | TEXT | No | Previous status |
| `to_status` | TEXT | Yes | New status |
| `action_note` | TEXT | No | Optional note |
| `created_at` | DATETIME | Yes | Action time |

### 4. `reviews`
Purpose: store requester feedback after completion.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | INTEGER / BIGINT | Yes | Primary key |
| `order_id` | INTEGER / BIGINT | Yes | Related order |
| `requester_id` | INTEGER / BIGINT | Yes | Reviewer |
| `helper_id` | INTEGER / BIGINT | Yes | Review target |
| `rating` | INTEGER | Yes | 1 to 5 |
| `comment` | TEXT | No | Review text |
| `created_at` | DATETIME | Yes | Create time |

### 5. `payments`
Purpose: record whether the helper fee has been settled.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | INTEGER / BIGINT | Yes | Primary key |
| `order_id` | INTEGER / BIGINT | Yes | Related order |
| `payer_id` | INTEGER / BIGINT | Yes | Usually requester |
| `payee_id` | INTEGER / BIGINT | Yes | Usually helper |
| `amount` | DECIMAL(10,2) | Yes | Service fee |
| `payment_status` | TEXT | Yes | `pending`, `paid`, `failed`, `offline_confirmed` |
| `payment_method` | TEXT | No | `offline`, `wechat_manual`, etc. |
| `paid_at` | DATETIME | No | Payment time |
| `created_at` | DATETIME | Yes | Create time |

## Relationships
- One user can create many `delivery_orders`.
- One user can accept many `delivery_orders`.
- One `delivery_order` has many `order_status_logs`.
- One completed `delivery_order` can have one `review`.
- One `delivery_order` can have one `payment` record in the MVP.

## Key Constraints
- `users.student_id` should be unique.
- `delivery_orders.order_no` should be unique.
- `helper_id` must be null before the order is accepted.
- A `review` can only be created when order status is `completed`.
- A `payment` record should not be marked `paid` before order status is at least `delivered`.

## Suggested Indexes
- `delivery_orders(status, dorm_building, created_at)`
- `delivery_orders(requester_id, created_at)`
- `delivery_orders(helper_id, created_at)`
- `order_status_logs(order_id, created_at)`
- `reviews(helper_id, created_at)`
