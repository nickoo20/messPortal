import * as nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";

export const verificationByAdmin=async(req,res,userEmail,token,)=> {
    try {
          const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
              }
            });
        
            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: userEmail,
              subject: 'Email Verification',
              text: `Click on the following link to verify your account: ${process.env.BASE_URL}/verify/user?token=${token}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              // toast.success("Go to your email!")
              console.log("Email sent to admin : " + info.response);
            });

            return res.status(201).json({ 
              message: 'User created. Verification email sent.' ,
              success:true,
            });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  
  export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  };
  
  