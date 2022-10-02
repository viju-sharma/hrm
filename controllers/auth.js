const bcrypt = require("bcrypt");
const User = require("../models/user");
const { ObjectId } = require("mongodb");
const signJWT = require("../middlewares/signJwt");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/mail");

exports.Signup = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
    if (err) return err;
    const password = hash;
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const isUserExists = await User.findOne({ email });
    if (isUserExists)
      return res
        .status(406)
        .send({ message: `Account already exists with the email : ${email}` });

    const user = new User({ firstname, lastname, email, password });
    user
      .save()
      .then(async (item) => {
        const _Id = item._id;
        const token = await new Token({
          userId: _Id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
        res
          .status(201)
          .send({ message: "an email is sent to your account please verify" });
        console.log("email sent");
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });
};

//login
exports.Login = async (req, res, next) => {
  if (req.body.email === "" || req.body.email.password === "") {
    res.status(400).send("cannot be empty field");
    return;
  }
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(404).send({ message: "Account does not exist" });

    const hashPassword = user.password;

    const validPassword = await bcrypt.compare(password, hashPassword);
    if (!validPassword)
      return res.status(404).send({ message: "Invalid usernamee or password" });

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }
      console.log("email sent");
      return res
        .status(400)
        .send({ message: "An email is sent to your account please verify" });
    }
    const token = signJWT(user._id);
    res.cookie(String(user._id), token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    return res
      .status(200)
      .send({ userId: user._id, message: "Login Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.checkJWT = (req, res) => {
  res.status(202).send({ userId: req.user_id });
};

exports.logout = async (req, res) => {
  res.clearCookie(`${req.user_id}`);
  return res.status(201).send({ message: "Logged Out Succesfully" });
};
