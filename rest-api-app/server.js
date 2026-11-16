
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const studentRoutes = require("./routes/studentRoutes");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Serve admin frontend
app.use(express.static(path.join(__dirname, "public")));

// API health check
app.get("/api/health", async (req, res) => {
    try {
        await db.query("SELECT 1");

        res.json({
            success: true,
            server: "online",
            database: "connected"
        });
    } catch (error) {
        res.status(503).json({
            success: false,
            server: "online",
            database: "disconnected",
            message: error.message
        });
    }
});

// Existing student API
app.use("/api/students", studentRoutes);

// Admin portal
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 404 handler for unknown API routes
app.use("/api", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running: http://localhost:${PORT}`);
    console.log(`🖥️ Admin portal: http://localhost:${PORT}/admin`);
    console.log(`📋 Students API: http://localhost:${PORT}/api/students`);
});
