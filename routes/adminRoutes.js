const express =
  require("express");

const router =
  express.Router();

const {
  sendAdminOTP,
  verifyAdminOTP,
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

module.exports = router;