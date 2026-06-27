// server.js
require("./services/reminderCron");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

/* =========================
   ROUTE IMPORTS
========================= */

const authRoutes =
  require("./routes/authRoutes");

const adminRoutes =
  require("./routes/adminRoutes");

const judgeRoutes =
  require("./routes/judgeRoutes");

const mentorRoutes =
  require("./routes/mentorRoutes");

const noticeRoutes =
  require("./routes/noticeRoutes");

const submissionRoutes =
  require("./routes/submissionRoutes");

const chatRoutes =
  require("./routes/chatRoutes");

const systemRoutes =
  require("./routes/systemRoutes");

const financeRoutes =
  require("./routes/financeRoutes");

const teamRoutes =
  require("./routes/teamRoutes");

const userRoutes =
  require("./routes/userRoutes");

const paymentRoutes =
  require("./routes/paymentRoutes");

const referralRoutes =
  require("./routes/referralRoutes");

const creatorRoutes =
  require("./routes/creatorRoutes");


/* =========================
   Judge/Mentor/AdminJudge
========================= */

const judgeModule = require("./modules/judge");


/* =========================
   EXPRESS APP
========================= */

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =========================
   API ROUTES
========================= */

// ADMIN
app.use(
  "/api/admin",
  adminRoutes
);

// AUTH
app.use(
  "/api/auth",
  authRoutes
);

// USERS
app.use(
  "/api/users",
  userRoutes
);

// TEAMS
app.use(
  "/api/team",
  teamRoutes
);

// SUBMISSIONS
app.use(
  "/api/submission",
  submissionRoutes
);

// JUDGES
app.use(
  "/api/judge",
  judgeRoutes
);

// MENTORS
app.use(
  "/api/mentor",
  mentorRoutes
);

// NOTICES
app.use(
  "/api/notice",
  noticeRoutes
);

// SYSTEM CONFIG
app.use(
  "/api/system",
  systemRoutes
);

// CHAT
app.use(
  "/api/chat",
  chatRoutes
);

// PAYMENTS
app.use(
  "/api/payment",
  paymentRoutes
);

app.use(
  "/api/referral",
  referralRoutes
);

// FINANCE
app.use(
  "/api/finance",
  financeRoutes
);

app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/creator",
  creatorRoutes
);

app.use("/judge-api", judgeModule);

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "OSF HackOne Backend Running 🚀",
  });

});

/* =========================
   DATABASE CONNECTION
========================= */

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {

    console.log(
      "✅ MongoDB Connected"
    );

    /* =========================
       START SERVER
    ========================= */

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  })
  .catch((err) => {

    console.log(
      "❌ MongoDB Error"
    );

    console.log(err);

  });