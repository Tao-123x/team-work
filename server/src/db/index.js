import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.resolve(moduleDir, "../../data", "app.db");
const dataDir = path.dirname(dbPath);
const schemaPath = process.env.DB_SCHEMA_PATH
  ? path.resolve(process.env.DB_SCHEMA_PATH)
  : path.resolve(moduleDir, "schema.sql");
const seedPath = process.env.DB_SEED_PATH
  ? path.resolve(process.env.DB_SEED_PATH)
  : path.resolve(moduleDir, "seed.sql");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new DatabaseSync(dbPath);
db.exec("PRAGMA journal_mode = WAL;");

db.exec(fs.readFileSync(schemaPath, "utf8"));
db.exec(fs.readFileSync(seedPath, "utf8"));

export default db;
