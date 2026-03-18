import db from "../db/index.js";

export function loginOrCreateUser(payload) {
  const existing = db
    .prepare("SELECT * FROM users WHERE student_id = ?")
    .get(payload.student_id);

  if (existing) {
    db.prepare(
      `
      UPDATE users
      SET nickname = ?, dorm_building = ?, floor_no = ?, room_no = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `
    ).run(payload.nickname, payload.dorm_building, payload.floor_no, payload.room_no, existing.id);

    return {
      user_id: existing.id,
      token: `local-token-${existing.id}`,
      nickname: payload.nickname
    };
  }

  const result = db
    .prepare(
      `
      INSERT INTO users (student_id, nickname, dorm_building, floor_no, room_no)
      VALUES (?, ?, ?, ?, ?)
      `
    )
    .run(
      payload.student_id,
      payload.nickname,
      payload.dorm_building,
      payload.floor_no,
      payload.room_no
    );

  return {
    user_id: result.lastInsertRowid,
    token: `local-token-${result.lastInsertRowid}`,
    nickname: payload.nickname
  };
}
