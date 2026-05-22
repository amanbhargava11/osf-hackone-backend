const express = require("express");

const router =
  express.Router();

const {
  getConfig,
  updateConfig,
} = require(
  "../controllers/systemController"
);

router.get(
  "/config",
  getConfig
);

router.put(
  "/config",
  updateConfig
);

module.exports = router;