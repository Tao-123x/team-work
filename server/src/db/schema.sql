CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT NOT NULL UNIQUE,
  nickname TEXT NOT NULL,
  phone TEXT,
  wechat_openid TEXT,
  dorm_building TEXT NOT NULL,
  floor_no TEXT NOT NULL,
  room_no TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  credit_score REAL NOT NULL DEFAULT 5.0,
  completed_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS delivery_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_no TEXT NOT NULL UNIQUE,
  requester_id INTEGER NOT NULL,
  helper_id INTEGER,
  pickup_location TEXT NOT NULL,
  dorm_building TEXT NOT NULL,
  floor_no TEXT NOT NULL,
  room_no TEXT NOT NULL,
  takeaway_type TEXT,
  note TEXT,
  service_fee REAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'posted',
  deadline_at TEXT,
  accepted_at TEXT,
  picked_up_at TEXT,
  delivered_at TEXT,
  completed_at TEXT,
  cancelled_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (requester_id) REFERENCES users(id),
  FOREIGN KEY (helper_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_status_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  operator_id INTEGER NOT NULL,
  from_status TEXT,
  to_status TEXT NOT NULL,
  action_note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES delivery_orders(id),
  FOREIGN KEY (operator_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL UNIQUE,
  requester_id INTEGER NOT NULL,
  helper_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES delivery_orders(id),
  FOREIGN KEY (requester_id) REFERENCES users(id),
  FOREIGN KEY (helper_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL UNIQUE,
  payer_id INTEGER NOT NULL,
  payee_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  paid_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES delivery_orders(id),
  FOREIGN KEY (payer_id) REFERENCES users(id),
  FOREIGN KEY (payee_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_delivery_orders_status_building_created
ON delivery_orders(status, dorm_building, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_delivery_orders_requester_created
ON delivery_orders(requester_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_delivery_orders_helper_created
ON delivery_orders(helper_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_status_logs_order_created
ON order_status_logs(order_id, created_at DESC);
