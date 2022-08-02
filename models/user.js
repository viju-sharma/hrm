const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    _id: {
      type: mongoose.ObjectId,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "employee",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin_users", usersSchema);
