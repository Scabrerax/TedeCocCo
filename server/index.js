const express = require("express");
const parsing = require("../imports/api/parsing");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    credentials: false,
    origin: ["http://localhost:5000"],
    exposedHeaders: ["Session", "Access-Token", "Uid"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/parsing", parsing);

app.listen(9000);
