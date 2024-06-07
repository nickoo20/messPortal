import express from 'express' ;
import { registerUser,loginUser, logout,RegisterAdmin } from '../controllers/auth.controller.js' ; 
import { verifyEmail, verifyWarden,emailVerificationByAdmin } from '../controllers/verify.controller.js' ;
import { LoginAdmin } from '../controllers/auth.controller.js' ;
import {checkAuthorizedEmail} from '../middlewares/checkAdminEmail.js' ;
const router = express.Router() ;

router.post("/register-student", registerUser) ;
router.post("/login-student", loginUser) ;
router.get('/verify-email', verifyEmail);
router.get('/verify-warden', verifyWarden);
router.post('/logout-student',logout) ;

// router.post("/login", loginUser) ;
router.post("/register-admin",checkAuthorizedEmail, RegisterAdmin);
router.post('/login-admin',LoginAdmin);  
router.get('/verify-admin',emailVerificationByAdmin);

router.post("/logout", logout) ;

export default router ;