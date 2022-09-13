const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const logger = require("morgan");

const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const verificationRoutes = require("./routes/verification");

const { ObjectId } = require("mongodb");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/verify", verificationRoutes);
app.use("/auth", authRoutes);
app.use("/employee", adminRoutes);
app.use("/user", adminRoutes);
mongoose
  .connect(process.env.MONGODB_CLUSTER)
  .then((result) => {
    console.log("database connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("server is spinning on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
