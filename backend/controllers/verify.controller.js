import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const verifyEmail = async (req, res) => {
  try {
    const {token} = req.query;
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
      text: `A new user with Enrollment Number: ${user.enrollmentNumber.toUpperCase()} has registered and requires your verification. Click on the following link to verify the user: 
      ${process.env.BASE_URL}/verify-warden?token=${verificationToken}`,
    };

    transporter.sendMail(wardenMailOptions, (error, info) => {
      if (error) {
        return console.log("error warden", error.message);
      }
      console.log("Email sent: " + info.response);
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
      });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({ error: "Error in email verification" });
  }
};

export const verifyWarden = async (req, res) => {
  try {
    const { token } = req.query;
    // const token = req.cookies.initial_token1;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token to get user details
    console.log("decoded Warden: ", decoded);
    const user = await User.findOne({ email: decoded.userEmail }); // Find user by decoded email
    console.log(user) ;
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

export const emailVerificationByAdmin = async (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;
    const newuser = Admin.findOne({ userEmail });
    try {
      await Admin.findOneAndUpdate({ email: userEmail }, { verified: true });
    } catch (error) {
      console.log(error);
    }
    const verificationToken = jwt.sign(
      { email: userEmail, role: newuser.role },
      process.env.JWT_SECRET
    );
    return res
      .cookie("access_token", verificationToken, {
        httpOnly: true,
        secure: false,
        secure : process.env.NODE_ENV === "development",
      })
      .status(200)
      .json({
        message: "Admin verification successful !",
        access_token: verificationToken,
      });
  } catch (error) {
    console.log(error);
  }
};