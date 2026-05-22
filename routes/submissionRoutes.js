const express =
  require("express");

const router =
  express.Router();

const upload =
  require("../middleware/uploadSubmission");

const {
  createSubmission,
  getSubmission,
  deleteSubmission,
  getAllSubmissions,
} = require("../controllers/submissionController");

router.post(
  "/create",
  upload.single("presentation"),
  createSubmission
);

router.get(
  "/all/submissions",
  getAllSubmissions
);

router.get(
  "/:id",
  getSubmission
);

router.delete(
  "/:id",
  deleteSubmission
);

module.exports =
  router;