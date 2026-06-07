module.exports = ({
  name,
  teamName,
  teamCode,
}) => `

<!DOCTYPE html>

<html>

<head>
  <meta charset="UTF-8" />
  <title>Team Successfully Registered</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#0f172a;
  font-family:Arial,sans-serif;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="
      background:#0f172a;
      padding:40px 0;
    "
  >
    <tr>
      <td align="center">


    <table
      width="650"
      cellpadding="0"
      cellspacing="0"
      style="
        background:#111827;
        border-radius:16px;
        overflow:hidden;
      "
    >

      <!-- HEADER -->

      <tr>
        <td
          style="
            background:#06b6d4;
            padding:25px;
            text-align:center;
          "
        >

          <h1 style="
            margin:0;
            color:#ffffff;
            font-size:28px;
          ">
            OSF HACKONE 2K26
          </h1>

        </td>
      </tr>

      <!-- BODY -->

      <tr>
        <td
          style="
            padding:40px;
            color:#ffffff;
          "
        >

          <h2 style="
            margin-top:0;
            color:#22c55e;
          ">
            Team Successfully Registered 🎉
          </h2>

          <p>
            Hello <strong>${name}</strong>,
          </p>

          <p>
            Your team has been successfully registered for
            <strong>OSF HACKONE 2K26</strong>.
          </p>

          <table
            width="100%"
            cellpadding="12"
            cellspacing="0"
            style="
              margin:25px 0;
              background:#1f2937;
              border-radius:10px;
            "
          >

            <tr>
              <td>
                <strong>
                  Team Name
                </strong>
              </td>

              <td>
                ${teamName}
              </td>
            </tr>

            <tr>
              <td>
                <strong>
                  Team Code
                </strong>
              </td>

              <td>
                ${teamCode}
              </td>
            </tr>

          </table>

          <h3>
            Next Steps
          </h3>

          <ul>
            <li>
              Invite your teammates using the Team Code.
            </li>

            <li>
              Complete your team before the registration deadline.
            </li>

            <li>
              Prepare your project presentation.
            </li>

            <li>
              Submit your PPT before
              <strong>15 June</strong>.
            </li>
          </ul>

          <h3>
            PPT Guidelines
          </h3>

          <ul>
            <li>
              Problem Statement
            </li>

            <li>
              Proposed Solution
            </li>

            <li>
              Tech Stack
            </li>

            <li>
              Expected Impact
            </li>

            <li>
              Team Introduction
            </li>
          </ul>

          <p>
            Keep your Team Code safe. It will be required for team management and future communication.
          </p>

        </td>
      </tr>

      <!-- FOOTER -->

      <tr>
        <td
          style="
            padding:25px;
            background:#0b1220;
            color:#94a3b8;
            text-align:center;
            font-size:13px;
          "
        >

          <p>
            Team OSF HACKONE 2K26
          </p>

          <p>
            Support:
            support@osfhackathon.in
          </p>

          <p>
            https://osfhackathon.in
          </p>

        </td>
      </tr>

    </table>

  </td>
</tr>


  </table>

</body>
</html>
`;
