const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    default: null,
  },
  orders: {
    type: Array,
    default: null,
  },
  loggedIn: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("USER", userSchema);
