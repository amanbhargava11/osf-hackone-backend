require("dotenv").config();

const mongoose = require("mongoose");
const fs = require("fs");

const MONGO_URI = process.env.MONGO_URI;

const User = require("./models/User");

async function exportUsers() {
  try {
    console.log("🔄 Connecting to MongoDB...");

    console.log(process.env.MONGO_URI);

    await mongoose.connect(MONGO_URI);

    console.log("✅ Connected!");

    const users = await User.find(
      {},
      "name email phone college gender"
    ).lean();

    console.log(`📊 Found ${users.length} users`);

    let csv = "Name,Email,Phone,College,Gender\n";

    users.forEach((u) => {
      csv += `"${u.name || ""}","${u.email || ""}","${u.phone || ""}","${u.college || ""}","${u.gender || ""}"\n`;
    });

    fs.writeFileSync("users.csv", csv);

    console.log("✅ users.csv created successfully!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

exportUsers();