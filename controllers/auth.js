const bcrypt = require("bcrypt");
const Auth = require("../models/auth.js");
const jwt = require("jsonwebtoken");

const setCookies = async (req, res) => {
  const { email } = req.query;

  const accessToken = jwt.sign({ email }, "jwt-access-token-secret-key", {
    expiresIn: "24h",
  });
  const refreshToken = jwt.sign({ email }, "jwt-refresh-token-secret-key", {
    expiresIn: "24h",
  });
  res.json({ success: true, tokens: { accessToken, refreshToken } });
};

const isAuthorized = async (req, res) => {
  const { accessToken } = req.body;

  jwt.verify(accessToken, "jwt-access-token-secret-key", (err, decoded) => {
    if (err) {
      return res.json({ success: false });
    } else {
      req.email = decoded.email;
      return res.json({ success: true, email: decoded.email });
    }
  });
};

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
    const { user, id, title, imageURL, price, description } = req.body;
    const items = await Auth.findOne({ email: user });

    if (items.cart.length) {
      let bool = true;
      items.cart.forEach((item) => {
        if (item.id === id) {
          bool = false;
          item.quantity++;
        }
      });
      if (bool) {
        items.cart.push({
          id,
          title,
          imageURL,
          price,
          description,
          quantity: 1,
        });
      }
      await Auth.findOneAndUpdate({ email: user }, { cart: items.cart });
    } else {
      items.cart.push({ id, title, imageURL, price, description, quantity: 1 });
      await Auth.findOneAndUpdate({ email: user }, { cart: items.cart });
    }

    res.json({ success: true, items });
  } catch (e) {
    console.log(e);
  }
};

const getCartItems = async (req, res) => {
  try {
    const { user } = req.query;
    const items = await Auth.findOne({ email: user });

    res.json({ success: true, items: items.cart });
  } catch (e) {
    console.log(e);
  }
};

const increaseQuantity = async (req, res) => {
  try {
    const { user, id } = req.body;
    const items = await Auth.findOne({ email: user });

    items.cart.forEach(async (item) => {
      if (item.id === id) {
        item.quantity++;
        await Auth.findOneAndUpdate({ email: user }, { cart: items.cart });
      }
    });

    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const { user, id } = req.body;
    const items = await Auth.findOne({ email: user });

    items.cart.forEach(async (item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          item.quantity--;
          await Auth.findOneAndUpdate({ email: user }, { cart: items.cart });
        } else {
          await Auth.findOneAndUpdate({ email: user }, { cart: [] });
        }
      }
    });

    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const user = await Auth.findOne({ email: req.query.user });

    const cartItems = [];
    user.cart.forEach((item) => {
      if (item.id !== req.query.id) {
        cartItems.push(item);
      }
    });
    await Auth.findOneAndUpdate({ email: req.query.user }, { cart: cartItems });
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const addOrders = async (req, res) => {
  try {
    const { user, items } = req.body;
    await Auth.findOneAndUpdate({ email: user }, { orders: items });
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const getOrderedItems = async (req, res) => {
  try {
    const { user } = req.query;
    const items = await Auth.findOne({ email: user });

    res.json({ success: true, orders: items.orders });
  } catch (e) {
    console.log(e);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { user, id } = req.query;
    const orders = await Auth.findOne({ email: user });

    const orderedItems = [];
    orders.orders.forEach((order) => {
      if (order.id !== id) {
        orderedItems.push(order);
      }
    });
    await Auth.findOneAndUpdate(
      { email: req.query.user },
      { orders: orderedItems }
    );

    res.json({ success: true, orders: orders.orders });
  } catch (e) {
    console.log(e);
  }
};

const emptyCart = async (req, res) => {
  try {
    await Auth.findOneAndUpdate({ email: req.query.user }, { cart: [] });
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await Auth.findOne({ email: req.query.email });
    if (user)
      return res.json({ success: true, user: { username: user.username } });
    else return res.json({ success: false });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  setCookies,
  isAuthorized,
  addUser,
  getUser,
  addToCart,
  getCartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  addOrders,
  getOrderedItems,
  cancelOrder,
  emptyCart,
  getUserDetails,
};
