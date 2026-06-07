module.exports = ({
  name,
  paymentId,
}) => `
<h2>Payment Confirmed ✅</h2>

<p>Hello ${name}</p>

<p>
Your payment has been verified.
</p>

<p>
Transaction ID:
<b>${paymentId}</b>
</p>

<p>
You can now create or join a team.
</p>
`;