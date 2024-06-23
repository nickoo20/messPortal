import User from "../models/user.model.js";
import nodemailer from "nodemailer";
import jwt, { decode } from "jsonwebtoken";
import Warden from '../models/warden.model.js' ;
import Accountant from "../models/accountant.model.js";

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
      text: `A new user with Enrollment Number: ${user.enrollmentNumber.toUpperCase()} of ${user.hostelName.toUpperCase()} has registered and requires your verification. Click on the following link to verify the user: 
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

export const verifySelfAdminEmail = async (req, res) => {
  const { token } = req.query;

  try {
    let admin ;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const warden = await Warden.findOne({ email: decoded.email });
    const accountant = await Accountant.findOne({ email : decoded.email}) ;
    if (!warden && !accountant) {
      return res.status(400).json({ message: 'Invalid token!' });
    }
    if(warden){
      warden.isSelfVerified = true;
      admin=warden ;
      await warden.save();
    }
    else{
      accountant.isSelfVerified=true;
      admin=accountant ;
      await accountant.save(); 
    }

    const newToken = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    const roleType = admin.hostelName ? "Warden" : "Accountant";
    const adminDetails = admin.hostelName ? `<p>Hostel: ${admin.hostelName}</p>` : '';

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.DSW_EMAIL,
      subject: 'DSW Verification Required',
      html: `
        <html>
        <head>
          <style>
            .email-container {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              padding: 20px;
            }
            .email-header, .email-footer {
              padding: 20px;
              text-align: center;
              background-color: #f7f7f7;
            }
            .email-body {
              padding: 20px;
            }
            .verification-link {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>DSW Verification Required</h1>
            </div>
            <div class="email-body">
              <p>A new admin has registered and requires your verification. Here are the details:</p>
              <p>Name: ${admin.name}</p>
              <p>Email: ${admin.email}</p>
              <p>Role: ${roleType}</p>
              ${adminDetails}
              <p>Click the link below to verify the admin:</p>
              <a href="${process.env.BASE_URL}/admin/verify-dsw?token=${newToken}" class="verification-link">Verify Admin</a>
            </div>
            <div class="email-footer">
              <p>&copy; ${new Date().getFullYear()} Mess Complaint Portal. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
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

export const verifyAdminByDsw = async (req, res) => {
  const { token } = req.query;

  try {
    let admin ;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const warden = await Warden.findOne({ email: decoded.email });
    const accountant = await Accountant.findOne( { email : decoded.email }) ;

    if (!warden && !accountant) {
      return res.status(400).json({ message: 'Invalid token!' });
    }
    if(warden){
      warden.isDSWVerified = true ;
      admin = warden ;
      await warden.save();
    }
    else{
      accountant.isDSWVerified=true;
      admin=accountant; 
      await accountant.save() ;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: 'Verification Successful',
      html: `
        <html>
        <head>
          <style>
            .email-container {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .email-header, .email-footer {
              padding: 20px;
              text-align: center;
              color: #fff;
            }
            .email-body {
              padding: 20px;
            }
            .email-body p {
              margin: 10px 0;
            }
            .login-link {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Verification Successful</h1>
            </div>
            <div class="email-body">
              <p>Dear ${admin.name},</p>
              <p>Congratulations! Your account has been successfully verified by the DSW.</p>
              <p>You can now log in to the mess portal to manage your duties.</p>
              <a href="${process.env.BASE_URL}/login-admin" class="login-link">Log in to Mess Portal</a>
            </div>
            <div class="email-footer">
              <p>&copy; ${new Date().getFullYear()} Mess Complaint Portal. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
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