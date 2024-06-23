import express from 'express' ;
import { connectToMongoose } from './db/connectToMongoose.js' ;
import dotenv from "dotenv" ;
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js' ;
import billsRoutes from './routes/bills.route.js';
import expenseRoutes from './routes/expense.route.js'
import complaintRoutes from './routes/complaint.route.js' ;
import userRoutes from './routes/user.route.js'; 
import menuRoutes from './routes/menu.route.js'; 
import leaveRoutes from './routes/leave.route.js' ;
import adminRoutes from './routes/admin.route.js' ;
import studentRepresentativeRoutes from './routes/studentRepresentative.route.js'
import { fileURLToPath } from 'url';
import cors from 'cors' ;
import path from 'path';
import noticeRoutes from './routes/notice.route.js';
// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 8080 || process.env.PORT ;

// import { v2 as cloudinary } from "cloudinary";
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
  // });
dotenv.config() ;
const app= express() ;
// Middleware to serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
// };
app.use(cors({
  origin: 'http://localhost:3000', // your frontend's URL
  credentials: true, // if you need to include cookies in the requests
}));


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;



app.use(express.urlencoded({ extended: true }));
app.use(express.json()) ;


app.use("/api/auth", authRoutes) ; 
app.use('/api/admin', adminRoutes) ;
app.use("/api/complaints", complaintRoutes) ;
app.use("/api/user", userRoutes) ;
app.use('/api/menu', menuRoutes) ;
app.use("/api/bills",billsRoutes);
app.use("/api/mark-leave",leaveRoutes);
app.use("/api/expense",expenseRoutes);
app.use("/api/notice",noticeRoutes);
app.use('/api/mr',studentRepresentativeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`) ;
    connectToMongoose() ;
}) ;
