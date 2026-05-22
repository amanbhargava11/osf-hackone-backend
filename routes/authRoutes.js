const express = require("express");

const router = express.Router();

const {
  sendOtp,
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
} = require(
  "../controllers/authController"
);
const authMiddleware =
  require("../middleware/authMiddleware");

/* =========================
   AUTH ROUTES
========================= */

router.post(
  "/send-otp",
  sendOtp
);

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.get(
  "/me",
  authMiddleware,
  getMe
);

router.get(
  "/all/users",
  getAllUsers
);

module.exports = router;