const axios = require("axios");
const User = require("../models/User");


const sendEventMail =
  require("../utils/sendEventMail");

const paymentSuccessEmail =
  require("../templates/paymentSuccessEmail");

const Team =
  require("../models/Team");

const Referral =
  require("../models/Referral");

const Creator =
  require("../models/Creator");

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

    const { order_id, userId } =
      req.body;

    const response =
      await axios.get(
        `https://api.cashfree.com/pg/orders/${order_id}`,
        {
          headers: {
            "x-client-id":
              process.env.CASHFREE_APP_ID,
            "x-client-secret":
              process.env.CASHFREE_SECRET,
            "x-api-version":
              "2023-08-01",
          },
        }
      );

    const orderStatus =
      response.data.order_status;

    if (
      orderStatus !== "PAID"
    ) {

      return res.status(400).json({
        success: false,
        message:
          "Payment not completed",
      });

    }

    const updatedUser =
      await User.findByIdAndUpdate(
        userId,
        {
          isPaid: true,
          paymentId:
            response.data.cf_order_id,
          paymentOrderId:
            order_id,
          paidAt:
            new Date(),
        },
        {
          new: true,
        }
      );

    if (updatedUser.creatorId) {

      const creator =
        await Creator.findById(
          updatedUser.creatorId
        );

      if (creator) {

        creator.pendingReferrals -= 1;

        creator.successfulReferrals += 1;

        await creator.save();

      }

    }

    if (!updatedUser) {

      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });

    }

    /* =========================
       GENERATE REFERRAL CODE
    ========================= */

    if (
      updatedUser.teamRole ===
      "leader" &&
      !updatedUser.referralCode
    ) {

      const team =
        await Team.findOne({
          code:
            updatedUser.teamId,
        });

      if (team) {

        const random =
          Math.floor(
            1000 +
            Math.random() * 9000
          );

        const teamName =
          team.name
            .replace(
              /\s/g,
              ""
            )
            .toUpperCase();

        updatedUser.referralCode =
          `${teamName}${random}`;

        await updatedUser.save();

      }

    }

    /* =========================
       REFERRAL SUCCESS
    ========================= */

    if (
      updatedUser.referredBy &&
      !updatedUser.referralRewardProcessed
    ) {

      const referrer =
        await User.findOne({
          referralCode:
            updatedUser.referredBy,
        });

      if (referrer) {

        referrer.pendingReferrals =
          Math.max(
            0,
            referrer.pendingReferrals - 1
          );

        referrer.successfulReferrals += 1;

        if (
          referrer.successfulReferrals >= 5
        ) {
          referrer.rewardUnlocked =
            true;
        }

        if (
          referrer.successfulReferrals >= 9
        ) {
          referrer.goodiesUnlocked =
            true;
        }

        await referrer.save();

        await Referral.findOneAndUpdate(
          {
            referredUserId:
              updatedUser._id,
          },
          {
            status:
              "Successful",
          }
        );

      }

      updatedUser.referralRewardProcessed =
        true;

      await updatedUser.save();

      

    }

    /* =========================
       PAYMENT SUCCESS EMAIL
    ========================= */

    try {

      await sendEventMail({

        to:
          updatedUser.email,

        subject:
          "Payment Confirmed ✅ Welcome to OSF HACKONE 2K26",

        html:
          paymentSuccessEmail({

            name:
              updatedUser.name,

            paymentId:
              response.data.cf_order_id,

          }),

      });

      console.log(
        "✅ Payment confirmation email sent"
      );

    } catch (mailError) {

      console.log(
        "❌ Payment email failed"
      );

      console.log(
        mailError
      );

    }

    return res.status(200).json({

      success: true,

      user:
        updatedUser,

    });

  } catch (err) {

    console.log(
      err?.response?.data ||
      err
    );

    return res.status(500).json({

      success: false,

      message:
        "Payment verification failed",

    });

  }

};

/* =========================
MANUAL APPROVE (Admin)
========================= */

const manualApprove = async (req, res) => {

  try {


    const {
      userEmail,
      transactionId
    } = req.body;

    const updatedUser =
      await User.findOneAndUpdate(
        {
          email: userEmail,
        },
        {
          isPaid: true,
          paymentId:
            transactionId ||
            "MANUAL-" + Date.now(),

          paidAt: new Date(),
        },
        {
          new: true,
        }
      );

    if (!updatedUser) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    /* =========================
       SEND PAYMENT EMAIL
    ========================= */

    try {

      await sendEventMail({

        to:
          updatedUser.email,

        subject:
          "Payment Confirmed ✅ Welcome to OSF HACKONE 2K26",

        html:
          paymentSuccessEmail({

            name:
              updatedUser.name,

            paymentId:
              updatedUser.paymentId,

          }),

      });

      console.log(
        "✅ Manual payment email sent"
      );

    } catch (mailError) {

      console.log(
        "❌ Manual payment email failed"
      );

      console.log(mailError);

    }

    return res.status(200).json({

      success: true,

      user: updatedUser,

    });

  } catch (err) {


    console.log(err);

    return res.status(500).json({

      success: false,

      message:
        "Manual approval failed",

    });


  }

};

module.exports = {
  createOrder,
  verifyPayment,
  manualApprove,
};
