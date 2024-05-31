import express from 'express' ;
import { connectToMongoose } from './db/connectToMongoose.js' ;
import dotenv from "dotenv" ;
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js' ;
import complaintRoutes from './routes/complaint.route.js' ;
import userRoutes from './routes/user.route.js'; 
import cors from 'cors' ;
// import { v2 as cloudinary } from "cloudinary";
// 
// import complaintRoutes from './routes/complaint.route.js' ;
// import verificationRoutes from './routes/verification.route.js' ;
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
  // });

dotenv.config() ;
const app= express() ;
const PORT = 8080 || process.env.PORT ;

app.use(cors({
  origin: 'http://localhost:3000', // your frontend's URL
  credentials: true, // if you need to include cookies in the requests
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;


// Routes
app.use("/api/auth", authRoutes) ; 
app.use("/api/complaints", complaintRoutes) ;
app.use("/api/user",userRoutes) ;

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`) ;
    connectToMongoose() ;
}) ;
