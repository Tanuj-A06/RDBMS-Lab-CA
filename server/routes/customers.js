import { Router } from "express";
import pool from "../db.js";

const router = Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { id, contact, email, password_hash, address } = req.body;
    const result = await pool.query(
      `INSERT INTO customers (id, contact, email, password_hash, address)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, contact, email, password_hash, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { contact, email, password_hash, address } = req.body;
    const result = await pool.query(
      `UPDATE customers
       SET contact = $1, email = $2, password_hash = $3, address = $4
       WHERE id = $5 RETURNING *`,
      [contact, email, password_hash, address, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM customers WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer deleted", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
