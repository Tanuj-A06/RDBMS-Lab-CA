import express from "express";
import { initDB } from "./db.js";

// Import route modules
import deliveryPartnersRouter from "./routes/delivery_partners.js";
import restaurantsRouter from "./routes/restaurants.js";
import customersRouter from "./routes/customers.js";
import dishesRouter from "./routes/dishes.js";
import ordersRouter from "./routes/orders.js";
import reviewsRouter from "./routes/reviews.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Mount routes
app.use("/delivery-partners", deliveryPartnersRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/customers", customersRouter);
app.use("/dishes", dishesRouter);
app.use("/orders", ordersRouter);
app.use("/reviews", reviewsRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Food Delivery CRUD API is running" });
});

// Start server after DB init
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });