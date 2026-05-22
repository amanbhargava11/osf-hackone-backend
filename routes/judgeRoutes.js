const express = require("express");
const router = express.Router();

const {
  getAllJudges,
  createJudge,
  deleteJudge
} = require("../controllers/judgeController");

router.get("/all/judges", getAllJudges);

router.post("/create", createJudge);

router.delete("/delete/:id", deleteJudge);

module.exports = router;