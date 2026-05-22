const Notice = require("../models/Notice");
const User = require("../models/User");

/* =========================
   CREATE NOTICE
========================= */

exports.createNotice = async (req, res) => {
  try {
    const {
      title,
      content,
      scope,
      sender,
    } = req.body;

    const notice = await Notice.create({
      title,
      content,
      scope,
      sender,
    });

    /* =========================
       SEND NOTIFICATION
    ========================= */

    let users = [];

    if (scope === "all") {
      users = await User.find();
    }

    if (scope === "approved") {
      users = await User.find({
        teamStatus: "Approved",
      });
    }

    if (scope === "pending") {
      users = await User.find({
        teamStatus: "Pending",
      });
    }

    // Push notification inside each user
    for (const user of users) {
      user.notifications.push({
        title,
        content,
        createdAt: new Date(),
        read: false,
      });

      await user.save();
    }

    res.status(201).json({
      success: true,
      notice,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create notice",
    });
  }
};

/* =========================
   GET ALL NOTICES
========================= */

exports.getAllNotices = async (
  req,
  res
) => {
  try {
    const notices = await Notice.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notices,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notices",
    });
  }
};

/* =========================
   DELETE NOTICE
========================= */

exports.deleteNotice = async (
  req,
  res
) => {
  try {
    await Notice.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Notice deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};