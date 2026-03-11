# API and Page Field Definition

## Recommended Frontend Pages

### 1. Home / Order Hall
Purpose: show open requests that can be accepted.

Display fields:
- Order number
- Pickup location
- Dorm building
- Floor and room
- Service fee
- Deadline
- Short note
- Current status

Main actions:
- Filter by dorm building
- View order detail
- Accept order

### 2. Create Request Page
Purpose: let the requester post a new takeaway help request.

Input fields:
- Pickup location
- Dorm building
- Floor number
- Room number
- Takeaway type
- Note
- Service fee
- Deadline

Validation rules:
- Pickup location, dorm building, floor number, room number, and service fee are required
- Service fee must be greater than or equal to 0

### 3. Order Detail Page
Purpose: show the full order and current progress.

Display fields:
- Order number
- Requester nickname
- Helper nickname
- Pickup location
- Dorm address
- Note
- Service fee
- Status
- Timeline of status updates

Main actions:
- Accept order
- Mark as picked up
- Mark as delivered
- Confirm completion
- Cancel order

### 4. My Orders Page
Purpose: separate orders created by me and orders accepted by me.

Display fields:
- Order number
- Role in order
- Status
- Service fee
- Created time
- Deadline

Tabs:
- My Requests
- My Accepted Orders

### 5. Profile Page
Purpose: show account and trust information.

Display fields:
- Student ID
- Nickname
- Dorm building
- Floor and room
- Credit score
- Completed count
- Average rating

Main actions:
- Edit profile
- View reviews

## API Definition

### 1. `POST /api/auth/login`
Purpose: log in the user or create a local session.

Request body:
```json
{
  "student_id": "20260001",
  "nickname": "Tom",
  "dorm_building": "Building A",
  "floor_no": "5",
  "room_no": "503"
}
```

Response body:
```json
{
  "user_id": 1,
  "token": "local-demo-token",
  "nickname": "Tom"
}
```

### 2. `GET /api/orders`
Purpose: get available orders for the order hall.

Query params:
- `status`
- `dorm_building`
- `page`
- `page_size`

Response body:
```json
{
  "list": [
    {
      "id": 101,
      "order_no": "DO20260311001",
      "pickup_location": "Dorm A takeaway shelf",
      "dorm_building": "Dorm A",
      "floor_no": "6",
      "room_no": "602",
      "service_fee": 2.0,
      "status": "posted",
      "deadline_at": "2026-03-11 18:30:00"
    }
  ],
  "total": 1
}
```

### 3. `POST /api/orders`
Purpose: create a new delivery request.

Request body:
```json
{
  "requester_id": 1,
  "pickup_location": "Dorm A takeaway shelf",
  "dorm_building": "Dorm A",
  "floor_no": "6",
  "room_no": "602",
  "takeaway_type": "milk tea",
  "note": "Please call when you arrive.",
  "service_fee": 2.0,
  "deadline_at": "2026-03-11 18:30:00"
}
```

### 4. `GET /api/orders/:id`
Purpose: get order detail and timeline.

Response body:
```json
{
  "id": 101,
  "order_no": "DO20260311001",
  "status": "accepted",
  "requester": {
    "id": 1,
    "nickname": "Tom"
  },
  "helper": {
    "id": 2,
    "nickname": "Lucy"
  },
  "pickup_location": "Dorm A takeaway shelf",
  "dorm_building": "Dorm A",
  "floor_no": "6",
  "room_no": "602",
  "service_fee": 2.0,
  "timeline": [
    {
      "to_status": "posted",
      "created_at": "2026-03-11 17:00:00"
    },
    {
      "to_status": "accepted",
      "created_at": "2026-03-11 17:05:00"
    }
  ]
}
```

### 5. `POST /api/orders/:id/accept`
Purpose: helper accepts an order.

Request body:
```json
{
  "helper_id": 2
}
```

Business rule:
- Only orders in `posted` status can be accepted.

### 6. `POST /api/orders/:id/pickup`
Purpose: helper marks order as picked up.

Request body:
```json
{
  "helper_id": 2
}
```

Business rule:
- Only the assigned helper can perform this action.

### 7. `POST /api/orders/:id/deliver`
Purpose: helper marks order as delivered.

Request body:
```json
{
  "helper_id": 2
}
```

### 8. `POST /api/orders/:id/confirm`
Purpose: requester confirms the order is completed.

Request body:
```json
{
  "requester_id": 1
}
```

### 9. `POST /api/orders/:id/cancel`
Purpose: requester cancels the order.

Request body:
```json
{
  "requester_id": 1,
  "reason": "No longer needed"
}
```

Business rule:
- The order cannot be cancelled after `picked_up`.

### 10. `GET /api/me/orders`
Purpose: get my created and accepted orders.

Query params:
- `user_id`
- `role` with values `requester` or `helper`

### 11. `POST /api/reviews`
Purpose: requester leaves a review after completion.

Request body:
```json
{
  "order_id": 101,
  "requester_id": 1,
  "helper_id": 2,
  "rating": 5,
  "comment": "Very fast and polite."
}
```

### 12. `POST /api/payments/manual-confirm`
Purpose: mark a payment as manually settled for MVP.

Request body:
```json
{
  "order_id": 101,
  "payer_id": 1,
  "payee_id": 2,
  "amount": 2.0,
  "payment_method": "offline"
}
```

## MVP Implementation Order
1. Login and profile storage
2. Create request
3. Order hall list
4. Accept order
5. Update status to picked up / delivered / completed
6. Basic review and manual payment record
