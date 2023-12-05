const express = require("express");

const { addUser, getUser, logoutUser } = require("../controllers/auth");

const router = express.Router();

router.route("/signup").post(addUser);
router.route("/login").post(getUser);
router.route("/logout").get(logoutUser);
router.route("/allExpenses").get(logoutUser);

module.exports = router;
