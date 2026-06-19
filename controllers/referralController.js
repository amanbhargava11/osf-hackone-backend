const User = require("../models/User");

const Team = require("../models/Team");
const Referral = require("../models/Referral");




exports.getAllReferrals = async (req, res) => {
  try {

    const referrals = await Referral.find()
      .populate(
        "referrerId",
        "name email referralCode upiId upiName"
      )
      .populate(
        "referredUserId",
        "name email"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: referrals,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

exports.updateReferral =
  async (req, res) => {

    try {

      const { status } = req.body;

      const referral =
        await Referral.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

      res.json({
        success: true,
        data: referral,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });

    }

  };

exports.getReferralStats =
  async (req, res) => {

    try {

      const total =
        await Referral.countDocuments();

      const successful =
        await Referral.countDocuments({
          status: "Successful",
        });

      const pending =
        await Referral.countDocuments({
          status: "Pending Payment",
        });

      const rewardsUnlocked =
        await User.countDocuments({
          rewardUnlocked: true,
        });

      res.json({
        success: true,
        stats: {
          total,
          successful,
          pending,
          rewardsUnlocked,
        },
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });

    }

  };

exports.createReferral =
  async (req, res) => {

    try {

      const referral =
        await Referral.create(
          req.body
        );

      res.json({
        success: true,
        data: referral,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });

    }

  };

exports.deleteReferral =
  async (req, res) => {

    try {

      await Referral.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Referral deleted",
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });

    }

  };

exports.markSuccessful =
  async (req, res) => {

    try {

      const referral =
        await Referral.findById(
          req.params.id
        );

      if (!referral) {
        return res.status(404).json({
          success: false,
        });
      }

      if (referral.status === "Successful") {
        return res.status(400).json({
          success: false,
          message: "Already marked successful",
        });
      }

      referral.status =
        "Successful";

      await referral.save();

      const referrer =
        await User.findById(
          referral.referrerId
        );

      if (referrer) {

        referrer.pendingReferrals = Math.max(
          0,
          referrer.pendingReferrals - 1
        );

        referrer.successfulReferrals += 1;

        if (
          referrer.successfulReferrals >= 5
        ) {
          referrer.rewardUnlocked = true;
        }

        if (
          referrer.successfulReferrals >= 9
        ) {
          referrer.goodiesUnlocked = true;
        }

        await referrer.save();
      }

      res.json({
        success: true,
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message,
      });

    }

  };

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