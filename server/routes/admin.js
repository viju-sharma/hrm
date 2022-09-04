const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");

const protect = require("../middlewares/protect");

//show home page
router.get("/", protect, adminController.HomePage);

// add employee
router.post("/addEmployee", protect, adminController.AddEmployee);

//edit Employee Details
router.post("/editEmployee", protect, adminController.editEmployee);

// Delete Employee
router.post("/deleteEmployee", protect, adminController.deleteEmployee);

// See all userDetails
router.get("/getUser", protect, adminController.getUser);

// get All absent today
router.get("/getAbsentToday", protect, adminController.getAbsentToday);

//to add leaves
router.post("/addLeave", protect, adminController.addLeave);

//to remove leave
router.post("/removeLeave", protect, adminController.removeLeave);

module.exports = router;
