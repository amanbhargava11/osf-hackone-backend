module.exports = ({ name, theme }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to OSF HackOne 2K26</title>
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

        <!-- GREETING -->
        <tr>
          <td style="padding:32px 30px 0 30px;">
            <p style="margin:0 0 6px 0;font-family:arial,helvetica,sans-serif;font-size:20px;font-weight:700;color:#1a2e5a;">Hello ${name}! 👋</p>
            <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:15px;color:#4a5568;line-height:1.8;">
              Welcome to <strong style="color:#1a2e5a;">OSF HackOne 2K26</strong>! Your registration has been <strong style="color:#22c55e;">successfully received</strong>. We're thrilled to have you on board as part of India's most exciting national-level hackathon. 🎉
            </p>
            <p style="margin:16px 0 0 0;">&nbsp;<span style="display:inline-block;width:60px;height:3px;background-color:#e6a817;border-radius:2px;font-size:0;">&nbsp;</span></p>
          </td>
        </tr>

        <!-- THEME CARD -->
        <tr>
          <td style="padding:22px 30px 0 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:linear-gradient(135deg,#1565C0,#1a2e5a);border-radius:12px;">
              <tr>
                <td style="padding:20px 22px;">
                  <p style="margin:0 0 6px 0;font-family:arial,helvetica,sans-serif;font-size:11px;font-weight:700;color:#a8c8ff;text-transform:uppercase;letter-spacing:2px;">🎯 Your Selected Theme</p>
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:22px;font-weight:800;color:#ffd166;">${theme}</p>
                  <p style="margin:8px 0 0 0;font-family:arial,helvetica,sans-serif;font-size:13px;color:#c8dcff;line-height:1.6;">Build your solution around this theme and make it impactful. Think bold, think innovative! 💡</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- INFO CARDS -->
        <tr>
          <td style="padding:20px 30px 0 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="48%" valign="top" style="background-color:#f0f7ff;border-left:3px solid #1565C0;border-radius:10px;padding:14px 16px;">
                  <p style="margin:0 0 3px 0;font-family:arial,helvetica,sans-serif;font-size:11px;font-weight:700;color:#1565C0;text-transform:uppercase;letter-spacing:1px;">📅 Submission Deadline</p>
                  <p style="margin:0 0 2px 0;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:700;color:#1a2e5a;">15 June 2026</p>
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:12px;color:#718096;">Don't miss the deadline!</p>
                </td>
                <td width="4%"></td>
                <td width="48%" valign="top" style="background-color:#fffbf0;border-left:3px solid #e6a817;border-radius:10px;padding:14px 16px;">
                  <p style="margin:0 0 3px 0;font-family:arial,helvetica,sans-serif;font-size:11px;font-weight:700;color:#c47d00;text-transform:uppercase;letter-spacing:1px;">📊 PPT Required</p>
                  <p style="margin:0 0 2px 0;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:700;color:#1a2e5a;">Max 6 Slides</p>
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:12px;color:#718096;">Crisp, clear, impactful</p>
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
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 6px 0;font-family:arial,helvetica,sans-serif;font-size:15px;font-weight:700;color:#15803d;">💬 Join Our Official WhatsApp Group</p>
                  <p style="margin:0 0 14px 0;font-family:arial,helvetica,sans-serif;font-size:13px;color:#4a5568;line-height:1.7;">Get all announcements, schedules, mentor sessions &amp; hackathon updates exclusively here. <strong>Join now!</strong></p>
                  <a href="https://chat.whatsapp.com/LUe6QfLXEZFDzR8PB9OW1v" style="display:inline-block;background-color:#22c55e;color:#ffffff;font-family:arial,helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:11px 26px;border-radius:8px;">👉 Join WhatsApp Group</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- PPT WARNING -->
        <tr>
          <td style="padding:16px 30px 0 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff8e1;border-left:4px solid #e6a817;border-radius:10px;">
              <tr>
                <td style="padding:14px 18px;">
                  <p style="margin:0 0 6px 0;font-family:arial,helvetica,sans-serif;font-size:14px;font-weight:700;color:#92400e;">⚠️ PPT Submission Reminder</p>
                  <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:13px;color:#78350f;line-height:1.7;">Submit your <strong>PPT (Max 6 Slides)</strong> before <strong>15 June 2026</strong>. Cover: Problem Statement, Solution, Tech Stack, Team &amp; Roadmap. <strong>Late submissions not accepted.</strong></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- PLATFORM PROMO -->
        <tr>
          <td style="padding:20px 30px 0 30px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1a2e5a;border-radius:12px;">
              <tr>
                <td style="padding:18px 22px;">
                  <p style="margin:0 0 6px 0;font-family:arial,helvetica,sans-serif;font-size:14px;font-weight:700;color:#ffd166;">🌐 Explore Our Startup Freelancer</p>
                  <p style="margin:0 0 12px 0;font-family:arial,helvetica,sans-serif;font-size:13px;color:#c8dcff;line-height:1.6;">India's AI-powered platform for students, freelancers &amp; startups. Find verified talent &amp; scale your vision.</p>
                  <a href="https://ourstartupfreelancer.com" style="display:inline-block;background-color:#e6a817;color:#1a2e5a;font-family:arial,helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:9px 22px;border-radius:8px;">Visit Platform →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SIGNATURE -->
        <tr>
          <td style="padding:24px 30px 28px 30px;">
            <p style="margin:0 0 14px 0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;line-height:1.8;">We're incredibly excited to see what you build. Innovation happens when passionate people come together — and you're one of them. <strong style="color:#1565C0;">Let's build something extraordinary! 💡</strong></p>
            <p style="margin:0 0 3px 0;font-family:arial,helvetica,sans-serif;font-size:14px;color:#4a5568;">Warm regards,</p>
            <p style="margin:0 0 2px 0;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:700;color:#1a2e5a;">Aman Bhargava</p>
            <p style="margin:0 0 1px 0;font-family:arial,helvetica,sans-serif;font-size:13px;color:#718096;">Founder, OSF HackOne 2K26</p>
            <p style="margin:0;font-family:arial,helvetica,sans-serif;font-size:13px;font-weight:600;color:#1565C0;">Our Startup Freelancer</p>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="background-color:#1a2e5a;padding:18px 30px;">
            <p style="margin:0 0 7px 0;font-family:arial,helvetica,sans-serif;font-size:13px;">
              <a href="https://osfhackathon.in" style="color:#ffd166;text-decoration:none;font-weight:600;">osfhackathon.in</a>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="https://ourstartupfreelancer.com" style="color:#a8c8ff;text-decoration:none;">ourstartupfreelancer.com</a>
            </p>
            <p style="margin:0 0 5px 0;font-family:arial,helvetica,sans-serif;font-size:12px;color:#718096;">You received this because you registered for OSF HackOne 2K26.</p>
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
