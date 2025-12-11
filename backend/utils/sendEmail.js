const nodemailer = require("nodemailer");

async function sendRfpEmail(to, subject, html, rfpId) {
  if (!process.env.SMTP_USER || process.env.SMTP_USER.includes("your_email")) {
    console.log("Email not configured - skipping send");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailHtml = `
    ${html}
    <hr>
    <p><strong>To submit your proposal, reply to this email with your quote.</strong></p>
    <p><em>RFP ID: ${rfpId}</em></p>
  `;

  const info = await transporter.sendMail({
    from: `"Procurement" <${process.env.SMTP_FROM}>`,
    to: to.join(","),
    subject: `RFP: ${subject} (RFP ID: ${rfpId})`,
    html: emailHtml,
  });

  return info;
}

module.exports = { sendRfpEmail };
