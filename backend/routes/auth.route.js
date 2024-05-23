import express from 'express' ;
import { login, logout, register } from '../controllers/auth.controller.js' ; 
// import { emailVerificationByStudent } from '../utils/verification.js';
import { body } from 'express-validator';

const router = express.Router() ;

const userValidationRules =[
    body("password")
    .isLength({min:8})
    .withMessage("Password must be 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage('Password must contain atleast one uppercase letter.')
    .matches(/[a-z]/)
    .withMessage('Password must contain atlest one lowercase letter')
    .matches(/\d/)
    .withMessage('Password must contain atleast one number')
    .matches(/[@$!%*?&#]/)
    .withMessage('Password must contain at least one special character')
] ;

router.post("/register", userValidationRules, register) ;
// router.get("/verify/user", emailVerificationByStudent) ;
router.post("/login", login) ;
router.post("/logout", logout) ;





export default router ;