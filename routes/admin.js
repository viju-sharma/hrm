const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

// /admin/add-product => GET

// /admin/add-product => POST
router.post("/add-user", adminController.postAddUser);

// /admin/products => POST
router.get("/users" , adminController.getUsers);

module.exports = router;
