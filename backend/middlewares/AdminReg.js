import express from "express";
import cors from 'cors';
//import {studentModel as User} from "../models/StudentModel.js";
import * as nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
import AsyncErrorHandler from "../error/CatchAsyncError.js";
const verificationbyuserforadmin=async(req,res,useremail,token,)=> {
    try {
            //const token=generateToken({email:useremail})
            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              
              auth: {
                user: 'richashrivastava359@gmail.com',
                pass: 'dpsm qwph qasl fyiz'
              }
            });
        
            const mailOptions = {
              from: 'richashrivastava359@gmail.com',
              to: useremail,
              subject: 'Email Verification',
              html: `<p>Please click the following link to verify your email: <a href="http://localhost:8080/api/auth/verify/user?token=${token}">Verify Email</a></p>`
            };
        
            await transporter.sendMail(mailOptions);
            //res.redirect('http://localhost:3000/confirmation')
            res.status(201).json({ 
              message: 'User created. Verification email sent.' ,
              success:true,
            });
      // Send verification email
      
      //next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  };
  
  // Function to send verification email
  
  
  export {verificationbyuserforadmin,generateToken};
  