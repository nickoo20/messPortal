import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Admin from "../models/admin.model.js";
import Errorhandler from "../error/errorClass.js";
import { verificationByAdmin, generateToken } from "../middlewares/AdminReg.js";
import { comparePassword, hashPassword } from "../helper/auth.js";
// import { verificationByStudent } from "../utils/verification.js";
//import {sendVerificationEmail,sendWardenVerificationEmail} from '../utils/mailer.js' ;
import AsyncErrorHandler from "../error/CatchAsyncError.js";

export const registerUser = async (req, res) => {
  try {
    const {
      email,
      password,
      enrollmentNumber,
      name,
      registrationNumber,
      hosteller,
    } = req.body;
    const emailRegex = /^[a-z]+_[0-9]{4}[a-z]{4}[0-9]{3}@nitsri\.ac\.in$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format!",
      });
    }
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }
    // Check if password is strong
    if (!hosteller) {
      return res.status(404).json({
        message: "Non-hosteller students cannot register!",
      });
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character!",
      });
    }

    // Check if enrollment number is unique
    const existingEnrollmentNumber = await User.findOne({ enrollmentNumber });
    if (existingEnrollmentNumber) {
      return res.status(400).json({
        error: "Enrollment number already exists!",
      });
    }

    // Check if registration number is unique
    const existingRegistrationNumber = await User.findOne({
      registrationNumber,
    });
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
      registrationNumber,
    });
    user.password = await bcrypt.hash(password, 10);

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // user.verificationToken = verificationToken;
    await user.save();
    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Account Verification",
      text: `Click on the following link to verify your account: ${process.env.BASE_URL}/verify-email?token=${verificationToken}`,
    };

    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      // toast.success("Go to your email!")
      console.log("Email sent to student : " + info.response);
    });
    return res
      .cookie("initial_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development",
      })
      .status(200)
      .json({
        message:
          "Registration successful!, check your email for verification link!",
        initial_token: token,
        success: true,
      });
  } catch (error) {
    console.log(`, ${error.message}!`);
    return res.status(500).json({ message: "Error in SignUp controller,!" });
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
    if (!user.isWardenVerified) {
      return res.status(403).json({
        message: "User not verified by warden!",
      });
    }

    user.password = undefined;
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        token,
        success: true,
        message: "Login successful!",
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

export const logout = async (req, res) => {
  try {
    console.log(res);
    res.clearCookie("access_token");
    res.status(200).json({
      message: "User logged out successfully!",
    });
  } catch (err) {
    console.log("error trying deleting token :", err.message);
  }
};

export const RegisterAdmin = async (req, res, next) => {
  const { name, email, password, role, HostelName } = req.body;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character!",
    });
  }

  const admin = await Admin.findOne({ email });

  if (admin) {
    return res.status(400).json({
      success: false,
      message: "Admin Already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    role,
    HostelName,
  });
  await newAdmin.save();

  const token = generateToken({ email: email });
  // await verificationByAdmin(req, res, email, token);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Account Verification",
    html: `
    <html>
    <head>
      <style>
        .email-container {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .email-header {
          padding: 20px;
          text-align: center;
        }
        .email-body {
          padding: 20px;
        }
        .email-footer {
          background-color: ;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #777;
        }
        .verification-link {
          display: inline-block;
          padding: 10px 20px;
          margin: 20px 0;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Account Verification</h1>
        </div>
        <div class="email-body">
          <p>Dear ${name},</p>
          <p>Thank you for registering as an Admin. To complete your registration, please verify your email address by clicking the link below:</p>
          <a href="${process.env.BASE_URL}/verify-admin?token=${token}" class="verification-link">Verify Email</a>
          <p>If you did not register for this account, please ignore this email.</p>
        </div>
        <div class="email-footer">
          <p>&copy; ${new Date().getFullYear()} Mess Portal. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  };

  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    // toast.success("Go to your email!")
    console.log("Email sent to Admin : " + info.response);
  });
  return res.status(200).json({
    message: "Registration successful! Verify your email now !" ,
    success:true,
    token,
  }) ;
};
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
  if (user.verified == false) {
    return next(new Errorhandler("you are not verified yet", 400));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      message: "Invalid credentials!",
    });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const token1 = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET
  );
    return res.cookie("access_token", token1)
      .status(200).json({
      success: true,
      message: "Login Successfull ! ",
      token,
      user,
    });
});
