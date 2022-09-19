const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const logger = require("morgan");

const path = require("path");
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

// Serve Static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
