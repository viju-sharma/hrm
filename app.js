const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const adminRoute = require("./routes/admin");
const app = express();
app.use(cors());
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoute);
app.listen(3001, () => {
  console.log("server is spinning on port 3001");
});
