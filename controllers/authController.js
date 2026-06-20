const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const sendOtpMail =
  require("../utils/sendMail");

const sendEventMail =
  require("../utils/sendEventMail");

const welcomeEmail =
  require("../templates/welcomeEmail");

const Referral =
  require("../models/Referral");

const Creator =
  require("../models/Creator");

/* =========================
   OTP STORE
========================= */

const otpStore = {};

/* =========================
   SEND OTP
========================= */

exports.sendOtp = async (
  req,
  res
) => {

  try {

    const { email } =
      req.body;

    if (!email) {

      return res.status(400).json({
        success: false,
        message:
          "Email is required",
      });
    }

    /* =========================
       CHECK EXISTING USER
    ========================= */

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message:
          "Email already registered",
      });
    }

    /* =========================
       GENERATE OTP
    ========================= */

    const otp = Math.floor(
      100000 +
      Math.random() * 900000
    ).toString();

    /* =========================
       SAVE OTP
    ========================= */

    otpStore[email] = {
      otp,

      expiresAt:
        Date.now() +
        5 * 60 * 1000,
    };

    /* =========================
       SEND MAIL
    ========================= */

    await sendOtpMail(
      email,
      otp,
      "verification"
    );

    console.log(
      "✅ OTP:",
      otp
    );

    res.status(200).json({
      success: true,
      message:
        "OTP sent successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message:
        err.message,
    });
  }
};

/* =========================
   REGISTER USER
========================= */

exports.registerUser = async (req, res) => {
  try {


    const {
      name,
      email,
      password,
      phone,
      college,
      gender,
      theme,
      problemStatement,
      yearOfStudy,
      githubUrl,
      linkedinUrl,
      otp,
      referredBy,
      creatorCode
    } = req.body;

    /* CHECK EXISTING USER */

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    /* CHECK OTP */

    const savedOtp = otpStore[email];

    if (!savedOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    /* CHECK OTP EXPIRY */

    if (Date.now() > savedOtp.expiresAt) {
      delete otpStore[email];

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    /* VERIFY OTP */

    if (
      String(savedOtp.otp).trim() !==
      String(otp).trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    /* HASH PASSWORD */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    if (referredBy) {

      const userReferrer =
        await User.findOne({
          referralCode: referredBy,
        });

      const creatorReferrer =
        await Creator.findOne({
          creatorCode: referredBy,
        });

      if (!userReferrer && !creatorReferrer) {
        return res.status(400).json({
          success: false,
          message: "Invalid Referral Code",
        });
      }

      if (creatorReferrer) {
        creator = creatorReferrer;
      }
    }

    let creator = null;

    if (creatorCode) {

      creator =
        await Creator.findOne({
          creatorCode
        });

      if (!creator) {

        return res.status(400).json({
          success: false,
          message: "Invalid Creator Code",
        });

      }

    }

    /* CREATE USER */



    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      college,
      gender,
      theme,
      problemStatement,
      yearOfStudy,
      githubUrl,
      linkedinUrl,
      referredBy: referredBy || null,

      creatorCode:
        creator?.creatorCode || null,

      creatorId:
        creator?._id || null,
    });


    /* DELETE OTP */

    delete otpStore[email];

    /* GENERATE JWT */

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    /* SEND RESPONSE IMMEDIATELY */

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user,
    });

    if (referredBy) {

      const referrer =
        await User.findOne({
          referralCode:
            referredBy,
        });

      if (referrer) {

        referrer.pendingReferrals += 1;

        await referrer.save();

        await Referral.create({

          referrerId:
            referrer._id,

          referredUserId:
            user._id,

          teamName:
            "Not Created Yet",

          leaderName:
            user.name,

          status:
            "Pending Payment",

        });

      }

    }

    /* SEND EMAIL IN BACKGROUND */

    sendEventMail({
      to: user.email,
      subject: "Welcome to OSF HACKONE 2K26 🚀",
      html: welcomeEmail({
        name: user.name,
        theme: user.theme,
      }),
    }).catch((err) => {
      console.log(
        "Welcome email error:",
        err
      );
    });

    if (creator) {

      creator.totalReferrals += 1;

      creator.pendingReferrals += 1;

      await creator.save();

    }


  } catch (err) {


    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });


  }
};





/* =========================
   LOGIN USER
========================= */

exports.loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      /* =========================
         FIND USER
      ========================= */

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid credentials",
        });
      }

      /* =========================
         CHECK PASSWORD
      ========================= */

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid credentials",
        });
      }

      /* =========================
         GENERATE TOKEN
      ========================= */

      const token =
        jwt.sign(
          {
            id:
              user._id,
          },

          process.env
            .JWT_SECRET,

          {
            expiresIn:
              "7d",
          }
        );

      /* =========================
         RESPONSE
      ========================= */

      res.status(200).json({
        success: true,

        message:
          "Login successful",

        token,

        user,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  };

/* =========================
 GET ALL USERS
========================= */

exports.getAllUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .select("-password");

      res.status(200).json({
        success: true,
        users,
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  };

/* =========================
   GET CURRENT USER
========================= */

exports.getMe =
  async (req, res) => {

    try {

      // CHECK AUTH USER

      if (!req.user) {

        return res.status(401).json({
          success: false,
          message:
            "Unauthorized access",
        });
      }

      // FIND USER

      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      // RESPONSE

      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          college: user.college,
          githubUrl: user.githubUrl,
          linkedinUrl: user.linkedinUrl,
        }
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
        message:
          err.message,
      });
    }
  };