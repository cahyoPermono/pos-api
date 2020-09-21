const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Node Server Yeah!!");
});

//Getting Routes for api
app.use("/api", require("./src/api"));

app.listen("3000", () => {
  console.log("Your Server Started in port 3000");
});
