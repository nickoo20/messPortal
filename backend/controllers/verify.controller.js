import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import jwt, { decode } from "jsonwebtoken";
import Warden from '../models/warden.model.js' ;

export const verifySelfUserEmail = async (req, res) => {
  try {
    const {token} = req.query ;
    let userEmail;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) ;
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
      to: decoded.wardenEmail,
      subject: "Warden Verification Required",
      text: `A new user with Enrollment Number: ${user.enrollmentNumber.toUpperCase()} of hostel ${user.hostelName} has registered and requires your verification. Click on the following link to verify the user: 
      ${process.env.BASE_URL}/verify-warden?token=${verificationToken}`,
    };

    transporter.sendMail(wardenMailOptions, (error, info) => {
      if (error) {
        return console.log("error warden", error.message);
      }
      console.log("Email sent to warden for verification: " + info.response);
    });

    res.clearCookie("initial_token");

    return res
      .cookie("initial_token1", verificationToken, {
        httpOnly:true,
        sameSite : "strict",
        // secure : process.env.NODE_ENV !== "development",
      })
      .status(200)
      .json({
        message: "Email verification successful. Awaiting warden verification.",
      }) ;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ error: "Error in email verification" });
  }
};

export const verifyUserByWarden = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token to get user details
    const user = await User.findOne({ email: decoded.userEmail }); // Find user by decoded email

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "User email not verified yet" });
    }
    user.isWardenVerified = true;
    await user.save();

    const verificationToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET
    );
      // Send confirmation email to user (Confirmation email)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Verification Successful",
        text: `Dear ${user.name},\n\nYour account has been successfully verified by the warden. You can now log in to the mess portal.\n\nBest regards,\nMess Portal Team`,
      };
  
      transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
          console.log("Error sending confirmation email:", error.message);
        } else {
          console.log("Confirmation email sent: " + info.response);
        }
      });

    res.clearCookie("initial_token1");
    return res
      .cookie("access_token", verificationToken,{
        httpOnly:true,
        sameSite : "strict",
        // secure : process.env.NODE_ENV !== "development",
      }) 
      .status(200)
      .json({ message: `Warden verification successful for ${user.enrollmentNumber.toUpperCase()}`,access_token:verificationToken });
  } catch (error) {
    console.log(`Error in warden verification, ${error.message}`);
    return res.status(500).json({ error: "Error in warden verification" });
  }
};

export const verifySelfWardenEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const warden = await Warden.findOne({ email: decoded.email });

    if (!warden) {
      return res.status(400).json({ message: 'Invalid token!' });
    }

    warden.isSelfVerified = true;
    await warden.save();

    const newToken = jwt.sign({ email: warden.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.DSW_EMAIL,
      subject: 'DSW Verification Required',
      html: `
        <h1>DSW Verification Required</h1>
        <p>A new warden has registered and requires your verification. Click the link below to verify the warden:</p>
        <a href="${process.env.BASE_URL}/warden/verify-dsw?token=${newToken}">Verify Warden</a>
      `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to send verification email to DSW' });
      }
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Self verification successful! Awaiting DSW verification!' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyWardenByDsw = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const warden = await Warden.findOne({ email: decoded.email });

    if (!warden) {
      return res.status(400).json({ message: 'Invalid token!' });
    }

    warden.isDSWVerified = true ;
    await warden.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: warden.email,
      subject: 'Verification Successful',
      html: `
        <h1>Verification Successful</h1>
        <p>Dear ${warden.name},</p>
        <p>Your account has been successfully verified by the DSW. You can now log in to the mess portal.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed to send confirmation email' });
      }
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'DSW verification successful!' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};