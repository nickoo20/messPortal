import Complaint from "../models/complaint.model";

// Create a new complaint and assign it to a warden
export const createComplaint = async(req, res) => {
    try{
        const {title, description} = req.body ;
        const newComplaint = new Complaint({
            title,
            description,
            createdBy:  req.user.id,
            handledBy:  req.wardenId,   // Assigned warden
        }) ;

        await newComplaint.save() ;
        return res.status(201).json(newComplaint) ;
    }catch(err){
        console.log(`Error in complaint Controller!, ${err.message}`) ; 
        return res.status(500).json({
            error: 'Internal Server Error!',
        }) ;  
    }
}

// Comment on a complaint
export const commentController = async(req, res) => { 
    try{
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        const {text} = req.body ;
        const comment = {
            user: req.user.id, 
            text
        } ; 
        complaint.comments.push(comment); 
        await complaint.save() ;
        return res.status(200).json(complaint) ;

    }catch(err){
        console.log(`Error in comment Controller!, ${err.message}`) ; 
        return res.status(500).json({
            error: 'Internal Server Error!',
        }) ; 
    }
}

// Resolve or escalate a complaint (warden only) 

// Resolve a Complaint
export const resolveComplaint = async(req, res) => {
    try{
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        // Only a warden can resolve a complaint!
        if(complaint.handledBy.toString() !== req.user.id){
            return res.status(403).json({ message: "Not authorized" });
        }

        complaint.status="resolved"; 
        await complaint.save();

        return res.status(200).json({ message: "Complaint resolved successfully", complaint }) ;

    }catch(err){
        console.log(`Error in Resolve Complaint Controller!, ${err.message}`) ; 
        return res.status(500).json({
            error: 'Internal Server Error!',
        }) ;  
    }
}

