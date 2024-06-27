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
import studentsRoutes from './routes/allStudents.route.js';
import hostelchangeRoutes from './routes/ToggleHostelChange.model.js'

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 8080 || process.env.PORT ;


dotenv.config() ;
const app= express() ;

app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
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
app.use('/api/mr/',studentRepresentativeRoutes);
app.use('/api/students',studentsRoutes);
app.use('/api/toggle-hostel-change',hostelchangeRoutes)

if(process.env.NODE_ENV === "prooduction"){
  app.use (express.static(path.join(__dirname, "/frontend/dist"))) ;
  app.get("*",(req, res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist","index.html")) ;
  })
}


app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`) ;
    connectToMongoose() ;
}) ;
