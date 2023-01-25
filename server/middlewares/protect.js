const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { cookieParser } = require("../utils/cookieParser");
const protect = async (req, res, next) => {
  // console.log(req)
  const cookies = req.headers.cookie;

  if (cookies) {
    try {
      const cookieObj = cookieParser(cookies);
      const token = cookieObj["token"];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.find({ _id: decoded.id }).lean();
      if (!user) throw { name: "Unknown User", message: "User not found" };
      req.user_id = decoded.id;
      next();
    } catch (error) {
      console.log("token error", error);
      res.status(402).send({ message: error.message });
    }
  } else {
    res.status(401).send("wrong token");
  }
};
module.exports = protect;
