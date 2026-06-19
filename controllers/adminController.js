const User = require("../models/User");

const sendOtpMail =
require("../utils/sendMail");

const sendEventMail =
require("../utils/sendEventMail");

const adminOtps =
require("../utils/adminOtpStore");

const Creator =
  require("../models/Creator");

const bcrypt =
  require("bcryptjs");


exports.createCreator =
async (req,res)=>{

 try{

   const {
     name,
     email,
     password,
     creatorCode
   } = req.body;

   const existing =
     await Creator.findOne({
       email
     });

   if(existing){

     return res.status(400).json({
       success:false,
       message:
         "Creator already exists"
     });

   }

   const hashedPassword =
     await bcrypt.hash(
       password,
       10
     );

   const creator =
     await Creator.create({

       name,
       email,

       password:
         hashedPassword,

       creatorCode

     });

   res.json({
     success:true,
     creator
   });

 }catch(err){

   res.status(500).json({
     success:false,
     message:err.message
   });

 }

};


exports.getAllCreators =
async (req,res)=>{

 try{

   const creators =
     await Creator.find()
       .select("-password")
       .sort({
         createdAt:-1
       });

   res.json({
     success:true,
     creators
   });

 }catch(err){

   res.status(500).json({
     success:false,
     message:err.message
   });

 }

};


exports.deleteCreator =
async (req,res)=>{

 try{

   await Creator.findByIdAndDelete(
     req.params.id
   );

   res.json({
     success:true,
     message:
       "Creator deleted"
   });

 }catch(err){

   res.status(500).json({
     success:false,
     message:err.message
   });

 }

};


exports.getCreatorStats =
async (req,res)=>{

 try{

   const total =
     await Creator.countDocuments();

   const successful =
     await Creator.aggregate([
       {
         $group:{
           _id:null,
           total:{
             $sum:
             "$successfulReferrals"
           }
         }
       }
     ]);

   res.json({

     success:true,

     stats:{
       totalCreators:
         total,

       totalSuccessful:
         successful[0]?.total || 0
     }

   });

 }catch(err){

   res.status(500).json({
     success:false,
     message:err.message
   });

 }

};

/* =========================
SEND ADMIN OTP
========================= */

exports.sendAdminOTP =
async (req, res) => {


try {

  const { email } =
    req.body;

  const otp =
    Math.floor(
      100000 +
      Math.random() * 900000
    ).toString();

  adminOtps[email] = {
    otp,
    expires:
      Date.now() +
      5 * 60 * 1000,
  };

  await sendOtpMail(
    email,
    otp,
    "admin-login"
  );

  res.json({
    success: true,
    message:
      "OTP sent successfully",
  });

} catch (error) {

  console.log(error);

  res.status(500).json({
    success: false,
    message:
      "Failed to send OTP",
  });

}


};

/* =========================
VERIFY ADMIN OTP
========================= */

exports.verifyAdminOTP =
async (req, res) => {


try {

  const {
    email,
    otp
  } = req.body;

  const stored =
    adminOtps[email];

  if (!stored) {

    return res.status(400).json({
      success: false,
      message:
        "OTP not found",
    });

  }

  if (
    Date.now() >
    stored.expires
  ) {

    delete adminOtps[email];

    return res.status(400).json({
      success: false,
      message:
        "OTP expired",
    });

  }

  if (
    stored.otp !== otp
  ) {

    return res.status(401).json({
      success: false,
      message:
        "Invalid OTP",
    });

  }

  delete adminOtps[email];

  res.json({
    success: true,
    message:
      "OTP verified",
  });

} catch (error) {

  console.log(error);

  res.status(500).json({
    success: false,
  });

}


};

/* =========================
SEND BULK MAIL
========================= */

exports.sendBulkMail = async (req, res) => {

  try {

    const {
      subject,
      message,
      target
    } = req.body;

    console.log("📧 BULK MAIL API HIT");
console.log("Subject:", subject);
console.log("Target:", target);

    if (!subject || !message) {

      return res.status(400).json({
        success: false,
        message: "Subject and message are required",
      });

    }

    let users = [];

    /* =========================
       ALL PARTICIPANTS
    ========================= */

    if (target === "all") {

      users = await User.find({})
        .select("name email");

    }

    

    /* =========================
       PAID PARTICIPANTS
    ========================= */

    else if (target === "paid") {

      users = await User.find({
        isPaid: true,
      }).select("name email");

    }

    /* =========================
       UNPAID PARTICIPANTS
    ========================= */

    else if (target === "unpaid") {

      users = await User.find({
        isPaid: false,
      }).select("name email");

    }

    /* =========================
       TEAM LEADERS
    ========================= */

    else if (target === "leaders") {

      users = await User.find({
        teamRole: "leader",
      }).select("name email");

    }

    /* =========================
       TEAM MEMBERS
    ========================= */

    else if (target === "members") {

      users = await User.find({
        teamRole: "member",
      }).select("name email");

    }

    else {

      return res.status(400).json({
        success: false,
        message: "Invalid target selected",
      });

    }

    if (!users.length) {

      return res.status(404).json({
        success: false,
        message: "No users found for selected target",
      });

    }

    let successCount = 0;
    let failedCount = 0;

    for (const user of users) {

      try {

        await sendEventMail({

          to: user.email,

          subject,

          html: `
            <div style="
              max-width:700px;
              margin:auto;
              background:#ffffff;
              font-family:Arial,sans-serif;
              padding:30px;
            ">

              <h1 style="
                color:#06b6d4;
                margin-bottom:20px;
              ">
                OSF HACKONE 2K26
              </h1>

              <p>
                Hello <strong>${user.name}</strong>,
              </p>

              <div style="
                font-size:15px;
                line-height:1.8;
                color:#333;
              ">
                ${message}
              </div>

              <br>

              <hr>

              <p style="
                color:#666;
                font-size:14px;
              ">
                Team OSF HackOne
                <br/>
                National Level Hackathon 2026
              </p>

            </div>
          `,

        });

        successCount++;

      } catch (mailError) {

        console.log(
          "❌ Mail failed:",
          user.email
        );

        failedCount++;

      }

    }

    return res.status(200).json({

      success: true,

      target,

      totalUsers: users.length,

      mailsSent: successCount,

      mailsFailed: failedCount,

      message:
        `Successfully sent ${successCount} emails`,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
