const mongoose = require("mongoose");

const submissionSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      desc: {
        type: String,
        required: true,
      },

      githubUrl: {
        type: String,
        required: true,
      },

      videoUrl: {
        type: String,
        required: true,
      },

      fileName: {
        type: String,
        required: true,
      },

      teamId: {
        type: String,
        default: null,
      },

      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      fileName: {
        type: String,
        required: true,
      },

      fileUrl: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Submission",
    submissionSchema
  );