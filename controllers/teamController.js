const Team = require("../models/Team");
const User = require("../models/User");


const sendEventMail =
  require("../utils/sendEventMail");

const teamCreatedEmail =
  require("../templates/teamCreatedEmail");

/* =========================
   CREATE TEAM
========================= */

exports.createTeam =
  async (req, res) => {

    try {

      const {
        userId,
        teamName,
      } = req.body;

      const user =
        await User.findById(
          userId
        );

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      if (user.teamId) {

        return res.status(400).json({
          success: false,
          message:
            "Already in team",
        });
      }

      const code =
        Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

      const team =
        await Team.create({
          name: teamName,
          code,
          theme: user.theme,
          problemStatement:
            user.problemStatement,
          members: [user._id],
        });

      user.teamId = team.code;
      user.teamRole = "leader";

      await user.save();

      await sendEventMail({
        to: user.email,

        subject:
          "Team Successfully Registered 🎉",

        html:
          teamCreatedEmail({
            name: user.name,
            teamName: team.name,
            teamCode: team.code,
          }),
      });

      res.json({
        success: true,
        team,
        user,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };

/* =========================
   JOIN TEAM
========================= */

exports.joinTeam =
  async (req, res) => {

    try {

      const {
        userId,
        code,
      } = req.body;

      /* =========================
         FIND USER
      ========================= */

      const user =
        await User.findById(
          userId
        );

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      /* =========================
         ALREADY IN TEAM
      ========================= */

      if (user.teamId) {

        return res.status(400).json({
          success: false,
          message:
            "You are already part of a team",
        });
      }

      /* =========================
         FIND TEAM
      ========================= */

      const team =
        await Team.findOne({
          code:
            code.toUpperCase(),
        });

      if (!team) {

        return res.status(404).json({
          success: false,
          message:
            "Invalid Team Code",
        });
      }

      /* =========================
         TEAM LIMIT
      ========================= */

      if (
        team.members.length >= 3
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Team already full",
        });
      }

      /* =========================
         ALREADY MEMBER
      ========================= */

      const alreadyMember =
        team.members.some(
          (memberId) =>
            memberId.toString() ===
            user._id.toString()
        );

      if (alreadyMember) {

        return res.status(400).json({
          success: false,
          message:
            "Already joined this team",
        });
      }

      /* =========================
         ADD MEMBER
      ========================= */

      team.members.push(
        user._id
      );

      await team.save();

      /* =========================
         UPDATE USER
      ========================= */

      user.teamId =
        team.code;

      user.teamRole =
        "member";

      await user.save();

      /* =========================
         RESPONSE
      ========================= */

      res.status(200).json({

        success: true,

        message:
          "Joined team successfully",

        team,

        user,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
          err.message,
      });
    }
  };


/* =========================
   GET ALL TEAMS
========================= */

exports.getAllTeams = async (req, res) => {

  try {

    const teams = await Team.find()

      .populate({
        path: "members",
        select:
          "name email college gender yearOfStudy githubUrl linkedinUrl"
      });

    const formattedTeams =
      teams.map((team) => ({

        _id: team._id,

        code: team.code,

        name: team.name,

        theme: team.theme,

        problemStatement:
          team.problemStatement,

        createdAt:
          team.createdAt,

        updatedAt:
          team.updatedAt,

        members:
          team.members.map((member) => ({

            _id: member._id,

            name: member.name,

            email: member.email,

            college: member.college,

            gender: member.gender,

            yearOfStudy:
              member.yearOfStudy,

            githubUrl:
              member.githubUrl,

            linkedinUrl:
              member.linkedinUrl,

          })),

      }));

    res.status(200).json({

      success: true,

      count:
        formattedTeams.length,

      teams:
        formattedTeams,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message:
        err.message,

    });

  }

};


/* =========================
   LEADERBOARD
========================= */

exports.getLeaderboard =
  async (req, res) => {

    try {

      const teams =
        await Team.find()
          .populate("members")
          .sort({
            createdAt: 1,
          });

      res.json({
        success: true,
        teams,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  };


/* =========================
 LEAVE TEAM
========================= */

exports.leaveTeam = async (req, res) => {
  try {

    const { userId } = req.body;

    const user =
      await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.teamId) {
      return res.status(400).json({
        success: false,
        message: "User is not in any team",
      });
    }

    const team =
      await Team.findOne({
        code: user.teamId,
      });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    /* REMOVE MEMBER */

    team.members =
      team.members.filter(
        (memberId) =>
          memberId.toString() !==
          user._id.toString()
      );

    /* DELETE TEAM IF EMPTY */

    if (team.members.length === 0) {

      await Team.deleteOne({
        _id: team._id,
      });

    } else {

      await team.save();
    }

    /* RESET USER */

    user.teamId = null;
    user.teamRole = null;

    await user.save();

    res.json({
      success: true,
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* =========================
   GET TEAM
========================= */

exports.getTeam =
  async (req, res) => {

    try {

      const { code } =
        req.params;

      const team =
        await Team.findOne({
          code,
        }).populate("members");

      if (!team) {

        return res.status(404).json({
          success: false,
          message:
            "Team not found",
        });
      }

      res.json({
        success: true,
        team,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };