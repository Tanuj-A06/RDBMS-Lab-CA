import express from "express";
import cors from "cors";
import { initDB } from "./db.js";

// Import route modules
import deliveryPartnersRouter from "./routes/delivery_partners.js";
import restaurantsRouter from "./routes/restaurants.js";
import customersRouter from "./routes/customers.js";
import dishesRouter from "./routes/dishes.js";
import ordersRouter from "./routes/orders.js";
import reviewsRouter from "./routes/reviews.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Router
const apiRouter = express.Router();

// Mount routes on API router
apiRouter.use("/delivery_partners", deliveryPartnersRouter); // Fixed to match client expectations
apiRouter.use("/restaurants", restaurantsRouter);
apiRouter.use("/customers", customersRouter);
apiRouter.use("/dishes", dishesRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/reviews", reviewsRouter);

// Mount API router
app.use("/api", apiRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Food Delivery CRUD API is running" });
});

// Start server after DB init
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });