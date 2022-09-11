const bcrypt = require("bcrypt");
const User = require("../models/user");
const { ObjectId } = require("mongodb");
const signJWT = require("../middlewares/signJwt");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/mail");

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
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
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
      return res.status(404).send({ message: "Account does not exist" });

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }
      console.log("email sent");
      return res
        .status(400)
        .send({ message: "An email is sent to your account please verify" });
    }
    const token = signJWT(user._id);
    const data = { token: token, userId: user._id };
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }

  // User.findOne({ email: email })
  //   .then((user) => {
  //     const hashPassword = user.password;
  //     bcrypt
  //       .compare(password, hashPassword)
  //       .then((result) => {
  //         // if password is correct for the same user
  //         if (result == true) {
  //           let token = signJWT(user._id);
  //           const data = { token: token, userId: user._id };
  //           res.send(data);
  //         } else {
  //           res.status(404).send("Incorrect Password");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   })
  //   .catch((err) => {
  //     res.status(404).send("user not found");
  //   });
};

exports.checkJWT = (req, res) => {
  res.status(202).send({ userId: req.user_id });
};
