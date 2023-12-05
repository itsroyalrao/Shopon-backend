require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const homeRoutes = require("./routes/home");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);
app.use(express.json());

app.use("/", homeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongodb"))
  .catch((e) => console.log(e));

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
