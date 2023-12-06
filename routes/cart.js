const express = require("express");
const {
  addToCart,
  getCartItems,
  removeFromCart,
  decreaseQuantity,
  emptyCart,
  addOrders,
  getOrderedItems,
  deleteOrders,
} = require("../controllers/cart");

const router = express.Router();

router.route("/").post(addToCart).get(getCartItems);
router.route("/remove").post(decreaseQuantity).delete(removeFromCart);
router
  .route("/order")
  .post(addOrders)
  .get(getOrderedItems)
  .delete(deleteOrders);
router.route("/empty").delete(emptyCart);

module.exports = router;
