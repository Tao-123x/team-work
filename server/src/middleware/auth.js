import db from "../db/index.js";

function getTokenFromHeader(header = "") {
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

export function requireAuth(req, res, next) {
  const token = getTokenFromHeader(req.headers.authorization);

  if (!token) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  const matched = token.match(/^local-token-(\d+)$/);
  if (!matched) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(Number(matched[1]));
  if (!user) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }

  req.user = user;
  next();
}
