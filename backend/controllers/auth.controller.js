import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer' ;
import {adminModel as Admin} from "../models/admin.model.js";
import Errorhandler from "../error/errorClass.js";
import {verificationbyuserforadmin,generateToken} from "../middlewares/AdminReg.js";
import { comparePassword, hashPassword } from "../helper/auth.js";
// import { verificationByStudent } from "../utils/verification.js";
import { validationResult } from "express-validator";
//import {sendVerificationEmail,sendWardenVerificationEmail} from '../utils/mailer.js' ;
import AsyncErrorHandler from "../error/CatchAsyncError.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, enrollmentNumber, name, registrationNumber } = req.body ;
    const emailRegex = /^[a-z]+_[0-9]{4}[a-z]{4}[0-9]{3}@nitsri\.ac\.in$/ ;
    if(!emailRegex.test(email)){
        return res.status(400).json({
            error: "Invalid email format!",
        }) ;
    }
    let user = await User.findOne({ email }) ;

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }
    // Check if password is strong
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character!" });
    }

     // Check if enrollment number is unique
     const existingEnrollmentNumber = await User.findOne({ enrollmentNumber });
     if (existingEnrollmentNumber) {
       return res.status(400).json({
         error: "Enrollment number already exists!",
       });
     }

     // Check if registration number is unique
    const existingRegistrationNumber = await User.findOne({ registrationNumber }); 
    if (existingRegistrationNumber) {
      return res.status(400).json({
        error: "Registration number already exists!",
      });
    }

    // Create new user
    user = new User({ 
      email, 
      password,
      enrollmentNumber,
      name,
      registrationNumber
   });
    user.password = await bcrypt.hash(password, 10);

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // user.verificationToken = verificationToken;
    await user.save();

     // Send verification email
     const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Verification',
      text: `Click on the following link to verify your account: ${process.env.BASE_URL}/verify-email?token=${verificationToken}`,
    };

    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Email sent: ' + info.response) ;
    });

    return res
    .cookie('initial_token',token, {
      httpOnly: true,
      sameSite : "strict",
      secure : process.env.NODE_ENV === "development",
    }) 
      .status(200)
      .json({
        message:
          "Registration successful!, check your email for verification link!", 
          initial_token: token
      });
  } catch (error) {
    console.log(`, ${error.message}!`);
    return res.status(500).json({ message: "Error in SignUp controller,!" }) ;
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials!",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials!",
      });
    }
    if (!user.isVerified || !user.isWardenVerified) {
      return res.status(403).json({
        message: "User not fully verified!",
      });
    }

    // const payload = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    user.password = undefined;
    const token = jwt.sign({email}, process.env.JWT_SECRET) ;
      return res.cookie('access_token',token).status(200).json({
        message: "Login successful!",
        user
  }) ;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

export const logout = async (req, res) => {
  try{
    console.log(res)
  res.clearCookie('access_token') ;
  res.status(200).json({
    message: 'User logged out successfully!',
  }) ;
}
catch(err){
  console.log("error trying deleting token :",err.message)
}
}
export const RegisterAdmin=async(req,res)=>{
  const { name, email, password, HostelID, HostelName } = req.body;
if(!name)
  return next(new Errorhandler("Please Enter your Name", 400));

if (!email) {
  return next(new Errorhandler("Please Enter your Email", 400));
}
if (!password) {
  return next(new Errorhandler("Please Enter your Password", 400));
}
// if (!HostelID) {
//   return next(new Errorhandler("Please Enter your HostelID", 400));
// }
// if (!HostelName) {
//   return next(new Errorhandler("Please Enter your HostelName", 400));
// }

const admin = await Admin.findOne({ email });

if (admin) {
  return res.status(400).json({
    success: false,
    message: "Admin Already exist",
  });
}

const hashedPassword = await hashPassword(password);

const newAdmin = await Admin.create({
  name,
  email,
  password: hashedPassword,
  HostelID,
  HostelName,
});
// const token = await jwt.sign({ _id: newAdmin._id }, process.env.JWT_SECRET, {
//   expiresIn: "7d",
// });
const token=generateToken({email:email})
await verificationbyuserforadmin(req,res,email,token);

  //await verificationbyadmin(req,res,adminemail,newUser,token)

//res.status(201).json({ message: ' Verification email sent.' });
// const options = {
//   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
// };
// res.cookie("jwtoken", token, options).status(200).json({
//   success: true,
//   message: "New Admin Registered Successfully!",
//   token,
//   newAdmin,
// });
//res.status(201).json({ message: ' Verification email sent.' });
}
export const LoginAdmin = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "Enter all fields",
    });
  }

  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User Not found!",
    });
  }
  if(user.verified==false)
  {
    return next(new Errorhandler("you are not verified yet", 400));
  }
  const isMatch = await comparePassword(password, user.password);
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  const token1 = jwt.sign({email}, process.env.JWT_SECRET) ;
  if (isMatch) {
    res.cookie('access_token',token1).status(200).json({
      success: true,
      message: "Login Successfull! Redirecting",
      token,
      user,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Incorrect Password",
    });
  }
});
