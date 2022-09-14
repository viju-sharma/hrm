// const bcrypt = require("bcrypt");
const User = require("../models/user");
const { ObjectId } = require("mongodb");
const signJWT = require("../middlewares/signJwt");
const Token = require("../models/token");
// const crypto = require("crypto");
// const sendEmail = require("../utils/mail");

//verify token for sign up
exports.Verify = async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    const token = await Token.findOne({
      userId: user.id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "Invalid Link" });

    await User.findByIdAndUpdate(user.id, { verified: true });
    await token.remove();

    res.status(200).send({ message: "email verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

exports.ChangePassword = async (req, res, next) => {
  console.log(req.params);
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    const token = await Token.findOne({
      userId: user.id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "Invalid Link" });
  } catch (error) {}
};

//when user click forget password
// "/verify/forgetPassword"
exports.forgotPassword = async (req, res, next) => {
  setTimeout(async () => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user)
      return res.status(404).send({ message: "Account Does Not Exists !!!" });
    return res
      .status(200)
      .send({ message: "An Email has been sent to recover your Password..." });
  }, 2000);
  // all working is remaining to send a mail to user
};
