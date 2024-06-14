import express from 'express' ;
<<<<<<< HEAD
import { registerUser,loginUser, logout } from '../controllers/auth.controller.js' ; 
import {verifySelfUserEmail, verifyUserByWarden } from '../controllers/verify.controller.js' ;

const router = express.Router() ;

router.post('/logout-student',logout) ;
router.post("/register-student", registerUser) ;
router.post("/login-student", loginUser) ;
router.get('/verify-email', verifySelfUserEmail);
router.get('/verify-warden', verifyUserByWarden);

// router.post("/register-warden", RegisterWarden) ;
// router.get('/verify-selfWardenEmail', verifySelfWardenEmail) ;
// router.get('/verify-wardenByDsw', verifyWardenByDsw) ;
// router.post('/login-warden', LoginWarden) ;   
=======
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
>>>>>>> d4c00c63ad2c7ea03a890bc72c397b4e0343011d

router.post("/logout", logout) ;

export default router ;