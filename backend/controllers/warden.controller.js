import Warden from "../models/warden.model.js" ;
import jwt from 'jsonwebtoken' ;
import nodemailer from 'nodemailer' ;
import bcrypt from 'bcrypt' ; 

export const registerWarden = async(req, res) => {
    try{
        const {name, email, password, hostelName} = req.body ;
        const existingWarden = await Warden.findOne({ email });
        
        if (existingWarden) {
            return res.status(400).json({ message: 'Warden already exists!' });
        }   
        const hashedPassword = await bcrypt.hash(password, 10);
        const newWarden = new Warden({
        name,
        email,
        password: hashedPassword,
        hostelName,
        });
        const { token } = jwt.sign({ email }, process.env.JWT_SECRET) ;
        await newWarden.save() ;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Account Verification',
            html: `
              <h1>Account Verification</h1>
              <p>Dear ${name},</p>
              <p>Thank you for registering as a Warden. To complete your registration, please verify your email address by clicking the link below:</p>
              <a href="${process.env.BASE_URL}/api/warden/verify-email?token=${token}">Verify Email</a>
              <p>If you did not register for this account, please ignore this email.</p>
            `,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ message: 'Failed to send verification email' });
            }
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Registration successful! Verify your email now!' });
          });
    }catch(err){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const loginWarden = async(req, res) =>{ 
    try{

    }catch(err){

    }
}