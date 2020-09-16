const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//import crypto for password
const bcrypt = require("bcryptjs");
const saltRounds = 8;

//import knex for querry builder
const Knex = require("knex");
const knexConf = require("./knexfile");

const app = express();

let tempHash = "";

//middleware
app.use(bodyParser.json());
app.use(cors());

//initialize knex
const knex = Knex(knexConf.development);

app.get("/", (req, res) => {
  res.send("Hello");
});

//sign in route
app.post("/signin", (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((data) => {
      console.log(data);
    });
  res.json(bcrypt.compareSync(req.body.password, tempHash));
});

//register route
app.post("/register", (req, res) => {
  //getting the needed data for store in db
  const { username, password } = req.body;

  //encrypt the password
  let hash = bcrypt.hashSync(password, saltRounds);
  tempHash = hash;

  //insert to user
  knex("users")
    .returning(["id", "username"])
    .insert({
      username: username,
      password: hash,
    })
    .then((data) => res.json(data))
    .catch((e) => res.status(400).json(e));
});

/*
    /signin --> POST = Succses/fail
    /register --> POST = User
*/

app.listen("3000", () => {
  console.log("Your Server Started in port 3000");
});
