import { Router } from "express";
import pool from "../db.js";

const router = Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { id, restaurent_id, name, price, description, quantity } = req.body;
    const result = await pool.query(
      `INSERT INTO dishes (id, restaurent_id, name, price, description, quantity)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id, restaurent_id, name, price, description, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM dishes ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM dishes WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Dish not found" });
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
    const { restaurent_id, name, price, description, quantity } = req.body;
    const result = await pool.query(
      `UPDATE dishes
       SET restaurent_id = $1, name = $2, price = $3, description = $4, quantity = $5
       WHERE id = $6 RETURNING *`,
      [restaurent_id, name, price, description, quantity, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Dish not found" });
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
      "DELETE FROM dishes WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Dish not found" });
    }
    res.json({ message: "Dish deleted", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
