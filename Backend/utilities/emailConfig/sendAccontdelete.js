const nodemailer = require("nodemailer");

exports.sendAccountDeleteEmail = (personDetails) => {
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_SENDER_EMAIL,
      pass: process.env.MAIL_SENDER_PASSWORD
    }
  });
  
  const mailOptions = {
    from: process.env.MAIL_SENDER_EMAIL,
    to: `${personDetails?.email}`,
    subject: 'Account Deletion',
    html: `<h2>Hey There,</h2><br/><h4>Account associated with email ${personDetails?.email} was deleted by admin.</h4>Please contact admin for further details.<br />`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return error;
    } else {
      return info.response;
    }
  })
}