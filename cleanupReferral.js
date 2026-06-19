require("dotenv").config();
const mongoose = require("mongoose");

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result =
      await mongoose.connection.db
        .collection("users")
        .updateMany(
          { referralCode: null },
          { $unset: { referralCode: "" } }
        );

    console.log("Done:", result);

    process.exit(0);

  } catch (err) {

    console.error(err);
    process.exit(1);

  }
}

run();