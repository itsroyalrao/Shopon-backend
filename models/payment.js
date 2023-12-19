const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  orders: {
    type: Array,
    default: null,
  },
});

module.exports = mongoose.model("payment", paymentSchema);
