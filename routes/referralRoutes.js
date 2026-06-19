const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getMyReferral,
  generateReferralCode,
  saveRewardDetails,
  updateUpiId,
  createReferral,
  updateReferral,
  deleteReferral,
  getAllReferrals,
  getReferralStats,
  markSuccessful,
} = require("../controllers/referralController");

router.get(
  "/me",
  authMiddleware,
  getMyReferral
);

router.post(
  "/admin/create",
  authMiddleware,
  createReferral
);

router.put(
  "/admin/:id",
  authMiddleware,
  updateReferral
);

router.delete(
  "/admin/:id",
  authMiddleware,
  deleteReferral
);

router.get(
  "/admin/all",
  authMiddleware,
  getAllReferrals
);

router.get(
  "/admin/stats",
  authMiddleware,
  getReferralStats
);

router.put(
  "/admin/success/:id",
  authMiddleware,
  markSuccessful
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