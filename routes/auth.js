const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

const protect = require("../middlewares/protect");

router.post("/signup", authController.Signup);

router.post("/check", protect, authController.checkJWT);
//
router.post("/login", authController.Login);


module.exports = router;
