const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  // Create Email Transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use Gmail service
    auth: {
      user: process.env.EMAIL_USER, // Gmail address
      pass: process.env.EMAIL_PASS, // App password or regular Gmail password (if less secure apps are enabled)
    },
    tls: {
      rejectUnauthorized: false, // Optional, set to false to avoid SSL issues
    },
  });

  // Options for sending email
  const options = {
    from: sent_from,
    to: send_to,
    replyTo: reply_to,
    subject: subject,
    html: message,
  };

  // Send email
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
