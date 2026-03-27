import db from "../../src/db/index.js";

function insertUser(id, studentId, nickname, dormBuilding, floorNo, roomNo, completedCount = 0) {
  db.prepare(
    `
    INSERT INTO users (id, student_id, nickname, dorm_building, floor_no, room_no, completed_count)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `
  ).run(id, studentId, nickname, dormBuilding, floorNo, roomNo, completedCount);
}

function insertOrder({
  id,
  orderNo,
  requesterId,
  helperId = null,
  status,
  acceptedAt = null,
  pickedUpAt = null,
  deliveredAt = null,
  completedAt = null
}) {
  db.prepare(
    `
    INSERT INTO delivery_orders (
      id,
      order_no,
      requester_id,
      helper_id,
      pickup_location,
      dorm_building,
      floor_no,
      room_no,
      takeaway_type,
      note,
      service_fee,
      status,
      deadline_at,
      accepted_at,
      picked_up_at,
      delivered_at,
      completed_at
    )
    VALUES (?, ?, ?, ?, 'Dorm A takeaway shelf', 'Dorm A', '6', '602', 'meal', 'Test order', 2.5, ?, '2026-03-27 19:00:00', ?, ?, ?, ?)
    `
  ).run(id, orderNo, requesterId, helperId, status, acceptedAt, pickedUpAt, deliveredAt, completedAt);

  db.prepare(
    `
    INSERT INTO order_status_logs (order_id, operator_id, from_status, to_status, action_note)
    VALUES (?, ?, NULL, ?, 'Seeded status')
    `
  ).run(id, requesterId, status);
}

export function resetTestDatabase() {
  db.exec(`
    DELETE FROM reviews;
    DELETE FROM payments;
    DELETE FROM order_status_logs;
    DELETE FROM delivery_orders;
    DELETE FROM users;
    DELETE FROM sqlite_sequence;
  `);

  insertUser(1, "20260001", "Requester", "Dorm A", "6", "602");
  insertUser(2, "20260002", "Helper", "Dorm A", "5", "503", 1);
  insertUser(3, "20260003", "Other User", "Dorm B", "4", "401");

  insertOrder({
    id: 1,
    orderNo: "DO20260327001",
    requesterId: 1,
    status: "posted"
  });

  insertOrder({
    id: 2,
    orderNo: "DO20260327002",
    requesterId: 1,
    helperId: 2,
    status: "completed",
    acceptedAt: "2026-03-27 18:05:00",
    pickedUpAt: "2026-03-27 18:10:00",
    deliveredAt: "2026-03-27 18:18:00",
    completedAt: "2026-03-27 18:22:00"
  });
}

export function getDb() {
  return db;
}
