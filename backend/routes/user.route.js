import express from 'express' ;
import { authMiddleWare } from '../middlewares/authMiddleware.js' ;
import { getUserProfile, updateUserPassword } from '../controllers/user.controller.js';
const router = express.Router() ;

// router.put('/profile/password',authMiddleWare,updateUserPassword) ;
router.post('/update/:id',authMiddleWare,updateUserPassword) ;


export default router ;
