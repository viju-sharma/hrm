const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    salary: {
      type: Number,
    },
    department: {
      type: String,
    },
    streetAdd: {
      type: String,
    },
    pincode: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    leaves: [
      {
        type: Schema.Types.ObjectId,
        ref: "leaves",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employee", employeeSchema);
