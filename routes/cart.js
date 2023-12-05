const express = require("express");
const {
  addToCart,
  getCartItems,
  removeFromCart,
  decreaseQuantity,
} = require("../controllers/cart");

const router = express.Router();

router.route("/").post(addToCart).get(getCartItems);
router.route("/remove").post(decreaseQuantity).delete(removeFromCart);

module.exports = router;
