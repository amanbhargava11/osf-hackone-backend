const mongoose = require("mongoose");

const systemConfigSchema =
  new mongoose.Schema(
    {
      activePhase: {
        type: String,
        default: "Registration",
      },

      registrationOpen: {
        type: Boolean,
        default: true,
      },

      submissionOpen: {
        type: Boolean,
        default: true,
      },

      timerMinutes: {
        type: Number,
        default: 0,
      },

      globalBanner: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "SystemConfig",
    systemConfigSchema
  );