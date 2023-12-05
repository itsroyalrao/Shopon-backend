// const Items = require("../models/home");
const Cart = require("../models/cart");

const addToCart = async (req, res) => {
  try {
    const item = await Cart.findOne({ itemID: req.body.id });
    if (item) {
      await Cart.findOneAndUpdate(
        { itemID: req.body.id },
        { count: item.count + 1 }
      );
    } else {
      await Cart.create({ itemID: req.body.id });
    }
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const item = await Cart.findOne({ itemID: req.body.id });
    if (item.count > 1) {
      await Cart.findOneAndUpdate(
        { itemID: req.body.id },
        { count: item.count - 1 }
      );
    } else {
      await Cart.deleteOne({ itemID: req.body.id });
    }
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const item = await Cart.findOne({ itemID: req.query.id });
    if (item) {
      await Cart.deleteOne({ itemID: req.query.id });
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (e) {
    console.log(e);
  }
};

const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find({}).populate("itemID");
    return res.json({ success: true, items });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  getCartItems,
};
