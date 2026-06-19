const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  creatorCode: {
    type: String,
    unique: true,
    required: true,
  },

  totalReferrals: {
    type: Number,
    default: 0,
  },

  pendingReferrals: {
    type: Number,
    default: 0,
  },

  successfulReferrals: {
    type: Number,
    default: 0,
  },

  otp: String,
  otpExpiry: Date,

  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports =
  mongoose.model(
    "Creator",
    creatorSchema
  );