const User = require("../models/User");

exports.getMyReferral =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.id
        ).select(
          "referralCode successfulReferrals pendingReferrals rewardUnlocked goodiesUnlocked"
        );

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