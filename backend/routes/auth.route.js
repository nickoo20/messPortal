import express from 'express' ;
import { registerUser,loginUser, logout } from '../controllers/auth.controller.js' ; 
import { verifyEmail, verifyWarden } from '../controllers/verify.controller.js';

const router = express.Router() ;

router.post("/register-student", registerUser) ;
router.get('/verify-email', verifyEmail);
router.get('/verify-warden', verifyWarden);

router.post("/login-student", loginUser) ;
router.post('/logout-student',logout) ;






export default router ;