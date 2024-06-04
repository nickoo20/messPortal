import express from 'express' ;
import { registerUser,loginUser } from '../controllers/auth.controller.js' ; 
import { verifyEmail, verifyWarden } from '../controllers/verify.controller.js';
import { logout,RegisterAdmin } from '../controllers/auth.controller.js' ; 
import { emailverificationbyuserforadmin } from "../controllers/AdminEmailverificationby.js";
import { LoginAdmin } from '../controllers/auth.controller.js';
import {checkAuthorizedEmail} from '../middlewares/checkAdminEmail.js';
const router = express.Router() ;

router.post("/register", registerUser) ;
router.get('/verify-email', verifyEmail);
router.get('/verify-warden', verifyWarden);

router.post("/login", loginUser) ;
router.post("/logout", logout) ;
router.post("/register-admin",checkAuthorizedEmail, RegisterAdmin);
router.get('/verify/user',emailverificationbyuserforadmin);
router.post('/login-admin',LoginAdmin);



export default router ;