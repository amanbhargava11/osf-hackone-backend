const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getMyReferral,
  generateReferralCode,
  saveRewardDetails,
  updateUpiId,
} = require("../controllers/referralController");

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

router.post(
  "/save-upi",
  authMiddleware,
  saveRewardDetails
);

router.put(
  "/upi",
  authMiddleware,
  updateUpiId
);

module.exports = router;