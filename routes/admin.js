const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

const protect = require("../middlewares/protect").protect;
// /admin/add-product => GET

// /auth/signup => POST
router.get("/", protect, adminController.HomePage);

router.post("/signup", adminController.Signup);

router.post("/check", protect, adminController.checkJWT);
//
router.post("/login", adminController.Login);

// /admin/products => POST
router.get("/users", adminController.getUsers);

module.exports = router;
