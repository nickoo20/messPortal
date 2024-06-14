import express from 'express' ;
import { verifySelfWardenEmail, verifyWardenByDsw } from '../controllers/verify.controller.js';
import { LoginWarden, RegisterWarden } from '../controllers/auth.controller.js';

const router=express.Router(); 

router.post('/register-warden', RegisterWarden) ; 
router.post('/login-warden', LoginWarden) ; 

router.get('/verify-email', verifySelfWardenEmail) ;
router.get('/verify-dsw',verifyWardenByDsw) ;

export default router;  