const bcrypt = require('bcrypt');
const User = require("../models/user");
exports.postAddUser = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    if (err) return err;
    const password = hash;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const user = new User(firstName, lastName, email, password);
    user.save();
});
  res.status(200).send("recieved")
  res.end();
};

exports.getUsers = (req, res, next) => {
  User.fetchAll((users) => {
    console.log(users);
  });
};
