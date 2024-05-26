import express from 'express' ;
import { authMiddleWare } from '../middlewares/authMiddleware.js' ;
import { createComplaint, commentOnComplaint, deleteComplaint, resolveComplaint, escalateComplaint, getMyComplaints, getAllComplaints} from '../controllers/complaint.controller.js';
import { downvoteComplaint, upvoteComplaint } from '../controllers/vote.controller.js';


const router = express.Router() ;


// Create a complaint and assign it to a warden
router.post('/create',authMiddleWare, createComplaint) ;

router.get('/my', authMiddleWare, getMyComplaints) ;
router.get('/all', authMiddleWare, getAllComplaints) ;

// Vote for a complaint
router.post('/upvote/:complaintId', authMiddleWare, upvoteComplaint) ;
router.post('/downvote/:complaintId', authMiddleWare, downvoteComplaint) ;

// Comment on a complaint
router.post('/comment/:complaintId',authMiddleWare, commentOnComplaint) ;

// Delete a complaint
router.delete("/:complaintId", authMiddleWare, deleteComplaint) ;

// Route to escalate a complaint
router.put("/escalate/:complaintId", authMiddleWare, escalateComplaint) ;

// Resolve a complaint
router.put('/resolve/:complaintId',authMiddleWare, resolveComplaint) ; 


export default router ; 
