const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const User = require("../models/user");
const { membershipAmount } = require("../utils/constants");
// const {
//   validateWebhookSignature,
// } = require("razorpay/dist/utils/razorpay-utils");

paymentRouter.post("/payment/create", userAuth, async (req, res) => { 
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    // Save it in my database
    //   console.log(order);

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    // Return back my order details to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// paymentRouter.post("/payment/webhook", async (req, res) => {
//   const webhookSignature = req.get("X-Razorpay-Signature");
//   try {
//     const isWebhookValid = validateWebhookSignature(
//       JSON.stringify(req.body),
//       webhookSignature,
//       process.env.RAZORPAY_WEBHOOK_SECRET,
//     );

//     if (!isWebhookValid) {
//       return res.status(400).json({ msg: "Invalid Webhook Request" });
//     }
//     const paymentDetails = req.body.payload.payment.entity;
//     const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
//     payment.status = paymentDetails.status;
//     await payment.save();

//     const user= await User.findById(payment.userId);
//     console.log(paymentDetails.status);
//     console.log(user);
//     if(paymentDetails.status==="captured"){
//       user.isPremium=true;
//       user.membershipType=payment.notes.membershipType;
//       await user.save();
//     }
//     res.json({ msg: "Webhook Handled" });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

paymentRouter.post("/payment/success", userAuth, async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    // 1️⃣ Update payment status
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      {
        status: "paid",
        paymentId,
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ msg: "Payment not found" });
    }

    // 2️⃣ Make user premium
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { isPremium: true },
      { new: true }
    );

    // 3️⃣ Send response
    res.status(200).json({
      msg: "Payment successful. User upgraded to premium.",
      user,
      payment,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = paymentRouter;
