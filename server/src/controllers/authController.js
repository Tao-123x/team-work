import { loginOrCreateUser } from "../services/authService.js";

export function login(req, res) {
  const { student_id, nickname, dorm_building, floor_no, room_no } = req.body;

  if (!student_id || !nickname || !dorm_building || !floor_no || !room_no) {
    res.status(400).json({ message: "Missing required login fields" });
    return;
  }

  const result = loginOrCreateUser(req.body);
  res.json(result);
}
