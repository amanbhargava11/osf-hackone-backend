const express = require("express");

const router = express.Router();

// Routes
const authRoutes = require("./routes/authRoutes");

// Health Check
router.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    module: "OSF Judge Module",
    version: "1.0.0",
    status: "Running",
  });
});

// Auth Routes
router.use("/auth", authRoutes);

module.exports = router;