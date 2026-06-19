const express =
  require("express");

const router =
  express.Router();

const {
  sendAdminOTP,
  verifyAdminOTP,
  sendBulkMail,

  createCreator,
  getAllCreators,
  deleteCreator,
  getCreatorStats,

} = require(
  "../controllers/adminController"
);

router.post(
  "/send-admin-otp",
  sendAdminOTP
);

router.post(
  "/verify-admin-otp",
  verifyAdminOTP
);

router.post(
  "/send-bulk-mail",
  sendBulkMail
);

/* =========================
   CREATOR MANAGEMENT
========================= */

router.post(
  "/creator/create",
  createCreator
);

router.get(
  "/creator/all",
  getAllCreators
);

router.delete(
  "/creator/:id",
  deleteCreator
);

router.get(
  "/creator/stats",
  getCreatorStats
);

module.exports = router;