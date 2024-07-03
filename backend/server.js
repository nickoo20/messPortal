import express from 'express';
import { connectToMongoose } from './db/connectToMongoose.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.route.js';
import billsRoutes from './routes/bills.route.js';
import expenseRoutes from './routes/expense.route.js';
import complaintRoutes from './routes/complaint.route.js';
import userRoutes from './routes/user.route.js';
import menuRoutes from './routes/menu.route.js';
import leaveRoutes from './routes/leave.route.js';
import adminRoutes from './routes/admin.route.js';
import studentRepresentativeRoutes from './routes/studentRepresentative.route.js';
import noticeRoutes from './routes/notice.route.js';
import studentsRoutes from './routes/allStudents.route.js';
import hostelchangeRoutes from './routes/ToggleHostelChange.model.js';

dotenv.config();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;

const app = express();

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Enable CORS for requests from the frontend development server
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Middleware for parsing cookies and JSON bodies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route handlers
app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/user", userRoutes);
app.use('/api/menu', menuRoutes);
app.use("/api/bills", billsRoutes);
app.use("/api/mark-leave", leaveRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/notice", noticeRoutes);
app.use('/api/mr/', studentRepresentativeRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/toggle-hostel-change', hostelchangeRoutes);

// Serve frontend in production
if (process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend/dist",  "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectToMongoose();
});
