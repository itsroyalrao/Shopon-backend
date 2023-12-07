const express = require("express");

const {
  addUser,
  getUser,
  addToCart,
  getCartItems,
  decreaseQuantity,
  removeFromCart,
  addOrders,
  getOrderedItems,
  cancelOrder,
  emptyCart,
} = require("../controllers/auth");

const router = express.Router();

router.route("/signup").post(addUser);
router.route("/login").post(getUser);
router.route("/cart").post(addToCart).get(getCartItems).delete(emptyCart);
router.route("/cart/decrease").post(decreaseQuantity);
router.route("/cart/remove").delete(removeFromCart);
router
  .route("/orders")
  .post(addOrders)
  .get(getOrderedItems)
  .delete(cancelOrder);

module.exports = router;
