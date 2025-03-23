const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"AI Pet Health Assistant" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>${subject}</h2>
          <p>${text}</p>
          <hr />
          <p style="font-size: 0.9em; color: #555;">
            This email was sent by <strong>AI Pet Health Assistant</strong>. If you did not request this, please ignore this email.
          </p>
        </div>
      `,
      headers: {
        "X-Priority": "1",
        "X-Mailer": "Nodemailer",
      },
    });
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
