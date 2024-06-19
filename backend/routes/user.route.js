import express from 'express' ;
import { authMiddleWare } from '../middlewares/authMiddleware.js' ;
import { getUserProfile, updateUser } from '../controllers/user.controller.js';
const router = express.Router() ;

// router.put('/profile/password',authMiddleWare,updateUserPassword) ;
router.post('/update/:id',authMiddleWare,updateUser) ;


export default router ;
