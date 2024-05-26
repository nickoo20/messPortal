import Complaint from "../models/complaint.model.js" ; 

// Create a new complaint and assign it to a warden
export const createComplaint = async(req, res) => {
    try{
// ADD IMAGE ALSO FEATURE!
        const {title, description} = req.body ;
        const user = req.user ;
        const whoCreated = user ;
        // console.log('User: ', req.user) ;
        // console.log(createdBy) ;
        const newComplaint = new Complaint({
            title,
            description,
            createdBy:whoCreated,
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
export const commentOnComplaint = async(req, res) => { 
    try{
        const {text} = req.body; 
        const { complaintId } = req.params ;
        // const userId = req.user._id ;
        if (!text) {
            return res.status(400).json({
              error: "Text is required!",
            });
        }

        const complaint = await Complaint.findById(complaintId) ;

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        const comment = {
            user: req.user._id, 
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

// Delete a complaint
export const deleteComplaint = async(req, res) => {
    try{
        const {complaintId} = req.params ;
        const user = req.user ;
        if(!user){
            return res.status(404).json({
                message:'User not found!',
            }) ;
        }
        const complaint = await Complaint.findById(complaintId) ;
        if (!complaint) {
            return res.status(404).json({
              error: "Complaint not found!",
            });
        } 
        console.log(req.user._id) ;
        console.log(complaint.createdBy) ;
        if(req?.user._id.toString() !== complaint?.createdBy.toString()){
            return res.status(400).json({
                error: "You can only delete your own complaint.",
              });
        }
        await Complaint.findByIdAndDelete(complaintId) ;
        return res.status(200).json({
            message: "Complaint deleted successfully!",
          });

    }catch(err){
        console.log(`Error in delete Complaint Controller!, ${err.message}`) ; 
        return res.status(500).json({
            error: 'Internal Server Error!',
        }) ; 
    }
}

// Get My Complaints
export const getMyComplaints = async(req, res) =>{ 
    try{
        const user = req.user ; 
        const myComplaints = await Complaint.find({createdBy: user})  ;
        return res.status(200).json(myComplaints) ;
    }catch(err){
        console.log(`Error in Get My Complaint Controller!, ${err.message}`) ; 
        return res.status(500).json({
            error: 'Internal Server Error!',
        }) ; 
    }
}

// Get All complaints
export const getAllComplaints = async(req, res) => {
    try{
        const allComplaints = await Complaint.find({status:'pending'}); 
        return res.status(200).json(allComplaints) ; 
    }catch(err){
        console.log(`Error in get All Complaint Controller!, ${err.message}`) ; 
        return res.status(500).json({
            error: 'Internal Server Error!',
        }) ; 
    }
}

// Resolve or escalate a complaint (warden only) 

// Resolve a Complaint
export const resolveComplaint = async(req, res) => {
    try{
        

    }catch(err){
        console.log(`Error in Resolve Complaint Controller!, ${err.message}`) ; 
        return res.status(500).json({
            error: 'Internal Server Error!',
        }) ;  
    }
}

export const escalateComplaint = async(req, res) => {

}
