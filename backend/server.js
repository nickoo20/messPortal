import express from 'express' ;
import { connectToMongoose } from './db/connectToMongoose.js' ;
import dotenv from "dotenv" ;
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js' ;
import billsRoutes from './routes/bills.route.js';
import complaintRoutes from './routes/complaint.route.js' ;
import userRoutes from './routes/user.route.js'; 
import menuRoutes from './routes/menu.route.js'; 
import leaveRoutes from './routes/leave.route.js' ;
import { fileURLToPath } from 'url';
import cors from 'cors' ;
import path from 'path';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import { v2 as cloudinary } from "cloudinary";
// 
// import complaintRoutes from './routes/complaint.route.js' ;
// import verificationRoutes from './routes/verification.route.js' ;
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
  // });
  
import studentRepresentativeRoutes from './routes/studentRepresentative.route.js'
dotenv.config() ;
const app= express() ;
const PORT = 8080 || process.env.PORT ;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:3000', // your frontend's URL
  credentials: true, // if you need to include cookies in the requests
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;

// app.use(cors({
//   origin:'http://localhost:3000',
//   credentials: true,
//   preflightContinue: false,
//      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//     optionsSuccessStatus: 204

// }));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
//   res.header("Access-Control-Allow-Credentials", true);
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });


// Routes
app.use("/api/auth", authRoutes) ; 
app.use("/api/complaints", complaintRoutes) ;
app.use("/api/user", userRoutes) ;
app.use('/api/menu', menuRoutes) ;
app.use("/api/bills",billsRoutes);
app.use("/api/mark-leave",leaveRoutes);
app.use('/api/mr',studentRepresentativeRoutes);


app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`) ;
    connectToMongoose() ;
}) ;
