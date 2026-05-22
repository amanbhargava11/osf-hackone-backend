const express = require("express");

const router =
  express.Router();

const {
  getAllMentors,
  createMentor,
  deleteMentor,
} = require(
  "../controllers/mentorController"
);

router.get(
  "/all/mentors",
  getAllMentors
);

router.post(
  "/create",
  createMentor
);

router.delete(
  "/delete/:id",
  deleteMentor
);

module.exports = router;