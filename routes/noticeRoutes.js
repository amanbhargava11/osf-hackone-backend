const express = require("express");

const router = express.Router();

const {
  createNotice,
  getAllNotices,
  deleteNotice,
} = require("../controllers/noticeController");

router.post(
  "/create",
  createNotice
);

router.get(
  "/all",
  getAllNotices
);

router.delete(
  "/delete/:id",
  deleteNotice
);

module.exports = router;