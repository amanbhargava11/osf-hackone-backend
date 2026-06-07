const express =
  require("express");

const router =
  express.Router();

const {
  sendAdminOTP,
  verifyAdminOTP,
  sendBulkMail,
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

module.exports = router;