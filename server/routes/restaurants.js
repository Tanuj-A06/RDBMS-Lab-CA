import { Router } from "express";
import pool from "../db.js";

const router = Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { id, name, contact, email, address } = req.body;
    const result = await pool.query(
      `INSERT INTO restaurants (id, name, contact, email, address)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, name, contact, email, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM restaurants ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM restaurants WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Restaurant not found" });
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
    const { name, contact, email, address } = req.body;
    const result = await pool.query(
      `UPDATE restaurants
       SET name = $1, contact = $2, email = $3, address = $4
       WHERE id = $5 RETURNING *`,
      [name, contact, email, address, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Restaurant not found" });
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
      "DELETE FROM restaurants WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.json({ message: "Restaurant deleted", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
