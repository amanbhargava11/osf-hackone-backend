// // ================================
// // Load Environment Variables
// // ================================
// require("dotenv").config();
// require("./services/reminderCron");

// // ================================
// // Dependencies
// // ================================
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // ================================
// // Route Imports
// // ================================
// const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const judgeRoutes = require("./routes/judgeRoutes");
// const mentorRoutes = require("./routes/mentorRoutes");
// const noticeRoutes = require("./routes/noticeRoutes");
// const submissionRoutes = require("./routes/submissionRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const systemRoutes = require("./routes/systemRoutes");
// const financeRoutes = require("./routes/financeRoutes");
// const teamRoutes = require("./routes/teamRoutes");
// const userRoutes = require("./routes/userRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const referralRoutes = require("./routes/referralRoutes");
// const creatorRoutes = require("./routes/creatorRoutes");

// // Judge Module
// const judgeModule = require("./modules/judge");

// // ================================
// // Express App
// // ================================
// const app = express();

// // ================================
// // Global Error Logging
// // ================================
// process.on("uncaughtException", (err) => {
//   console.error("❌ Uncaught Exception:");
//   console.error(err);
// });

// process.on("unhandledRejection", (err) => {
//   console.error("❌ Unhandled Rejection:");
//   console.error(err);
// });

// // ================================
// // Middleware
// // ================================
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Request Logger
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl}`);
//   next();
// });

// // ================================
// // Health Routes
// // ================================
// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "OSF HackOne Backend Running 🚀",
//   });
// });

// app.get("/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Server is alive",
//     uptime: process.uptime(),
//     timestamp: new Date(),
//   });
// });

// // ================================
// // Static Files
// // ================================
// app.use("/uploads", express.static("uploads"));

// // ================================
// // API Routes
// // ================================
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/team", teamRoutes);
// app.use("/api/submission", submissionRoutes);
// app.use("/api/judge", judgeRoutes);
// app.use("/api/mentor", mentorRoutes);
// app.use("/api/notice", noticeRoutes);
// app.use("/api/system", systemRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/referral", referralRoutes);
// app.use("/api/finance", financeRoutes);
// app.use("/api/creator", creatorRoutes);

// app.use("/judgeapi", judgeModule);

// // ================================
// // 404 Handler
// // ================================
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// // ================================
// // Global Error Handler
// // ================================
// app.use((err, req, res, next) => {
//   console.error("❌ Express Error:");
//   console.error(err);

//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

// ================================
// Start Server
// ================================
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend Working"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Running on", PORT);
});