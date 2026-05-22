const express = require("express");

const router = express.Router();

const {
  getFinanceNotifications,
  createFinanceNotification,
  clearFinanceNotifications
} = require("../controllers/financeController");

router.get(
  "/notifications",
  getFinanceNotifications
);

router.post(
  "/notifications",
  createFinanceNotification
);

router.delete(
  "/notifications",
  clearFinanceNotifications
);

module.exports = router;