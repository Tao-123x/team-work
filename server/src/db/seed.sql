INSERT OR IGNORE INTO users (
  id,
  student_id,
  nickname,
  dorm_building,
  floor_no,
  room_no
) VALUES
  (1, '20260001', 'Demo User', 'Dorm A', '6', '602'),
  (2, '20260002', 'Helper User', 'Dorm A', '5', '503');

INSERT OR IGNORE INTO delivery_orders (
  id,
  order_no,
  requester_id,
  pickup_location,
  dorm_building,
  floor_no,
  room_no,
  takeaway_type,
  note,
  service_fee,
  status,
  deadline_at
) VALUES
  (
    1,
    'DO20260311001',
    1,
    'Dorm A takeaway shelf',
    'Dorm A',
    '6',
    '602',
    'milk tea',
    'Please call after delivery.',
    2.0,
    'posted',
    '2026-03-11 18:30:00'
  );

INSERT OR IGNORE INTO order_status_logs (
  order_id,
  operator_id,
  from_status,
  to_status,
  action_note
) VALUES
  (1, 1, NULL, 'posted', 'Initial seeded order');
