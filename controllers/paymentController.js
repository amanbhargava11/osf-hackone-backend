const axios = require("axios");
const User = require("../models/User");

/* =========================
   CREATE ORDER
========================= */

const createOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const response = await axios.post(
      "https://api.cashfree.com/pg/orders",
      {
        order_amount: 250,
        order_currency: "INR",
        customer_details: {
          customer_id: userId.toString(),
          customer_name: user.name || "Participant",
          customer_email: user.email,
          customer_phone: user.phone || "9999999999",
        },
        order_meta: {
          return_url: "https://osfhackathon.in/payment-success?order_id={order_id}",
        },
        order_note: "OSF HackOne Registration Fee",
      },
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET,
          "x-api-version": "2023-08-01",
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
    });

  } catch (err) {
    console.log(err?.response?.data || err);
    res.status(500).json({ success: false });
  }
};

/* =========================
   VERIFY PAYMENT
========================= */

const verifyPayment = async (req, res) => {
  try {
    const { order_id, userId } = req.body;

    const response = await axios.get(
      `https://api.cashfree.com/pg/orders/${order_id}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET,
          "x-api-version": "2023-08-01",
        },
      }
    );

    const orderStatus = response.data.order_status;

    if (orderStatus !== "PAID") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    // { new: true } — updated user return karega
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isPaid: true,
        paymentId: response.data.cf_order_id,
        paymentOrderId: order_id,
        paidAt: new Date(),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user: updatedUser,  // frontend localStorage update karega
    });

  } catch (err) {
    console.log(err?.response?.data || err);
    res.status(500).json({ success: false });
  }
};

/* =========================
   MANUAL APPROVE (Admin)
========================= */

const manualApprove = async (req, res) => {
  try {
    const { userEmail, transactionId } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      {
        isPaid: true,
        paymentId: transactionId || "MANUAL-" + Date.now(),
        paidAt: new Date(),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: updatedUser,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

module.exports = { createOrder, verifyPayment, manualApprove };