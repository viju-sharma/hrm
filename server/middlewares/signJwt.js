const jwt = require("jsonwebtoken");

const signJWT = (_id) => {
  return jwt.sign({ id : _id }, process.env.JWT_SECRET);
};

module.exports = signJWT;