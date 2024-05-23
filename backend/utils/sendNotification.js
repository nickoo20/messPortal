// utils/sendNotification.js
import nodemailer from 'nodemailer'; 

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendNotification = (email, subject, text) => {
  const mailOptions = {
    from: process.env.WARDEN_EMAIL,
    to: email,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};


