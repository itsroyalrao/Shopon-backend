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
});

module.exports = mongoose.model("CART", cartSchema);
