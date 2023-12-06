const express = require("express");

const { addUser, getUser, addToCart } = require("../controllers/auth");

const router = express.Router();

router.route("/signup").post(addUser);
router.route("/login").post(getUser);
router.route("/cart").post(addToCart);

module.exports = router;
