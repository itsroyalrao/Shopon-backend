const Razorpay = require("razorpay");
const Payment = require("../models/payment");

const getPaymentID = async (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const amount = 2500;
    let order = await instance.orders.create({
      amount: amount,
      currency: "INR",
    });
    res.status(201).json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
      amount,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const paymentDetails = async (req, res) => {
  try {
    const { email, paymentId, orderId, orders } = req.body;
    await Payment.create({ userID: email, paymentId, orderId, orders });
    return res.json({ success: true });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getPaymentID, paymentDetails };
