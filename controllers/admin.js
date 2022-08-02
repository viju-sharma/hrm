const Employee = require("../models/employee");
const User = require("../models/user");
const Leaves = require("../models/leaves");

exports.HomePage = (req, res, next) => {
  res.json({ message: "login successful" });
};

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
  console.log(data);
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

exports.getUser = (req, res) => {
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

exports.deleteEmployee = (req, res) => {
  const userId = req.body.userId;
  Employee.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send("Employee Deleted from database");
    })
    .catch((err) => console.log(err));
};

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
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("could not save in leave database");
        });
    })
    .catch((err) => {
      console.log("could not find the employee in user Data");
    });
};
