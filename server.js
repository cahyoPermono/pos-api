const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to API");
});

//Getting Routes for api
app.use("/api", require("./src/api"));

// =================Transaction Route =====================
/*
  transaction tabel => id, productId, productName, harg
*/

app.listen("3000", () => {
  console.log("Your Server Started in port 3000");
});
