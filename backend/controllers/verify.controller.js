import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    let userEmail;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded User: ", decoded);
    const user = await User.findOne({ email: decoded.email });
    userEmail = user.email;
    if (!user) {
      return res.status(400).json({ message: "Invalid token user hjbkj" });
    }

    user.isVerified = true;
    await user.save();
    console.log("user: ", user);
    userEmail = user.email;
    const verificationToken = jwt.sign({ userEmail }, process.env.JWT_SECRET);

    // Send verification email to warden
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const wardenMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.WARDEN_EMAIL,
      subject: "Warden Verification Required",
      text: `A new user has registered and requires your verification. Click on the following link to verify the user: 
      ${process.env.BASE_URL}/verify-warden?token=${verificationToken}`,
    };

    transporter.sendMail(wardenMailOptions, (error, info) => {
      if (error) {
        return console.log("error warden", error.message);
      }
      console.log("Email sent: " + info.response);
    });

    return res
      .status(200)
      .json({
        message: "Email verification successful. Awaiting warden verification.",
      });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ error: "Error in email verification" });
  }
} ;

export const verifyWarden = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token to get user details
    console.log("decoded Warden: ", decoded);
    const user = await User.findOne({ email: decoded.userEmail }); // Find user by decoded email

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "User email not verified yet" });
    }

    user.isWardenVerified = true;
    await user.save();

    return res.status(200).json({ message: "Warden verification successful" });
  } catch (error) {
    console.log(`Error in warden verification, ${error.message}`);
    return res.status(500).json({ error: "Error in warden verification" });
  }
} ;

