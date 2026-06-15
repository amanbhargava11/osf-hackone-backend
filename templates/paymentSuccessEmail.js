
module.exports = ({ name, paymentId }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Payment Confirmed – OSF HackOne 2K26</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:arial,helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f8;">
  <tr>
    <td align="center" style="padding:24px 10px;">

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <tr>
          <td align="center" style="background-color:#1a2e5a;padding:36px 30px 28px 30px;">
            <p style="margin:0 0 14px 0;font-family:arial,helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;color:#ffd166;text-transform:uppercase;border:1.5px solid #e6a817;border-radius:6px;padding:5px 18px;display:inline-block;">National Level Hackathon</p>
            <p style="margin:10px 0 0 0;font-family:arial,helvetica,sans-serif;font-size:36px;font-weight:800;color:#ffffff;letter-spacing:2px;line-height:1.1;">OSF <span style="color:#ffd166;">HACKONE</span></p>
            <p style="margin:6px 0 0 0;font-family:arial,helvetica,sans-serif;font-size:20px;font-weight:700;color:#a8c8ff;letter-spacing:4px;">2K26</p>
            <p style="margin:12px 0 0 0;font-family:arial,helvetica,sans-serif;font-size:13px;color:#c8dcff;letter-spacing:1px;">Build &nbsp;&bull;&nbsp; Launch &nbsp;&bull;&nbsp; Scale</p>
          </td>
        </tr>

        <!-- SUCCESS BANNER -->
        <tr>
          <td style="background-color:#f0fdf4;border-bottom:2px solid #22c55e;padding:22px 30px;text-align:center;">
            <p style="margin:0 0 4px 0;font-family:arial,helvetica,sans-serif;font-size:32px;">✅</p>
            <p style="margin:0 0 4px 0;font-family:arial,helvetica,sans-serif;font-size:22px;font-weight:700;color:#15803d;">Payment Confirmed!</p>
            <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:13px;color:#4a5568;">Your spot at OSF HackOne 2K26 is secured</p>
          </td>
        </tr>

        <!-- GREETING -->
        <tr>
          <td style="padding:26px 30px 0 30px;">
            <p style="margin:0 0 8px 0;font-family:arial,helvetica,sans-serif;font-size:19px;font-weight:700;color:#1a2e5a;">Hello ${name}! 👋</p>
            <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.8;">Great news — your payment has been <strong style="color:#15803d;">successfully verified</strong>. You are now officially registered for <strong style="color:#1a2e5a;">OSF HackOne 2K26</strong>. Time to get your team together and start building! 🚀</p>
            <p style="margin:14px 0 0 0;">&nbsp;<span style="display:inline-block;width:54px;height:3px;background-color:#e6a817;border-radius:2px;font-size:0;">&nbsp;</span></p>
          </td>
        </tr>

        <!-- TRANSACTION CARD -->
        <tr>
          <td style="padding:20px 30px 0 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1a2e5a;border-radius:12px;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 14px 0;font-family:arial,helvetica,sans-serif;font-size:11px;font-weight:700;color:#a8c8ff;text-transform:uppercase;letter-spacing:2px;">🧾 Transaction Details</p>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.1);">
                        <p style="margin:0 0 2px 0;font-family:arial,helvetica,sans-serif;font-size:11px;color:#a8c8ff;text-transform:uppercase;letter-spacing:1px;">Transaction ID</p>
                        <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:18px;font-weight:800;color:#ffd166;letter-spacing:2px;">${paymentId}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.1);">
                        <p style="margin:0 0 2px 0;font-family:arial,helvetica,sans-serif;font-size:11px;color:#a8c8ff;text-transform:uppercase;letter-spacing:1px;">Status</p>
                        <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:15px;font-weight:700;color:#22c55e;">&#10003; Verified &amp; Confirmed</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.1);">
                        <p style="margin:0 0 2px 0;font-family:arial,helvetica,sans-serif;font-size:11px;color:#a8c8ff;text-transform:uppercase;letter-spacing:1px;">Event</p>
                        <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;">OSF HackOne 2K26</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- WHAT'S NEXT -->
        <tr>
          <td style="padding:22px 30px 0 30px;">
            <p style="margin:0 0 14px 0;font-family:arial,helvetica,sans-serif;font-size:15px;font-weight:700;color:#1a2e5a;">🎯 What You Can Do Now</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="top" width="32" style="padding-bottom:12px;padding-right:12px;">
                  <div style="width:28px;height:28px;background-color:#1565C0;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#ffffff;font-family:arial,helvetica,sans-serif;">1</div>
                </td>
                <td valign="middle" style="padding-bottom:12px;">
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.6;"><strong style="color:#1a2e5a;">Create a Team</strong> — Start a new team and get your unique Team Code.</p>
                </td>
              </tr>
              <tr>
                <td valign="top" width="32" style="padding-bottom:12px;padding-right:12px;">
                  <div style="width:28px;height:28px;background-color:#e6a817;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#ffffff;font-family:arial,helvetica,sans-serif;">2</div>
                </td>
                <td valign="middle" style="padding-bottom:12px;">
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.6;"><strong style="color:#1a2e5a;">Join a Team</strong> — Use a teammate's Team Code to join their team.</p>
                </td>
              </tr>
              <tr>
                <td valign="top" width="32" style="padding-right:12px;">
                  <div style="width:28px;height:28px;background-color:#22c55e;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#ffffff;font-family:arial,helvetica,sans-serif;">3</div>
                </td>
                <td valign="middle">
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.6;"><strong style="color:#1a2e5a;">Prepare Your PPT</strong> — Max 6 slides, submit before <strong style="color:#dc2626;">26 June 2026</strong>.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CTA BUTTON -->
        <tr>
          <td style="padding:22px 30px 0 30px;text-align:center;">
            <a href="https://osfhackathon.in/login" style="display:inline-block;background-color:#1565C0;color:#ffffff;font-family:arial,helvetica,sans-serif;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:10px;">Go to Dashboard →</a>
          </td>
        </tr>

        <!-- SIGNATURE -->
        <tr>
          <td style="padding:26px 30px 28px 30px;">
            <p style="margin:0 0 12px 0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.8;">If you have any questions, feel free to reach out at <a href="mailto:team@osfhackathon.in" style="color:#1565C0;text-decoration:none;font-weight:600;">team@osfhackathon.in</a>. We're here to help. 💪</p>
            <p style="margin:0 0 3px 0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;">Warm regards,</p>
            <p style="margin:0 0 2px 0;font-family:arial,helvetica,sans-serif;font-size:15px;font-weight:700;color:#1a2e5a;">Aman Bhargava</p>
            <p style="margin:0 0 1px 0;font-family:arial,helvetica,sans-serif;font-size:13px;color:#718096;">Founder, OSF HackOne 2K26</p>
            <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:13px;font-weight:600;color:#1565C0;">Our Startup Freelancer</p>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="background-color:#1a2e5a;padding:18px 30px;">
            <p style="margin:0 0 6px 0;font-family:arial,helvetica,sans-serif;font-size:13px;">
              <a href="https://osfhackathon.in" style="color:#ffd166;text-decoration:none;font-weight:600;">osfhackathon.in</a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="https://ourstartupfreelancer.com" style="color:#a8c8ff;text-decoration:none;">ourstartupfreelancer.com</a>
            </p>
            <p style="margin:0 0 4px 0;font-family:arial,helvetica,sans-serif;font-size:12px;color:#718096;">Support: team@osfhackathon.in</p>
            <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:11px;color:#4a6080;">&copy; 2026 Our Startup Freelancer. All rights reserved. | MSME Registered</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
`;
