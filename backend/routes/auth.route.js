import express from 'express' ;
import { registerUser,loginUser, logout } from '../controllers/auth.controller.js' ; 
import {verifySelfUserEmail, verifyUserByWarden } from '../controllers/verify.controller.js' ;

const router = express.Router() ;

router.post('/logout-student',logout) ;
router.post("/register-student", registerUser) ;
router.post("/login-student", loginUser) ;
router.get('/verify-email', verifySelfUserEmail);
router.get('/verify-warden', verifyUserByWarden);  

router.post("/logout", logout) ;

export default router ;