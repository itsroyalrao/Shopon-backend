const express = require("express");
const {
  addItem,
  getItems,
  deleteItem,
  getItem,
  updateItem,
} = require("../controllers/home");
const { isAuthorized } = require("../controllers/auth");

const router = express.Router();

router.route("/cookies").post(isAuthorized);
router.route("/add-product").post(addItem);
router.route("/products").get(getItems);
router.route("/products/:id").get(getItem);
router.route("/admin-products").put(updateItem).delete(deleteItem);

module.exports = router;
