const express =
 require("express");

const router =
 express.Router();

const {
 loginCreator,
 getCreatorDashboard
} =
 require("../controllers/creatorController");

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

module.exports =
 router;