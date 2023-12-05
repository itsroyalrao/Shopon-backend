const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
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
  admin: {
    type: Boolean,
    default: false,
  },
  addedToCart: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("ITEM", itemSchema);
