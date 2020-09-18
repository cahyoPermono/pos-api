const express = require("express");
const router = express.Router();

//import crypto for password
const bcrypt = require("bcryptjs");
const saltRounds = 8;

//import and initialize knex for querry builder
const knex = require("../db/knex");

//===================Auth Route=======================
//sign in route
router.post("/signin", (req, res) => {
  const { username, password } = req.body;

  //get data user from username
  knex
    .select("*")
    .from("users")
    .where("username", "=", username)
    .then((data) => {
      //compare it with password from user
      let isAuth = bcrypt.compareSync(password, data[0].password);

      if (isAuth) {
        res.json({
          id: data[0].id,
          username: data[0].username,
        });
      } else {
        res.status(400).json("Bad Credential, Username or Password is wrong");
      }
    })
    .catch((e) => {
      res.json(e);
    });
});

//register route
router.post("/signup", (req, res) => {
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

module.exports = router;
