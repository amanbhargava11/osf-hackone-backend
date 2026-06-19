const mongoose =
  require("mongoose");

const notificationSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

const userSchema =
  new mongoose.Schema({

    /* =========================
       BASIC DETAILS
    ========================= */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    college: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      required: true,
    },

    /* =========================
       HACKATHON DETAILS
    ========================= */

    theme: {
      type: String,
      required: true,
    },

    problemStatement: {
      type: String,
      required: true,
    },

    yearOfStudy: {
      type: String,
      required: true,
    },

    githubUrl: {
      type: String,
      required: true,
      trim: true,
    },

    linkedinUrl: {
      type: String,
      default: "",
      trim: true,
    },

    /* =========================
       TEAM DETAILS
    ========================= */

    teamId: {
      type: String,
      default: null,
    },

    teamRole: {
      type: String,

      enum: [
        "leader",
        "member",
        null,
      ],

      default: null,
    },

    /* =========================
       TEAM STATUS
    ========================= */

    teamStatus: {

      type: String,

      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],

      default: "Pending",

    },

    /* =========================
       PAYMENT DETAILS
    ========================= */

    isPaid: {
      type: Boolean,
      default: false,
    },

    /* =========================
   REFERRAL SYSTEM
========================= */

    referralCode: {
      type: String,
      unique: true,
      sparse: true,
      default: undefined,
    },

    referredBy: {
      type: String,
      default: null,
    },

    successfulReferrals: {
      type: Number,
      default: 0,
    },

    pendingReferrals: {
      type: Number,
      default: 0,
    },

    rewardUnlocked: {
      type: Boolean,
      default: false,
    },

    goodiesUnlocked: {
      type: Boolean,
      default: false,
    },

    paymentId: {
      type: String,
      default: null,
    },

    paymentOrderId: {
      type: String,
      default: null,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    referralRewardProcessed: {
      type: Boolean,
      default: false,
    },

    upiId: {
      type: String,
      default: "",
    },

    upiName: {
      type: String,
      default: "",
    },

    creatorCode: {
      type: String,
      default: null,
    },

    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
      default: null,
    },



    /* =========================
       USER NOTIFICATIONS
    ========================= */

    notifications: [
      notificationSchema
    ],

    /* =========================
       ACCOUNT STATUS
    ========================= */

    isVerified: {
      type: Boolean,
      default: true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    /* =========================
       PROFILE IMAGE
    ========================= */

    avatar: {
      type: String,
      default: "",
    },

    /* =========================
       LAST LOGIN
    ========================= */

    lastLoginAt: {
      type: Date,
      default: null,
    },

    /* =========================
       REGISTERED DATE
    ========================= */

    registeredAt: {
      type: Date,
      default: Date.now,
    },

  },
    {
      timestamps: true,
    });

module.exports =
  mongoose.model(
    "User",
    userSchema
  );