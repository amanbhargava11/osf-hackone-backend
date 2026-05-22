require("dotenv").config();

const sendOtpMail = require("./utils/sendMail");

sendOtpMail(
  "aayushprajapati2926@gmail.com",
  "123456"
);