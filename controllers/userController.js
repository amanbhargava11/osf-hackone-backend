// controllers/userController.js

const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* =========================
   UPDATE PROFILE
========================= */

exports.updateProfile =
  async (req, res) => {

    try {

      const {
        name,
        college,
        githubUrl,
        linkedinUrl,
      } = req.body;

      const updatedUser =
        await User.findByIdAndUpdate(
          req.user.id,
          {
            name,
            college,
            githubUrl,
            linkedinUrl,
          },
          {
            new: true,
          }
        ).select("-password");

      res.status(200).json({
        success: true,
        message:
          "Profile updated successfully",
        user: updatedUser,
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
   CHANGE PASSWORD
========================= */

exports.changePassword =
  async (req, res) => {

    try {

      const {
        currentPassword,
        newPassword,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      const isMatch =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          success: false,
          message:
            "Current password incorrect",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message:
          "Password updated successfully",
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
   DELETE ACCOUNT
========================= */

exports.deleteAccount =
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.user.id
      );

      res.status(200).json({
        success: true,
        message:
          "Account deleted successfully",
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