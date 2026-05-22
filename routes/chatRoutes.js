// routes/chatRoutes.js

const express = require("express");
const router = express.Router();

const Message = require("../models/Message");


// GET CHANNEL MESSAGES
router.get("/:channel", async (req, res) => {
  try {
    const { channel } = req.params;

    const messages = await Message.find({ channel })
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// SEND MESSAGE
router.post("/send", async (req, res) => {
  try {
    const { channel, senderId, senderName, text, teamId } = req.body;

    const newMessage = await Message.create({
      channel,
      senderId,
      senderName,
      text,
      teamId,
    });

    res.json({
      success: true,
      message: newMessage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;