import Complaint from "../models/complaint.model.js" ;

// Upvote a complaint
export const upVote = async(req, res) => {
    try{
        const complaint = await Complaint.findById(req.params.id) ;
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        // Remove from downvotes if exists
        complaint.downvotes = complaint.downvotes.filter(user => user.toString() !== req.user.id) ;

        // Add to upvote if not already present!
        if(!complaint.upvotes.includes(req.user.id)){
            complaint.upvotes.push(req.user.id) ;
        }
        else{
            return res.status(400).json({ message: 'You have already upvoted this complaint' });
        }

        await complaint.save() ;
        return res.status(200).json(complaint) ;
    }catch(err){
        console.log(`Error in upvote Controller, ${err.message}`) ;
        return res.status(500).json({
            error:"Internal Server Error!",
        }) ;
    }
}

// Downvote a complaint
export const downVote = async(req, res) => { 
    try{
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
         // Remove from upvotes if exists
        complaint.upvotes = complaint.upvotes.filter(user => user.toString() !== req.user.id) ;

         // Add to downvotes if not already present
        if (!complaint.downvotes.includes(req.user.id)) {
            complaint.downvotes.push(req.user.id) ;
        } else {
            return res.status(400).json({ message: 'You have already downvoted this complaint' }) ;
        }
    
        await complaint.save() ;
        return res.status(200).json(complaint) ;
    }catch(err){
        console.error(error.message);
        return res.status(500).json({
            error :  'Server Error',
        }) ; 
    }
}
