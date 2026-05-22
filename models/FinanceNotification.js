const mongoose = require("mongoose");

const financeNotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Success", "Failed", "Invoice", "Refund"],
    required: true
  },

  targetEmail: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  sentStatus: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "FinanceNotification",
  financeNotificationSchema
);