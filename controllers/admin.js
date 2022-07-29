const bcrypt = require("bcrypt");
const User = require("../models/user");
var jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const signJWT = require("../middlewares/signJwt");

exports.Signup = (req, res, next) => {
  const saltRounds = 10;
  const newId = new ObjectId().toString();
  console.log(newId);
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) return err;
    const _id = newId;
    const password = hash;
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    console.log(_id, firstname, lastname, email, password);
    const user = new User({ _id, firstname, lastname, email, password });
    user
      .save()
      .then(() => {
        const token = signJWT(newId);
        res.status(201).send({token : token, userId : newId});
      })
      .catch((error) => {
        console.log(err);
      });
  });
};

exports.getUsers = (req, res, next) => {
  User.find().then((result) => {
    console.log(result);
    res.json(result);
  });
};

/// I was exporting jwt in signjwt file

exports.Login = (req, res, next) => {
  if (req.body.email === "" || req.body.email.password === "") {
    res.status(400).send("cannot be empty field");
    return;
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, user) => {
    if (err) throw err;
    const hashPassword = user.password;
    bcrypt.compare(password, hashPassword, function (err, result) {
      if (err) throw err;
      if (result == true) {
        let token = signJWT(user._id);
        const data = { token: token, userId: user._id };
        res.send(data);
      } else {
        res.status(404).send("Incorrect Password");
      }
    });
  });
  // let token = jwt.sign({ user: "vijender" }, process.env.JWT_SECRET);
  // res.json(token);
};

exports.HomePage = (req, res, next) => {
  res.json({ message: "login successful" });
};

exports.checkJWT = (req, res) => {
  res.status(202).send({userId : req.user_id});
};
