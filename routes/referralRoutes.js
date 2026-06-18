const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  getMyReferral,
} = require(
  "../controllers/referralController"
);

router.get(
  "/me",
  authMiddleware,
  getMyReferral
);

module.exports =
  router;