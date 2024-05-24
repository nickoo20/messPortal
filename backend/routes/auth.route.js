import express from 'express' ;
import { registerUser,loginUser } from '../controllers/auth.controller.js' ; 
import { verifyEmail, verifyWarden } from '../controllers/verify.controller.js';

const router = express.Router() ;

router.post("/register", registerUser) ;
router.get('/verify-email', verifyEmail);
router.get('/verify-warden', verifyWarden);

router.post("/login", loginUser) ;






export default router ;