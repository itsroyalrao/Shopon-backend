require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongodb"))
  .catch((e) => console.log(e));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
