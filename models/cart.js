const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  itemID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ITEM",
  },
  count: {
    type: Number,
    default: 1,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CART", cartSchema);
