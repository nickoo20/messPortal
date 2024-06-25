import express from 'express' ;
import { authMiddleWare } from '../middlewares/authMiddleware.js' ;
import { updateUser } from '../controllers/user.controller.js';
const router = express.Router() ;

router.post('/update/:id',authMiddleWare,updateUser) ;


export default router ;
