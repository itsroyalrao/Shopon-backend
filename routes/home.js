const express = require("express");
const {
  addItem,
  getItems,
  deleteItem,
  getItem,
  updateItem,
} = require("../controllers/home");
const { isAuthorized } = require("../controllers/auth");
const { getPaymentID, paymentDetails } = require("../controllers/payment");

const router = express.Router();

//auth
router.route("/cookies").post(isAuthorized);
//home
router.route("/add-product").post(addItem);
router.route("/products").get(getItems);
router.route("/products/:id").get(getItem);
router.route("/admin-products").put(updateItem).delete(deleteItem);
//payment
router.route("/payment").get(getPaymentID).post(paymentDetails);

module.exports = router;
