const Employee = require("../models/employee");
const User = require("../models/user");
const Leaves = require("../models/leaves");
const mongoose = require("mongoose");
// Calculate Total Employees
exports.totalEmployees = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.user_id);
  User.aggregate([
    { $match: { _id: id } },
    { $project: { totalEmployees: { $size: "$employees" } } },
  ])
    .then((totalEmployees) => {
      res.status(200).send(totalEmployees[0]);
    })
    .catch((err) => {
      res.status(404).send("Id not found in database");
      console.log(err);
    });
};

// To add new employees
exports.AddEmployee = (req, res) => {
  console.log();
  const empDetails = req.body.employee;
  const hrId = req.body.userId;
  const data = {
    firstname: empDetails.firstname,
    lastname: empDetails.lastname,
    email: empDetails.email,
    mobile: empDetails.mobile,
    streetAdd: empDetails.streetAdd,
    pincode: empDetails.pincode,
    state: empDetails.state,
    country: empDetails.country,
    salary: empDetails.salary,
    department: empDetails.department,
  };

  const employee = new Employee(data);
  User.findById(hrId)
    .then(() => {
      employee
        .save()
        .then((result) => {
          console.log(result);
          User.findByIdAndUpdate(
            { _id: hrId },
            { $push: { employees: result._id } }
          )
            .then(() => {
              res.status(200).send("Employee Added Successfully");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          res.status(401).send("could not add the employee");
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(404).send("could not find the user id");
      console.log(err);
    });
};

// To edit employees
exports.editEmployee = (req, res) => {
  const employee = req.body.employee;
  const updateData = {
    firstname: employee.firstname,
    lastname: employee.lastname,
    email: employee.email,
    mobile: employee.mobile,
    salary: employee.salary,
    department: employee.department,
    streetAdd: employee.streetAdd,
    pincode: employee.pincode,
    state: employee.state,
    country: employee.country,
  };
  const userId = employee._id;
  Employee.findByIdAndUpdate(userId, updateData)
    .then(() => {
      res.status(200).send("Successfully updated");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Failed to update");
    });
};

// Delete Employee
exports.deleteEmployee = (req, res) => {
  const userId = req.body.userId;
  Employee.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send("Employee Deleted from database");
    })
    .catch((err) => console.log(err));
};

// get all employees of a user
exports.getEmployees = (req, res) => {
  User.findById(req.user_id)
    .populate("employees")
    .then((user) => {
      res.status(200).send(user.employees);
    })
    .catch((err) => {
      res.status(404).send("Id not found in database");
      console.log(err);
    });
};

// get all absent Employees Today
exports.getAbsentToday = (req, res) => {
  const today = new Date().toJSON().slice(0, 10).toString();
  User.findById(req.user_id)
    .populate({
      path: "employees",
      populate: {
        path: "leaves",
        model: "leaves",
      },
    })
    .then((user) => {
      const filteredEmployees = [];
      user.employees.filter((employee) => {
        employee.leaves.filter((leave) => {
          if (leave.date == today) filteredEmployees.push(employee);
        });
      });

      res.status(200).send(filteredEmployees);
    })
    .catch((err) => {
      res.status(404).send("Id not found in database");
      console.log(err);
    });
};

// remove Employee leave of a date
exports.removeLeave = (req, res) => {
  const emp_Id = req.body.emp_Id;
  if (emp_Id) {
    Employee.findById(emp_Id)
      .populate("leaves")
      .then((employees) => {
        const leave = employees.leaves.filter((leave) => {
          return leave.date == new Date().toJSON().slice(0, 10).toString();
        });
        if (leave.length > 0) {
          Leaves.findByIdAndDelete(leave[0]._id)
            .then((result) => {
              Employee.updateOne(
                { _id: emp_Id },
                { $pull: { leaves: leave[0]._id } }
              )
                .then((result) => {
                  console.log("leave removed from employee");
                  res.status(200).send("leave removed");
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }
};

// Add Leave of a employee
exports.addLeave = (req, res) => {
  const emp_Id = req.body.emp_Id;
  const leaveData = req.body.leaveData;
  console.log(leaveData);
  Employee.findById(emp_Id)
    .then(() => {
      const leave = new Leaves({
        emp_Id: emp_Id,
        reason: leaveData.reason,
        date: leaveData.date,
      });

      leave
        .save()
        .then((result) => {
          Employee.findByIdAndUpdate(
            { _id: emp_Id },
            { $push: { leaves: result._id } }
          )
            .then(() => {
              console.log("leave ref added to employee collection");
              res.status(200).send("leave ref added to employee collection");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("could not save in leave database");
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("could not find the employee in user Data");
    });
};
