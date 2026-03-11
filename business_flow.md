# Dorm Takeaway Help Business Flow

## Scope
This flow is designed for the MVP of the dorm takeaway help mini-program. The product focus is the last-meter handoff from the takeaway shelf downstairs to the student's dorm room door.

## Core Roles
- Requester: the student who wants someone to bring the takeaway upstairs
- Helper: the student who accepts the request and delivers the takeaway
- System: the mini-program backend that records status, matching, and confirmation

## Main Flow
```mermaid
flowchart TD
    A["Requester logs in"] --> B["Requester creates a delivery request"]
    B --> C["System validates request fields"]
    C --> D["System publishes request to order hall"]
    D --> E["Helper views available requests"]
    E --> F["Helper accepts one request"]
    F --> G["System locks the order to one helper"]
    G --> H["Helper goes to takeaway shelf and picks up order"]
    H --> I["Helper updates status to Picked Up"]
    I --> J["Helper delivers order to dorm room door"]
    J --> K["Helper updates status to Delivered"]
    K --> L["Requester confirms completion"]
    L --> M["System marks order Completed"]
    M --> N["Requester leaves rating and review"]
```

## State Flow
```mermaid
flowchart LR
    A["Posted"] --> B["Accepted"]
    B --> C["Picked Up"]
    C --> D["Delivered"]
    D --> E["Completed"]
    A --> F["Cancelled"]
    B --> F
```

## Business Rules
- One order can only be accepted by one helper.
- Only the requester can cancel an order, and only before the order is marked `Picked Up`.
- Only the assigned helper can change the order from `Accepted` to `Picked Up` and `Delivered`.
- Only the requester can confirm `Completed`.
- Payment can be recorded after the order is completed. For MVP, this can be a fixed service fee field and a payment status field, without real online payment integration.

## Exception Cases
- No helper accepts the order: the request remains in `Posted` until timeout or manual cancellation.
- Wrong helper tries to update status: the backend must reject the action.
- Multiple users try to accept the same order: only the first successful request should lock the order.
- Requester does not confirm after delivery: the order remains in `Delivered` and can be manually reviewed later.

## Suggested MVP Boundary
- Include: create request, accept request, order status updates, completion confirmation, basic rating, simple fee field
- Exclude for now: real-time chat, live map, online payment gateway, refund rules, multi-order dispatch
