const nodemailer = require('nodemailer');

async function sendEmail(email, verificationCode) {
  console.log('Sending email...TRY 1: ', email, verificationCode);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aismajli@york.citycollege.eu',
      pass: '120bom600'
    }
  });

  let verificationLink = `${process.env.BASE_URL}/verify-email?verificationCode=${verificationCode}`;

  let mailOptions = {
    from: 'aismajli@york.citycollege.eu',
    to: email,
    subject: 'Verification Code for CITY Break Cafe App',
    text: 'Hello! \nYour verification link is: ' + verificationLink + '. It will expire in 24 hours. If you did not request this code, please ignore this email. Thank you!'
  };

  try {
    console.log('Sending email...', email, verificationCode);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully.');
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
  }
}

module.exports = { sendEmail };