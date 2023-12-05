const Items = require("../models/home");

const addItem = async (req, res) => {
  try {
    const { title, imageURL, price, description } = req.body;
    await Items.create({ title, imageURL, price, description });
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Items.findOne({ _id: req.params.id });
    return res.json({ success: true, item });
  } catch (e) {
    console.log(e);
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Items.find({});
    return res.json({ success: true, items });
  } catch (e) {
    console.log(e);
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, title, imageURL, price, description } = req.body;
    await Items.findOneAndUpdate(
      { _id: id },
      { title, imageURL, price, description }
    );
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const deleteItem = async (req, res) => {
  try {
    await Items.deleteOne({ _id: req.query.id });
    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  addItem,
  getItem,
  getItems,
  deleteItem,
  updateItem,
};
