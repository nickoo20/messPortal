import  jwt from "jsonwebtoken";
import * as nodemailer from 'nodemailer';

import {adminModel as User } from "../models/admin.model.js";
//import { verificationbyadmin } from "../middleware/userReg.js";
const emailverificationbyuserforadmin=async(req,res)=>{
    try {
        //console.log("hii")
        const adminemail="richashrivastava3591@gmail.com"
        const token = req.query.token;
    
        if (!token) {
          return res.status(400).json({ message: 'Token is required' });
        }
    
        // Verify JWT token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        //const { name, email, HostelID, HostelName } = req.body;
         const newuser=User.findOne({userEmail})
        // console.log(newuser.name)
        // console.log(newuser.email)
        //await verificationbyadmin(req,res,adminemail,newuser,token)
        //console.log(newuser.name)
        //res.redirect('http://localhost:3000/confirmation')
        try{
            //console.log("starting")
            
          await User.findOneAndUpdate({ email: userEmail }, { verified: true });
          
          //console.log("suzz")
          }
          catch(error){
            console.log(error)
          }
          //res.render("http://localhost:5173/login-admin")
          //return res.status(200).json({message:"verification done"})
          const verificationToken = jwt.sign(
            { email: userEmail },
            process.env.JWT_SECRET
          );
          console.log(res.cookie);
          //res.clearCookie("token");
           res.cookie("access_token", verificationToken,{
        httpOnly:true,
        sameSite : "None",
        secure:false
        // secure : process.env.NODE_ENV !== "development",
      }).status(200).json({ message: "Warden verification successful",access_token:verificationToken });
      //console.log(res.cookie.access_token)
     
    } catch (error) {
        console.log(error)
    }
}
export {emailverificationbyuserforadmin};