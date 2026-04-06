import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import dotenv from "dotenv";

dotenv.config();

// Standard for using Neon Serverless in Node environments
neonConfig.webSocketConstructor = ws;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection on startup
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

/**
 * Run the schema SQL to create all tables if they don't exist.
 */
export async function initDB() {
  const createTables = `
    CREATE TABLE IF NOT EXISTS delivery_partners (
      id INTEGER UNIQUE PRIMARY KEY,
      name VARCHAR(50),
      contact NUMERIC(10),
      email VARCHAR(50),
      vehicle_no VARCHAR(10)
    );

    CREATE TABLE IF NOT EXISTS restaurants (
      id INTEGER UNIQUE PRIMARY KEY,
      name VARCHAR(50),
      contact NUMERIC(10),
      email VARCHAR(50),
      address VARCHAR(100)
    );

    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER UNIQUE PRIMARY KEY,
      contact NUMERIC(10),
      email VARCHAR(50),
      password_hash VARCHAR(64),
      address VARCHAR(100)
    );

    CREATE TABLE IF NOT EXISTS dishes (
      id INTEGER UNIQUE PRIMARY KEY,
      restaurent_id INTEGER NOT NULL,
      name VARCHAR(50),
      price INTEGER,
      description VARCHAR(100),
      quantity VARCHAR(500),
      FOREIGN KEY (restaurent_id) REFERENCES restaurants(id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER UNIQUE PRIMARY KEY,
      restaurent_id INTEGER NOT NULL,
      customer_id INTEGER NOT NULL,
      delivery_partners_id INTEGER NOT NULL,
      status VARCHAR(100),
      payment BOOLEAN,
      FOREIGN KEY (restaurent_id) REFERENCES restaurants(id),
      FOREIGN KEY (customer_id) REFERENCES customers(id),
      FOREIGN KEY (delivery_partners_id) REFERENCES delivery_partners(id)
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER UNIQUE PRIMARY KEY,
      restaurent_id INTEGER NOT NULL,
      customer_id INTEGER NOT NULL,
      description VARCHAR(100),
      FOREIGN KEY (restaurent_id) REFERENCES restaurants(id),
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );
  `;

  try {
    await pool.query(createTables);
    console.log("✅ All tables created / verified");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
    throw err;
  }
}

export default pool;
