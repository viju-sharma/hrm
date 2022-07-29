const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  // console.log(req)
  if (req.body.authorization && req.body.authorization.startsWith("Bearer")) {
    try {
      const token = req.body.authorization.split(" ")[1];
      console.log("token extracted from req body " +token)
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
        } else {
          req.user_id = decoded.id;
        }
        next();
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.sendStatus(401);
  }
};
