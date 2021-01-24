const express = require('express');
const { db } = require('../models/employeemodels.js');
const router = express.Router();
const Employee = require("../models/employeemodels.js")



router.route('/employeeDetails').get((req, res) => {

    Employee.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});


router.post('/applyForLeave' , (req, res) =>{
    fromDate = req.body.from_date;
    toDate = req.body.to_date;
    reason = req.body.reason;

    
    Employee.findOneAndUpdate( {email: req.body.email}, 
        {$inc : {'leavesRequested' : 1}}, 
        {new: true, upsert: true},
        function(err, response) { 
             if (err){
                 console.log(err)
             }
        });

    Employee.updateMany(
        { email: req.body.email, name : req.body.name },
        { 
            '$set': {
                "leavereqs.0.from_date": fromDate,
                "leavereqs.0.to_date" : toDate,
                "leavereqs.0.reason" : reason,
                "leavereqs.0.isRequested" : true
            }
        },{upsert:true},
        function(err,doc) {
            if (err){
            console.log(err)
            } else {
                res.json(doc)
            }
        }
    );
})




router.route("/update").post(function(req, res) {
  Employee.findByIdAndUpdate(
    { _id: req.body._id },
    {
        name : req.body.name,
        email: req.body.email,
        contactNumber : req.body.contactNumber,
        team : req.body.team,
        position : req.body.position,
        salary : req.body.salary,
        address : req.body.address,
        gender : req.body.gender,
        dateOfBirth : req.body.dateOfBirth
    },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.route('/delete').post((req, res)=>{
    let id = req.body._id
    Employee.findByIdAndDelete(id, function(err){
        if (err){
            console.log(err)
        } else{
            res.send("deleted successfully")
        }
    })
})

router.route('/addemployee').post((req, res) => {

    
    let uniquevalue = new Date().valueOf()
    let uniqueId = "HR"+`${uniquevalue}`.slice(7)
    const addedEmployee = new Employee({
        employee_id : uniqueId,
        name : req.body.name,
        email: req.body.email,
        contactNumber : req.body.contactNumber,
        team : req.body.team,
        position : req.body.position,
        salary : req.body.salary,
        address : req.body.address,
        gender : req.body.gender,
        dateOfBirth : req.body.dateOfBirth,
        leavereqs : [
            {   
                email : req.body.email,
                from_date : req.body.from_date,
                to_date : req.body.to_date,
                reason : req.body.reason,
                name : req.body.name,
                isRequested : req.body.isRequested,
                isApproved : req.body.isApproved
            }
        ]

    })

    addedEmployee.save()
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        res.json(error)
    })
})

module.exports = router