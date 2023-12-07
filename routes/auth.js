const express = require("express");

const {
  addUser,
  getUser,
  addToCart,
  getCartItems,
} = require("../controllers/auth");

const router = express.Router();

router.route("/signup").post(addUser);
router.route("/login").post(getUser);
router.route("/cart").post(addToCart).get(getCartItems);

module.exports = router;
