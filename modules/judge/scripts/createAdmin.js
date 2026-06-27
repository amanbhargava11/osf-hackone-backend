require("dotenv").config();

const mongoose = require("mongoose");
const JudgeUser = require("../models/JudgeUser");

async function createAdmin() {
  try {
    // Connect MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    // Check existing admin
    const exists = await JudgeUser.findOne({
      email: "amanbhargavsvp2019@gmail.com",
    });

    if (exists) {
      console.log("⚠️ Admin already exists.");
      process.exit(0);
    }

    // Create Admin
    const admin = new JudgeUser({
      name: "OSF Super Admin",
      email: "amanbhargavsvp2019@gmail.com",
      password: "admin123",
      role: "Admin",
      isActive: true,
    });

    await admin.save();

    console.log("=================================");
    console.log("✅ Admin Created Successfully");
    console.log("=================================");
    console.log("Email    : amanbhargavsvp2019@gmail.com");
    console.log("Password : admin123");
    console.log("Role     : Admin");
    console.log("=================================");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();