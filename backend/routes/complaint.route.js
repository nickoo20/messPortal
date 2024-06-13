import express from 'express' ;
import { authMiddleWare } from '../middlewares/authMiddleware.js' ;
import { createComplaint,patchComplaint, commentOnComplaint, deleteComplaint, deleteComment ,
<<<<<<< HEAD
resolveComplaint, escalateComplaint, getMyComplaints, getAllComplaints,getAllComplaintsAdmin,
seeComments} from '../controllers/complaint.controller.js';
=======
resolveComplaint, escalateComplaint, getMyComplaints, getAllComplaints,getAllComplaintsAdmin} from '../controllers/complaint.controller.js';
>>>>>>> d4c00c63ad2c7ea03a890bc72c397b4e0343011d
import { downvoteComplaint, upvoteComplaint } from '../controllers/vote.controller.js';
import {AdminauthMiddleWare} from '../middlewares/AdminAuthMiddleware.js'
const router = express.Router() ;


// Create a complaint and assign it to a warden
router.post('/create',authMiddleWare, createComplaint) ;

router.get('/my/:id',authMiddleWare, getMyComplaints) ;
router.get('/all', authMiddleWare,getAllComplaints) ;

// Vote for a complaint
router.post('/upvote/:complaintId', authMiddleWare, upvoteComplaint) ;
router.post('/downvote/:complaintId', authMiddleWare, downvoteComplaint) ;

// Comment on a complaint
router.post('/comment/:complaintId',authMiddleWare, commentOnComplaint) ;
// Delete comment on complaint
router.delete('/comment/:complaintId/:commentId',authMiddleWare,deleteComment) ;
<<<<<<< HEAD
// See comments
router.get('/comment/:complaintId',authMiddleWare,seeComments) ;
=======
>>>>>>> d4c00c63ad2c7ea03a890bc72c397b4e0343011d

// Delete a complaint
router.delete("/delete/:complaintId", authMiddleWare, deleteComplaint) ;

// Resolve a complaint
router.put('/resolve/:complaintId',authMiddleWare, resolveComplaint) ; 

// Route to escalate a complaint
router.put("/escalate/:complaintId", AdminauthMiddleWare ,escalateComplaint) ;

//router.put('/:id/resolve',authMiddleWare, resolveComplaint) ; 
router.get("/",AdminauthMiddleWare,getAllComplaintsAdmin);
router.patch("/:id",patchComplaint);

export default router ; 
