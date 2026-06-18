const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendPasswordResetEmail = async (
  email,
  username,
  resetLink
) => {
  await transporter.sendMail({
    from: `"HikariCV" <${process.env.MAIL_USER}>`,
    to: email,

    subject: "Reset Your Password",

    html: `
      <h2>Hello ${username}</h2>

      <p>
        We received a request to reset your password.
      </p>

      <a href="${resetLink}">
        Reset Password
      </a>

      <p>
        This link expires in 10 minutes.
      </p>
    `,
  });
};

const sendEmailVerificationEmail = async (
  email,
  username,
  verificationLink
) => {
  await transporter.sendMail({
    from: `"HikariCV" <${process.env.MAIL_USER}>`,
    to: email,

    subject: "Verify Your Email",

    html: `
      <h2>Hello ${username}</h2>

      <p>
        Please verify your email address to use HikariCV features.
      </p>

      <a href="${verificationLink}">
        Verify Email
      </a>

      <p>
        This link expires in 24 hours.
      </p>
    `,
  });
};

module.exports = {
  sendPasswordResetEmail,
  sendEmailVerificationEmail,
};
