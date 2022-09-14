const express = require("express");

const router = express.Router();

const verificationController = require("../controllers/verification");

// const protect = require("../middlewares/protect");
// route "/verify"
router.post("/forgetPassword", verificationController.forgotPassword);
router.get("/:id/verify/:token", verificationController.Verify);

module.exports = router;
