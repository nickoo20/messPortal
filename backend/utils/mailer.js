import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = (email, token) => {
  const url = `http://localhost:8080/verify/${token}`;
  transporter.sendMail({
    to: email,
    subject: "Verify your email",
    html: `Click <a href="${url}>here</a> to verify your email."`,
  });
};

export const sendWardenVerificationEmail = (email,token)=>{
  
}