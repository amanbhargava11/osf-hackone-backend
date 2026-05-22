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

    tls: {
      rejectUnauthorized:
        false,
    },

  });

/* =========================
   SEND OTP MAIL
========================= */

async function sendOtpMail(
  email,
  otp,
  purpose = "verification"
) {

  try {

    let title =
      "Verify your email address";

    let subtitle =
      "Confirm your email to continue";

    let description =
      "Use the verification code below to securely access your OSF HackOne dashboard.";

    /* =========================
       ADMIN LOGIN
    ========================= */

    if (
      purpose === "admin-login"
    ) {

      title =
        "OSF Admin Security Verification";

      subtitle =
        "Verify administrator identity";

      description =
        "Use the secure OTP below to access the protected OSF HackOne organizer console.";

    }

    /* =========================
       PASSWORD RESET
    ========================= */

    if (
      purpose === "password-reset"
    ) {

      title =
        "Reset your password";

      subtitle =
        "Password recovery verification";

      description =
        "Use the OTP below to continue your password reset process securely.";

    }

    /* =========================
       SEND MAIL
    ========================= */

    const info =
      await transporter.sendMail({

        from:
          `"OSF HackOne" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: title,

        html: `
        <div style="
          margin:0;
          padding:0;
          background:#eef2f7;
          font-family:Inter,Arial,sans-serif;
        ">

          <div style="
            max-width:680px;
            margin:auto;
            background:#ffffff;
          ">

            <!-- HEADER -->
            <div style="
              padding:60px 55px 30px;
            ">

              <div style="
                font-size:13px;
                font-weight:700;
                letter-spacing:3px;
                text-transform:uppercase;
                color:#2563eb;
                margin-bottom:22px;
              ">
                OSF HackOne 2K26
              </div>

              <h1 style="
                margin:0;
                font-size:42px;
                line-height:1.15;
                font-weight:800;
                color:#111827;
                max-width:420px;
              ">
                ${subtitle}
              </h1>

            </div>

            <!-- HERO LINE -->
            <div style="
              height:1px;
              background:#e5e7eb;
              margin:0 55px;
            "></div>

            <!-- BODY -->
            <div style="
              padding:40px 55px 60px;
            ">

              <p style="
                margin-top:0;
                margin-bottom:35px;
                color:#4b5563;
                font-size:16px;
                line-height:1.9;
                max-width:520px;
              ">
                ${description}
              </p>

              <!-- OTP -->
              <!-- OTP -->
<div style="
  margin:45px 0;
">

  <table 
    cellpadding="0" 
    cellspacing="0"
    style="
      border-collapse:collapse;
      width:auto;
      max-width:100%;
    "
  >
    <tr>

      <td style="
        background:#111827;
        color:white;
        font-size:18px;
        font-weight:700;
        padding:18px 24px;
        border-radius:14px 0 0 14px;
        white-space:nowrap;
      ">
        OTP
      </td>

      <td style="
        background:#f9fafb;
        border:1px solid #e5e7eb;
        border-left:none;
        padding:18px 22px;
        border-radius:0 14px 14px 0;
      ">
        <span style="
          display:block;
          font-size:32px;
          font-weight:800;
          letter-spacing:6px;
          color:#111827;
          white-space:nowrap;
        ">
          ${otp}
        </span>
      </td>

    </tr>
  </table>

</div>

              <!-- INFO -->
              <div style="
                margin-top:45px;
              ">

                <p style="
                  margin:0;
                  color:#6b7280;
                  font-size:15px;
                  line-height:2;
                ">
                  This code will expire in
                  <strong style="color:#111827">
                    5 minutes
                  </strong>.
                  <br />
                  If you didn’t request this verification, you can safely ignore this email.
                </p>

              </div>

            </div>

            <!-- FOOTER -->
            <div style="
              padding:28px 55px 45px;
              border-top:1px solid #e5e7eb;
            ">

              <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                flex-wrap:wrap;
                gap:15px;
              ">

                <div style="
                  color:#111827;
                  font-size:14px;
                  font-weight:700;
                ">
                  OSF HackOne
                </div>

                <div style="
                  color:#9ca3af;
                  font-size:13px;
                ">
                  National Level Hackathon • 2026
                </div>

              </div>

            </div>

          </div>

        </div>
        `,
      });

    console.log(
      "✅ MAIL SENT SUCCESSFULLY"
    );

    console.log(
      `✅ OTP Mail sent to ${email}`
    );

    return true;

  } catch (err) {

    console.log(
      "❌ MAIL ERROR"
    );

    console.log(err);

    return false;

  }

}

module.exports =
  sendOtpMail;