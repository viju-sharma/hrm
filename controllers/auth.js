const bcrypt = require("bcrypt");
const User = require("../models/user");
const { ObjectId } = require("mongodb");
const signJWT = require("../middlewares/signJwt");

exports.Signup = (req, res, next) => {
  const saltRounds = 10;
  const newId = new ObjectId();
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
        const token = signJWT(newId.toString());
        res.status(201).send({ token: token, userId: newId });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//login
exports.Login = (req, res, next) => {
  if (req.body.email === "" || req.body.email.password === "") {
    res.status(400).send("cannot be empty field");
    return;
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      const hashPassword = user.password;
      bcrypt
        .compare(password, hashPassword)
        .then((result) => {
          // if password is correct for the same user
          if (result == true) {
            let token = signJWT(user._id);
            const data = { token: token, userId: user._id };
            res.send(data);
          } else {
            res.status(404).send("Incorrect Password");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(404).send("user not found");
    });
};

exports.checkJWT = (req, res) => {
  res.status(202).send({ userId: req.user_id });
};
