// models/Message.js

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    channel: {
      type: String,
      required: true,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    senderName: String,

    text: {
      type: String,
      required: true,
    },

    teamId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);