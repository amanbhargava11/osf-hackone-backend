const express =
    require("express");

const router =
    express.Router();
    

const {
  createTeam,
  joinTeam,
  getTeam,
  leaveTeam,
  getLeaderboard,
  getAllTeams,
} = require("../controllers/teamController");

router.post(
    "/create",
    createTeam
);

router.post(
    "/join",
    joinTeam
);



router.post(
  "/leave",
  leaveTeam
);

router.get("/all/teams", getAllTeams);

router.get("/leaderboard", getLeaderboard);

router.get("/:code", getTeam);

module.exports = router;