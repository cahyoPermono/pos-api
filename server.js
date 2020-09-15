const express = require("express");
const bodyParser = require("body-parser");

//import crypto for password
const bcrypt = require("bcryptjs");
const saltRounds = 8;

//import knex for querry builder
const Knex = require("knex");
const knexConf = require("./knexfile");

const app = express();

let tempHash= "";

//middleware
app.use(bodyParser.json());

//initialize knex
const knex = Knex(knexConf.development);


app.get("/", (req, res) => {
  res.send("Hello");
});

//sign in route
app.post("/signin", (req, res) => {

  res.json(bcrypt.compareSync(req.body.password, tempHash));
});

//register route
app.post("/register", (req, res) => {
  //encrypt the password
  let hash = bcrypt.hashSync(req.body.password, saltRounds);
  tempHash = hash;
  res.json(hash);
});

/*
    /signin --> POST = Succses/fail
    /register --> POST = User
*/

app.listen("3000", () => {
  console.log("Your Server Started in port 3000");
});
