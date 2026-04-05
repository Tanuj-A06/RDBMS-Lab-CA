import { Router } from "express";
import pool from "../db.js";

const router = Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { id, restaurent_id, customer_id, description } = req.body;
    const result = await pool.query(
      `INSERT INTO reviews (id, restaurent_id, customer_id, description)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id, restaurent_id, customer_id, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM reviews ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM reviews WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
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
    const { restaurent_id, customer_id, description } = req.body;
    const result = await pool.query(
      `UPDATE reviews
       SET restaurent_id = $1, customer_id = $2, description = $3
       WHERE id = $4 RETURNING *`,
      [restaurent_id, customer_id, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
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
      "DELETE FROM reviews WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
