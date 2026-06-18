const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getMyReferral,
  generateReferralCode,
} = require(
  "../controllers/referralController"
);

router.get(
  "/me",
  authMiddleware,
  getMyReferral
);

router.post(
  "/generate",
  authMiddleware,
  generateReferralCode
);

module.exports =
  router;