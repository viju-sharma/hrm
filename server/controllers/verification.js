// const bcrypt = require("bcrypt");
const User = require("../models/user");
const { ObjectId } = require("mongodb");
const signJWT = require("../middlewares/signJwt");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/mail");
const bcrypt = require("bcrypt");
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
  console.log(req.body);
  const { id, clientToken, password } = req.body;

  try {
    const user = await User.findOne({ id });
    if (!user)
      return res.status(400).send({ title: "Failed", message: "Invalid Link" });

    const token = await Token.findOne({
      userId: user.id,
      token: clientToken,
    });

    if (!token)
      return res.status(400).send({ title: "Failed", message: "Invalid Link" });
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      if (err) return err;
      await User.findByIdAndUpdate(id, { password: hash });
      await token.remove();
      res.status(200).send({
        title: "Successful",
        message: "Password Changed Successfully",
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ title: "Failed", message: "internal server error" });
  }
};

//when user click forget password
// "/verify/forgetPassword"
exports.forgotPassword = async (req, res, next) => {
  setTimeout(async () => {
    try {
      const user = await User.findOne({ email: req.body.email });
      // if user does not exist then return here
      if (!user)
        return res.status(404).send({ message: "Account Does Not Exists !!!" });

      // check if a token is already created within one hour, if token already exists in then use this token
      let token = await Token.findOne({ userId: user._id });

      // if token doesn't exist then create one here
      if (!token) {
        const _Id = user._id;
        token = await new Token({
          userId: _Id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }

      // this url will be sent on the user's email address to recover his password
      const url = `${process.env.BASE_URL}/forgotPassword/${user._id}/verify/${token.token}/user/${req.body.email}`;

      await sendEmail(req.body.email, "Recover Password", url);

      return res.status(200).send({
        message: "An Email has been sent to recover your Password...",
      });
    } catch (error) {
      res.status(400).send({
        message: "Unkown Error Occured. Please wait for sometime and try again",
      });
      console.log(error);
    }
  }, 2000);
};
