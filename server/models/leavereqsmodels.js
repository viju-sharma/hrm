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


const Leavereqs = mongoose.model('leavereqs', leaveReqsSchema);
module.exports= Leavereqs;


