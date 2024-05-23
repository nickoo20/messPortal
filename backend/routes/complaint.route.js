import express from 'express' ;
import { authMiddleWare } from '../middlewares/authMiddleware.js' ;
import { createComplaint, commentController,resolveComplaint, escalateComplaint} from '../controllers/complaint.controller.js';
import { downVote, upVote } from '../controllers/vote.controller.js';
import {assignorCreateWarden} from '../middlewares/wardenMiddleware.js';
const router = express.Router() ;

// Create a complaint and assign it to a warden
router.post('/complaints',authMiddleWare, assignorCreateWarden, createComplaint) ;

// Vote for a complaint
router.post('/complaints/:id/upvote',authMiddleWare, upVote) ;
router.post('/complaints/:id/downvote',authMiddleWare, downVote) ;

// Comment on a complaint
router.post('/complaints/:id/coment',authMiddleWare, commentController) ;

// Route to escalate a complaint
router.put("/complaints/:id/escalate", authMiddleWare, escalateComplaint);

// Resolve a complaint
router.put('/complaints/:id/resolve',authMiddleWare, resolveComplaint) ; 


export default router ; 