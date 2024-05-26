import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Complaint System" <${process.env.EMAIL_USER}>`,
      to: process.env.DSW_EMAIL,
      subject,
      html
    });
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error.message);
    throw new Error('Failed to send email');
  }
};
