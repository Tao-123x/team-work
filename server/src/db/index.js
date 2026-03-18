import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const dataDir = path.resolve(process.cwd(), "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new DatabaseSync(path.join(dataDir, "app.db"));
db.exec("PRAGMA journal_mode = WAL;");

const schemaPath = path.resolve(process.cwd(), "src/db/schema.sql");
const seedPath = path.resolve(process.cwd(), "src/db/seed.sql");

db.exec(fs.readFileSync(schemaPath, "utf8"));
db.exec(fs.readFileSync(seedPath, "utf8"));

export default db;
