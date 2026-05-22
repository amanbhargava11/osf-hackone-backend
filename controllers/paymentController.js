
const Razorpay = require("razorpay");

const crypto = require("crypto");

const User = require("../models/User");

const razorpay = new Razorpay({
  key_id:
    process.env.RAZORPAY_KEY_ID,

  key_secret:
    process.env.RAZORPAY_KEY_SECRET,
});

/* =========================
   CREATE ORDER
========================= */

const createOrder =
  async (req, res) => {

    try {

      const { userId } =
        req.body;

      const user =
        await User.findById(
          userId
        );

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      const options = {
        amount: 25000,
        currency: "INR",

        receipt:
          "receipt_" +
          Date.now(),
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.status(200).json({
        success: true,
        order,
        key:
          process.env
            .RAZORPAY_KEY_ID,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  };

/* =========================
   VERIFY PAYMENT
========================= */

const verifyPayment =
  async (req, res) => {

    try {

      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId,
      } = req.body;

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(
            razorpay_order_id +
            "|" +
            razorpay_payment_id
          )
          .digest("hex");

      if (
        generatedSignature !==
        razorpay_signature
      ) {

        return res.status(400).json({
          success: false,
          message:
            "Payment verification failed",
        });
      }

      await User.findByIdAndUpdate(
        userId,
        {
          isPaid: true,

          paymentId:
            razorpay_payment_id,

          paymentOrderId:
            razorpay_order_id,

          paidAt:
            new Date(),
        }
      );

      res.status(200).json({
        success: true,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  };

module.exports = {
  createOrder,
  verifyPayment,
};

