require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");

const app = express();

app.use(
  cors({
    origin: ["https://shoponn.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", homeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongodb"))
  .catch((e) => console.log(e));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
