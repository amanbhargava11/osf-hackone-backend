const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {
  updateProfile,
  changePassword,
  deleteAccount,
} = require(
  "../controllers/userController"
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

router.delete(
  "/delete-account",
  authMiddleware,
  deleteAccount
);

module.exports = router;