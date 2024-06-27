import express from 'express' ;
import { authMiddleWare } from '../middlewares/authMiddleware.js' ;
import { updateUser, getUser } from '../controllers/user.controller.js';
const router = express.Router() ;

router.post('/update/:id',authMiddleWare,updateUser) ;
router.get('/:id', authMiddleWare, getUser); 


export default router ;
