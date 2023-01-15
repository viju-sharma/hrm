const express = require("express");

const router = express.Router();

const {
  HomePage,
  getUserDetails,
  editUserDetails,
} = require("../controllers/admin");

const protect = require("../middlewares/protect");

router.get("/", protect, HomePage);
router.route("/getUserDetails").get(protect, getUserDetails);
router.route("/editUserDetail").post(protect, editUserDetails);

module.exports = router;
