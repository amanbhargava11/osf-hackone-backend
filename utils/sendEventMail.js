const nodemailer =
  require("nodemailer");

/* =========================
   TRANSPORTER
========================= */

const transporter =
  nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 587,

    secure: false,

    auth: {

      user:
        process.env.EMAIL_USER,

      pass:
        process.env.EMAIL_PASS,

    },

  });

/* =========================
   SEND EVENT MAIL
========================= */

const sendEventMail =
  async ({
    to,
    subject,
    html,
  }) => {

    try {

      const info =
        await transporter.sendMail({

          from:
            `"OSF HACKONE 2K26" <${process.env.EMAIL_USER}>`,

          to,

          subject,

          html,

        });

      console.log(
        `✅ Mail sent to ${to}`
      );

      console.log(
        info.messageId
      );

      return true;

    } catch (error) {

      console.log(
        "❌ Email Error"
      );

      console.log(error);

      throw error;

    }

  };

module.exports =
  sendEventMail;
