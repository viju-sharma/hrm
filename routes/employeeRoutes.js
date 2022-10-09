const express = require("express");
const {
  totalEmployees,
  AddEmployee,
  editEmployee,
  deleteEmployee,
  getEmployees,
  getAbsentToday,
  addLeave,
  removeLeave,
} = require("../controllers/employeeController");

const router = express.Router();

const protect = require("../middlewares/protect");

// GET ALL EMPLOYEES :-
router.get("/totalEmployees", protect, totalEmployees);

// add employee
router.post("/addEmployee", protect, AddEmployee);

//edit Employee Details
router.post("/editEmployee", protect, editEmployee);

// Delete Employee
router.post("/deleteEmployee", protect, deleteEmployee);

// See all userDetails
router.get("/getEmployees", protect, getEmployees);

// get All absent today
router.get("/getAbsentToday", protect, getAbsentToday);

//to add leaves
router.post("/addLeave", protect, addLeave);

//to remove leave
router.post("/removeLeave", protect, removeLeave);

module.exports = router;
