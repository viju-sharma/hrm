const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leavesSchema = new Schema(
  {
    emp_Id: Schema.Types.ObjectId,
    date: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("leaves", leavesSchema);
