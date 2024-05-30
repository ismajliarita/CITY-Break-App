const nodemailer = require('nodemailer');

function toastError(toast, error) {
  toast({
    title: prettifyErrorMessage(error),
    status: "error",
    isClosable: true,
  });
}

function toastSuccess(toast, message) {
  toast({
    title: message,
    status: "success",
    isClosable: true,
  });
}

function prettifyErrorMessage(error) {
  if (error.message) {
    return error.message;
  } else {
    return "An error occurred";
  }
}

async function sendEmailVerification(email, verificationCode) {
  console.log(`Sending email to ${email} with verification code: ${verificationCode}`);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aismajli@york.citycollege.eu',
      pass: '120bom600'
    }
  });

  let mailOptions = {
    from: 'aismajli@york.citycollege.eu',
    to: email,
    subject: 'Email Verification',
    text: `Your verification code is: ${verificationCode}. It will expire in 24 hours. If you did not request this code, please ignore this email. Thank you!`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Failed to send email: ${error}`);
    throw error;
  }
}

function getDateAfterHours(hours) {
  const now = new Date();
  now.setHours(now.getHours() + hours);
  return now;
}

module.exports = {
  toastError,
  toastSuccess,
  prettifyErrorMessage,
  sendEmailVerification,
  getDateAfterHours,
};