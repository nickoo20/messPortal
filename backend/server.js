import express from 'express' ;
import { connectToMongoose } from './db/connectToMongoose.js' ;
import dotenv from "dotenv" ;
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js' ;
import expenseRoutes from './routes/expense.route.js'
import complaintRoutes from './routes/complaint.route.js' ;
import userRoutes from './routes/user.route.js'; 
import cors from 'cors' ;
import { v2 as cloudinary } from "cloudinary";
import billRoutes from "./routes/bills.route.js";
import leaveRoutes from "./routes/leave.route.js";
// import complaintRoutes from './routes/complaint.route.js' ;
// import verificationRoutes from './routes/verification.route.js' ;
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
  // });

//import verificationRoutes from './routes/verification.route.js' ;
// import complaintRoutes from './routes/complaint.route.js';
// import cors from "cors";
import studentRepresentativeRoutes from './routes/studentRepresentative.route.js'
dotenv.config() ;
const app= express() ;
const PORT = 8080 || process.env.PORT ;
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
// };

app.use(cors({
  origin: 'http://localhost:3000', // your frontend's URL
  credentials: true, // if you need to include cookies in the requests
}));
app.use(cookieParser());

app.use(cors({
  origin:'http://localhost:3000',
  credentials: true,
  preflightContinue: false,
     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    optionsSuccessStatus: 204

}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;


// Routes
app.use("/api/auth", authRoutes) ; 
app.use("/api/complaints", complaintRoutes) ;
app.use("/api/user",userRoutes) ;


// app.use('/api', verificationRoutes) ;
app.use("/api/bills",billRoutes);
app.use("/api/mark-leave",leaveRoutes);
app.use("/api/expense",expenseRoutes);
//app.use(cors());
//app.use(express.json()) ;

//app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
//app.use("/api/auth", authRoutes) ; 
//app.use('/api', verificationRoutes);
//app.use('/api/',complaintRoutes);
app.use('/api/mr/',studentRepresentativeRoutes);
app.get("/", (req, res) => {
    res.send({
      message: "welcome to mess portal app",
    });
  });

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`) ;
    connectToMongoose() ;
}) ;
