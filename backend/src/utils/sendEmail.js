const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fabrico@gmail.com',
        pass: '123456789'  // NOTE: Do not hard-code sensitive information like passwords in production!
      }
    });

    const mailOptions = {
      from: 'fabrico@gmail.com',
      to: to,
      subject: subject,
      text: text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };
