const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

const protect = require("../middlewares/protect");

//show home page
router.get("/", protect, adminController.HomePage);

module.exports = router;
