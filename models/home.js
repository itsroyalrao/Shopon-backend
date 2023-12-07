const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("ITEM", itemSchema);
