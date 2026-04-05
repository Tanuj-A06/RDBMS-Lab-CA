/**
 * Seed script — reads CSV files from ../data/ and inserts them into the Neon DB.
 * Run with: npm run seed
 *
 * Order matters because of foreign key constraints:
 * 1. delivery_partners (no FK)
 * 2. restaurants       (no FK)
 * 3. customers         (no FK)
 * 4. dishes            (FK → restaurants)
 * 5. orders            (FK → restaurants, customers, delivery_partners)
 * 6. reviews           (FK → restaurants, customers)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool, { initDB } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "data");

/**
 * Parse a simple CSV string into an array of objects.
 * Handles quoted fields that may contain commas.
 */
function parseCSV(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim());
  if (lines.length === 0) return [];

  const headers = parseLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h.trim()] = values[idx]?.trim() ?? "";
    });
    rows.push(obj);
  }
  return rows;
}

function parseLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

async function seedTable(filename, tableName, columns) {
  const csvPath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(csvPath)) {
    console.log(`⚠️  ${filename} not found, skipping`);
    return;
  }

  const text = fs.readFileSync(csvPath, "utf-8");
  const rows = parseCSV(text);
  console.log(`📦 Seeding ${tableName} with ${rows.length} rows...`);

  for (const row of rows) {
    const values = columns.map((col) => {
      const val = row[col];
      if (val === "" || val === undefined) return null;
      return val;
    });

    const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
    const colNames = columns.join(", ");

    try {
      await pool.query(
        `INSERT INTO ${tableName} (${colNames}) VALUES (${placeholders}) ON CONFLICT (id) DO NOTHING`,
        values
      );
    } catch (err) {
      console.error(`  ❌ Error inserting row id=${row.id}: ${err.message}`);
    }
  }
  console.log(`  ✅ ${tableName} seeded`);
}

async function main() {
  await initDB();

  // Seed in FK-safe order
  await seedTable("delivery_partners.csv", "delivery_partners", [
    "id", "name", "contact", "email", "vehicle_no",
  ]);

  await seedTable("restaurants.csv", "restaurants", [
    "id", "name", "contact", "email", "address",
  ]);

  await seedTable("customers.csv", "customers", [
    "id", "contact", "email", "password_hash", "address",
  ]);

  await seedTable("dishes.csv", "dishes", [
    "id", "restaurent_id", "name", "price", "description", "quantity",
  ]);

  await seedTable("orders.csv", "orders", [
    "id", "restaurent_id", "customer_id", "delivery_partners_id", "status", "payment",
  ]);

  await seedTable("reviews.csv", "reviews", [
    "id", "restaurent_id", "customer_id", "description",
  ]);

  console.log("\n🎉 All tables seeded!");
  await pool.end();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
