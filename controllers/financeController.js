const FinanceNotification = require("../models/FinanceNotification");

exports.getFinanceNotifications = async (req, res) => {

  try {

    const notifications =
      await FinanceNotification
        .find()
        .sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

exports.createFinanceNotification = async (req, res) => {

  try {

    const notification =
      await FinanceNotification.create(req.body);

    res.json({
      success: true,
      notification
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

exports.clearFinanceNotifications = async (req, res) => {

  try {

    await FinanceNotification.deleteMany();

    res.json({
      success: true,
      message: "All notifications cleared"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};