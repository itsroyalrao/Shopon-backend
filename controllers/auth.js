const bcrypt = require("bcrypt");
const Auth = require("../models/auth.js");

const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await Auth.findOne({ email });

    if (user)
      return res.json({ success: false, msg: "Email is already registered" });
    else {
      bcrypt.hash(password, 10, async (err, encrypted) => {
        await Auth.create({ username, email, password: encrypted });
      });
      return res.json({ success: true });
    }
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, async (err, same) => {
        if (same) {
          await Auth.findOneAndUpdate({ email }, { loggedIn: true });
          return res.json({ success: true });
        } else
          return res.json({ success: false, msg: "Password is incorrect" });
      });
    } else return res.json({ success: false, msg: "User doesn't exists" });
  } catch (e) {
    console.log(e);
  }
};

const addToCart = async (req, res) => {
  try {
    const { id, user } = req.body;
    const items = await Auth.findOne({ email: user });
    console.log(items);

    items.cart.items = { itemID: id, quantity: 1 };
    await Auth.findOneAndUpdate({ email: user }, { cart: items.cart.items });
    console.log(items);
    res.json({ success: true, items });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { addUser, getUser, addToCart };
