import { Router } from "express";
import pool from "../db.js";

const router = Router();

// CREATE - Add a new delivery partner
router.post("/", async (req, res) => {
  try {
    const { id, name, contact, email, vehicle_no } = req.body;
    const result = await pool.query(
      `INSERT INTO delivery_partners (id, name, contact, email, vehicle_no)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, name, contact, email, vehicle_no]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - Get all delivery partners
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM delivery_partners ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - Get a single delivery partner by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM delivery_partners WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Delivery partner not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Update a delivery partner by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, email, vehicle_no } = req.body;
    const result = await pool.query(
      `UPDATE delivery_partners
       SET name = $1, contact = $2, email = $3, vehicle_no = $4
       WHERE id = $5 RETURNING *`,
      [name, contact, email, vehicle_no, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Delivery partner not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Delete a delivery partner by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM delivery_partners WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Delivery partner not found" });
    }
    res.json({ message: "Delivery partner deleted", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
