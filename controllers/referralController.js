const User = require("../models/User");

const Team =
  require("../models/Team");

exports.getMyReferral =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).select(
          "referralCode successfulReferrals pendingReferrals rewardUnlocked goodiesUnlocked upiId upiName"
        )

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });

    }

  };

  exports.saveRewardDetails =
  async (req, res) => {

    try {

      const {
        upiId,
        upiName
      } = req.body;

      const user =
        await User.findByIdAndUpdate(
          req.user.id,
          {
            upiId,
            upiName,
          },
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        data: user,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });

    }

  };

exports.updateUpiId =
  async (req, res) => {

    try {

      const { upiId } =
        req.body;

      const user =
        await User.findByIdAndUpdate(
          req.user.id,
          { upiId },
          { new: true }
        );

      res.json({
        success: true,
        upiId: user.upiId,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });

    }

  };

exports.generateReferralCode =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.referralCode) {
        return res.status(200).json({
          success: true,
          referralCode:
            user.referralCode,
        });
      }

      if (
        user.teamRole !==
        "leader"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Only team leaders can generate referral codes",
        });
      }

      const team =
        await Team.findOne({
          code: user.teamId,
        });

      if (!team) {
        return res.status(404).json({
          success: false,
          message:
            "Team not found",
        });
      }

      const teamName =
        team.name
          .replace(/[^a-zA-Z0-9]/g, "")
          .toUpperCase();

      let code;
      let exists = true;

      while (exists) {

        const random =
          Math.floor(
            1000 +
            Math.random() * 9000
          );

        code =
          `OSF-${teamName}-${random}`;

        exists =
          await User.findOne({
            referralCode:
              code,
          });
      }

      user.referralCode =
        code;

      await user.save();

      res.status(200).json({
        success: true,
        referralCode: code,
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