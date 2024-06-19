import express from 'express' ;
import { verifySelfAdminEmail, verifyAdminByDsw } from '../controllers/verify.controller.js';
import { LoginAdmin, RegisterAdmin } from '../controllers/auth.controller.js';

const router=express.Router(); 

router.post('/register-admin', RegisterAdmin) ; 
router.post('/login-admin', LoginAdmin) ; 

router.get('/verify-email', verifySelfAdminEmail) ;
router.get('/verify-dsw',verifyAdminByDsw) ;

export default router;  