import fs from "node:fs";
import path from "node:path";
import db from "./index.js";

const schemaPath = path.resolve(process.cwd(), "src/db/schema.sql");
const seedPath = path.resolve(process.cwd(), "src/db/seed.sql");

db.exec(fs.readFileSync(schemaPath, "utf8"));
db.exec(fs.readFileSync(seedPath, "utf8"));

console.log("Database initialized.");
