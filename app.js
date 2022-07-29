const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const logger = require("morgan");

const mongoose = require("mongoose");
const adminRoute = require("./routes/admin");
const { ObjectId } = require("mongodb");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/auth", adminRoute);

mongoose
  .connect(process.env.MONGODB_CLUSTER)
  .then((result) => {
    console.log("database connected");
    app.listen(process.env.PORT || 3001, () => {
      console.log("server is spinning on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
