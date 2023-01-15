const User = require("../models/user");
exports.HomePage = (req, res, next) => {
  res.json({ message: "login successful" });
};

exports.getUserDetails = async (req, res) => {
  const id = req.user_id;
  // console.log(id);
  const user = await User.findById(id).select(
    "_id firstname lastname email profileImg"
  );
  if (!user) return res.status(404).send({ message: "User Not Found" });
  return res.status(200).send({ message: "fetched Sucessfully", user });
};

exports.editUserDetails = async (req, res) => {
  const data = ({ firstname, lastname, profileImg } = req.body);
  await User.findByIdAndUpdate(req.user_id, data)
    .select("_id firstname lastname email profileImg")
    .then(() => res.status(200).send({ message: "Updated Sucessfully" }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Could Not Update", errName: err.name });
    });
};
