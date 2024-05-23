import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { verificationByStudent } from "../utils/verification.js";
import { validationResult } from "express-validator";
import {sendVerificationEmail,sendWardenVerificationEmail} from '../utils/mailer.js' ;

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }
    user = new User({ email, password });
    user.password = await bcrypt.hash(password, 10);

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET);
    user.verificationToken = verificationToken;
    await user.save();

    sendVerificationEmail(email, verificationToken);
    sendWardenVerificationEmail(process.env.WARDEN_EMAIL, verificationToken) ;

    return res
      .status(200)
      .json({
        message:
          "Registration successful, check your email for verification link!",
      });
  } catch (error) {
    console.log(`Error in SignUp controller, ${error.message}!`);
    return res.status(500).json({ message: "Server Error!" });
  }
};

export const login = async (req, res) => {
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

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

export const logout = async (req, res) => {};
