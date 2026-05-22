const Submission =
  require("../models/Submission");

const fs =
  require("fs");

/* =========================
   CREATE SUBMISSION
========================= */

exports.createSubmission =
  async (req, res) => {

    try {

      const {
        title,
        desc,
        githubUrl,
        videoUrl,
        teamId,
        studentId,
      } = req.body;

      /* FILE REQUIRED */

      if (!req.file) {

        return res.status(400).json({
          success: false,
          message:
            "Please upload PDF/PPT/PPTX file",
        });
      }

      /* FILE DETAILS */

      const fileName =
        req.file.originalname;

      const fileUrl =
        req.file.path;

      /* FIND EXISTING */

      let existing =
        await Submission.findOne({
          studentId,
        });

      /* =========================
         UPDATE EXISTING
      ========================= */

      if (existing) {

        /* DELETE OLD FILE */

        if (
          existing.fileUrl &&
          fs.existsSync(
            existing.fileUrl
          )
        ) {

          fs.unlinkSync(
            existing.fileUrl
          );
        }

        existing.title =
          title;

        existing.desc =
          desc;

        existing.githubUrl =
          githubUrl;

        existing.videoUrl =
          videoUrl;

        existing.fileName =
          fileName;

        existing.fileUrl =
          fileUrl;

        existing.teamId =
          teamId;

        await existing.save();

        return res.json({
          success: true,
          message:
            "Submission updated successfully",
          submission:
            existing,
        });
      }

      /* =========================
         CREATE NEW
      ========================= */

      const submission =
        await Submission.create({

          title,

          desc,

          githubUrl,

          videoUrl,

          fileName,

          fileUrl,

          teamId,

          studentId,
        });

      return res.json({
        success: true,
        message:
          "Submission created successfully",
        submission,
      });

    } catch (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  };

/* =========================
   GET SUBMISSION
========================= */

exports.getSubmission =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const submission =
        await Submission.findOne({
          studentId: id,
        });

      return res.json({
        success: true,
        submission,
      });

    } catch (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  };

/* =========================
   GET ALL SUBMISSIONS
========================= */

exports.getAllSubmissions =
  async (req, res) => {

    try {

      const submissions =
        await Submission.find()
        .sort({
          createdAt: -1,
        });

      return res.json({
        success: true,
        submissions,
      });

    } catch (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  };

/* =========================
   DELETE SUBMISSION
========================= */

exports.deleteSubmission =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const submission =
        await Submission.findOne({
          studentId: id,
        });

      if (!submission) {

        return res.status(404).json({
          success: false,
          message:
            "Submission not found",
        });
      }

      /* DELETE FILE */

      if (
        submission.fileUrl &&
        fs.existsSync(
          submission.fileUrl
        )
      ) {

        fs.unlinkSync(
          submission.fileUrl
        );
      }

      /* DELETE DB ENTRY */

      await Submission.deleteOne({
        studentId: id,
      });

      return res.json({
        success: true,
        message:
          "Submission deleted successfully",
      });

    } catch (err) {

      console.log(err);

      return res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  };