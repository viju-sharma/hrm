const jwt = require("jsonwebtoken");
const User = require("../models/user");
const protect = async (req, res, next) => {
  // console.log(req)
  const cookies = req.headers.cookie;

  if (cookies) {
    try {
      const token = cookies.split("=")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          res.status(400).send("Wrong Token");
        } else {
          User.find({ _id: decoded.id })
            .then((result) => {
              if (result) {
                req.user_id = decoded.id;
                next();
              } else {
                console.log("did not found in data");
                res.status(404).send("Unauthorized");
              }
            })
            .catch((err) => {
              console.log("from protect page " + err);
            });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(401).send("token didnot match");
    }
  } else {
    res.status(401).send("wrong token");
  }
};
module.exports = protect;
