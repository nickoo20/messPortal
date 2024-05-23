import express from 'express' ;
import { connectToMongoose } from './db/connectToMongoose.js';
import dotenv from "dotenv" ;
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js' ;
import verificationRoutes from './routes/verification.route.js' ;

dotenv.config() ;

const app= express() ;
const PORT = 8080 || process.env.PORT ;

app.use(express.json()) ;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes) ; 
app.use('/api', verificationRoutes);


app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`) ;
    connectToMongoose() ;
})