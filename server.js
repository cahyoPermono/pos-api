const express = require("express");

const app = express();

const knex = require("knex");

const postgres = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "widodo",
    password: "widodo",
    database: "pos-widodo",
  },
});

console.log(postgres.select('*').from('users'));

app.get("/", (req, res) => {
  res.send("Hello");
});

/*
    /signin --> POST = Succses/fail
    /register --> POST = User
*/

app.listen("3000", () => {
  console.log("Your Server Started in port 3000");
});
