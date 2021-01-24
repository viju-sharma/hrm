const mongoose = require('mongoose');


const leaveReqsSchema = new mongoose.Schema({
    email : String,

    from_date : Date,
    to_date : {
        type: Date
    },
    reason : String,
    name : String,
    isRequested : {
        type : Boolean,
        default : false
    },
    isApproved : Boolean,

})

const EmployeesSchema = new mongoose.Schema({
    name : String,
    employee_id : {
        type :String,
    },
    email: {
        type: String,
        required: true
    },
    contactNumber : {
        type     : Number,
        required : true,
        unique   : true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
      },
    dateOfBirth : Date,
    gender: String,

    team : {
        type: String,
        required: true,
    },
    position : {
        type: String,
        required: true,
    },
    salary : {
        type: Number,
        required: true,
    },
    address : {
        type: String,
        required: true,
    },
    leavereqs : [leaveReqsSchema],
    leavesRequested : Number,
    date : {
        type : Date,
        default:Date.now
    }
})

const Employee = mongoose.model('employee', EmployeesSchema);
module.exports= Employee;


