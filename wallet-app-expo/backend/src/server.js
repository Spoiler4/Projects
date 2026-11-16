
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Wallet API is running",
  });
});

// Rate limiting for API requests
app.use("/api/transactions", rateLimiter);

// Routes
app.use("/api/transactions", transactionsRoute);

// Initialize database and start server
initDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);

      if (process.env.NODE_ENV === "production") {
        job.start();
      }
    });
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
    process.exit(1);
  });
