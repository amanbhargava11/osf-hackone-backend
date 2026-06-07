module.exports = ({ name, teamName, teamCode }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Team Registered – OSF HackOne 2K26</title>
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
          <td style="background-color:#f0fdf4;border-bottom:2px solid #22c55e;padding:20px 30px;text-align:center;">
            <p style="margin:0 0 4px 0;font-family:arial,helvetica,sans-serif;font-size:22px;font-weight:700;color:#15803d;">🎉 Team Successfully Registered!</p>
            <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;">You're officially part of OSF HackOne 2K26</p>
          </td>
        </tr>

        <!-- GREETING -->
        <tr>
          <td style="padding:28px 30px 0 30px;">
            <p style="margin:0 0 6px 0;font-family:arial,helvetica,sans-serif;font-size:19px;font-weight:700;color:#1a2e5a;">Hello ${name}! 👋</p>
            <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.8;">Congratulations! Your team has been <strong style="color:#15803d;">successfully registered</strong> for <strong style="color:#1a2e5a;">OSF HackOne 2K26</strong>. Get ready to build, innovate, and compete at the national level. 🚀</p>
            <p style="margin:14px 0 0 0;">&nbsp;<span style="display:inline-block;width:54px;height:3px;background-color:#e6a817;border-radius:2px;font-size:0;">&nbsp;</span></p>
          </td>
        </tr>

        <!-- TEAM DETAILS CARD -->
        <tr>
          <td style="padding:20px 30px 0 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1a2e5a;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:16px 20px 8px 20px;">
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:11px;font-weight:700;color:#a8c8ff;text-transform:uppercase;letter-spacing:2px;">🏷️ Your Team Details</p>
                </td>
              </tr>
              <tr>
                <td style="padding:0 20px 8px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="padding:10px 0;border-top:1px solid rgba(255,255,255,0.1);">
                        <p style="margin:0 0 2px 0;font-family:arial,helvetica,sans-serif;font-size:11px;color:#a8c8ff;text-transform:uppercase;letter-spacing:1px;">Team Name</p>
                        <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:18px;font-weight:700;color:#ffffff;">${teamName}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:10px 0;border-top:1px solid rgba(255,255,255,0.1);">
                        <p style="margin:0 0 2px 0;font-family:arial,helvetica,sans-serif;font-size:11px;color:#a8c8ff;text-transform:uppercase;letter-spacing:1px;">Team Code</p>
                        <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:26px;font-weight:800;color:#ffd166;letter-spacing:6px;">${teamCode}</p>
                        <p style="margin:4px 0 0 0;font-family:arial,helvetica,sans-serif;font-size:11px;color:#c8dcff;">Share this code with teammates to join your team</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- TEAM CODE ALERT -->
        <tr>
          <td style="padding:14px 30px 0 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff8e1;border-left:4px solid #e6a817;border-radius:0 8px 8px 0;">
              <tr>
                <td style="padding:12px 16px;">
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:13px;color:#78350f;line-height:1.7;">🔐 <strong>Keep your Team Code safe!</strong> It will be required for team management, adding members, and future communication. Do not share it publicly.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- NEXT STEPS -->
        <tr>
          <td style="padding:22px 30px 0 30px;">
            <p style="margin:0 0 14px 0;font-family:arial,helvetica,sans-serif;font-size:15px;font-weight:700;color:#1a2e5a;">✅ Next Steps</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="top" width="32" style="padding-bottom:12px;padding-right:12px;">
                  <div style="width:28px;height:28px;background-color:#1565C0;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#ffffff;font-family:arial,helvetica,sans-serif;">1</div>
                </td>
                <td valign="middle" style="padding-bottom:12px;">
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.6;">Invite your teammates using the <strong style="color:#1a2e5a;">Team Code</strong> above.</p>
                </td>
              </tr>
              <tr>
                <td valign="top" width="32" style="padding-bottom:12px;padding-right:12px;">
                  <div style="width:28px;height:28px;background-color:#e6a817;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#ffffff;font-family:arial,helvetica,sans-serif;">2</div>
                </td>
                <td valign="middle" style="padding-bottom:12px;">
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.6;">Complete your team before the registration deadline.</p>
                </td>
              </tr>
              <tr>
                <td valign="top" width="32" style="padding-bottom:12px;padding-right:12px;">
                  <div style="width:28px;height:28px;background-color:#22c55e;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#ffffff;font-family:arial,helvetica,sans-serif;">3</div>
                </td>
                <td valign="middle" style="padding-bottom:12px;">
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.6;">Join our WhatsApp group for all updates &amp; announcements.</p>
                </td>
              </tr>
              <tr>
                <td valign="top" width="32" style="padding-right:12px;">
                  <div style="width:28px;height:28px;background-color:#a855f7;border-radius:50%;text-align:center;line-height:28px;font-size:12px;font-weight:700;color:#ffffff;font-family:arial,helvetica,sans-serif;">4</div>
                </td>
                <td valign="middle">
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.6;">Submit your <strong style="color:#1a2e5a;">PPT (Max 6 Slides)</strong> before <strong style="color:#dc2626;">15 June 2026</strong>.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- PPT GUIDELINES -->
        <tr>
          <td style="padding:20px 30px 0 30px;">
            <p style="margin:0 0 12px 0;font-family:arial,helvetica,sans-serif;font-size:15px;font-weight:700;color:#1a2e5a;">📋 PPT Must Cover</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="48%" valign="top" style="padding-bottom:8px;padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border-radius:8px;border-left:3px solid #1565C0;">
                    <tr><td style="padding:10px 12px;font-family:arial,helvetica,sans-serif;font-size:13px;color:#1a2e5a;font-weight:700;">01. Problem Statement</td></tr>
                  </table>
                </td>
                <td width="48%" valign="top" style="padding-bottom:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border-radius:8px;border-left:3px solid #e6a817;">
                    <tr><td style="padding:10px 12px;font-family:arial,helvetica,sans-serif;font-size:13px;color:#1a2e5a;font-weight:700;">02. Proposed Solution</td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td width="48%" valign="top" style="padding-bottom:8px;padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border-radius:8px;border-left:3px solid #22c55e;">
                    <tr><td style="padding:10px 12px;font-family:arial,helvetica,sans-serif;font-size:13px;color:#1a2e5a;font-weight:700;">03. Tech Stack</td></tr>
                  </table>
                </td>
                <td width="48%" valign="top" style="padding-bottom:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border-radius:8px;border-left:3px solid #a855f7;">
                    <tr><td style="padding:10px 12px;font-family:arial,helvetica,sans-serif;font-size:13px;color:#1a2e5a;font-weight:700;">04. Expected Impact</td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td colspan="2" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border-radius:8px;border-left:3px solid #06b6d4;">
                    <tr><td style="padding:10px 12px;font-family:arial,helvetica,sans-serif;font-size:13px;color:#1a2e5a;font-weight:700;">05. Team Introduction</td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- WHATSAPP CTA -->
        <tr>
          <td style="padding:20px 30px 0 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8f5e9;border:1.5px solid #22c55e;border-radius:12px;">
              <tr>
                <td style="padding:16px 20px;">
                  <p style="margin:0 0 6px 0;font-family:arial,helvetica,sans-serif;font-size:14px;font-weight:700;color:#15803d;">💬 Join Our Official WhatsApp Group</p>
                  <p style="margin:0 0 12px 0;font-family:arial,helvetica,sans-serif;font-size:13px;color:#4a5568;line-height:1.6;">All schedules, mentor sessions &amp; hackathon updates are shared exclusively here.</p>
                  <a href="https://chat.whatsapp.com/LUe6QfLXEZFDzR8PB9OW1v" style="display:inline-block;background-color:#22c55e;color:#ffffff;font-family:arial,helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:10px 22px;border-radius:8px;">👉 Join WhatsApp Group</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SIGNATURE -->
        <tr>
          <td style="padding:22px 30px 26px 30px;">
            <p style="margin:0 0 12px 0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.8;">We're rooting for your team. Go build something the world needs. <strong style="color:#1565C0;">Best of luck! 💡</strong></p>
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
            <p style="margin:0 0 4px 0;font-family:arial,helvetica,sans-serif;font-size:12px;color:#718096;">Support: support@osfhackathon.in</p>
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
