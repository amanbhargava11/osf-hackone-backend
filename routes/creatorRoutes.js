const express =
 require("express");

const router =
 express.Router();

const {
  loginCreator,
  getCreatorDashboard,
  getAllCreators,
  createCreator,
  deleteCreator
} = require("../controllers/creatorController");

const creatorAuth =
 require("../middleware/creatorAuth");

router.post(
 "/login",
 loginCreator
);

router.get(
 "/dashboard",
 creatorAuth,
 getCreatorDashboard
);

router.get(
  "/all",
  getAllCreators
);

router.post(
  "/create",
  createCreator
);

router.delete(
  "/:id",
  deleteCreator
);

module.exports =
 router;