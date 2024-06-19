import Complaint from "../models/complaint.model.js";
// import User from "../models/user.model.js";
import { sendEmail } from "../utils/emailConfig.js";
// import {errorHandler} from '../utils/error.js' ;

// Create a new complaint and assign it to a warden
export const createComplaint = async (req, res) => {
  try {
    // ADD IMAGE ALSO FEATURE!
    const { title, description } = req.body;
    const user = req.user;
    const whoCreated = user;
    // console.log('User: ', req.user) ;
    // console.log(createdBy) ;
    const newComplaint = new Complaint({
      title,
      description,
      createdBy: whoCreated,
    });
    await newComplaint.save();
    return res.status(201).json(newComplaint);
  } catch (err) {
    console.log(`Error in complaint Controller!, ${err.message}`);
    return res.status(500).json({
      error: "Internal Server Error!",
    });
  }
};

// Comment on a complaint
export const commentOnComplaint = async (req, res) => {
  try {
    const { text } = req.body;
    const { complaintId } = req.params;
    // const userId = req.user._id ;
    if (!text) {
      return res.status(400).json({
        error: "Text is required!",
      });
    }
    const complaint = await Complaint.findById(complaintId).populate({
      path:"comments.user",
      select: "name email "
    });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    const comment = {
      user: req.user._id,
      text,
      createdAt: new Date(),
    };
    complaint.comments.push(comment);
    await complaint.save();
    return res.status(200).json(complaint) ;
  } catch (err) {
    console.log(`Error in comment Controller!, ${err.message}`);
    return res.status(500).json({
      error: "Internal Server Error!",
    });
  }
}; 

export const seeComments = async(req, res) => { 
  try{  
      const {complaintId} = req.params ;
      const complaint = await Complaint.findById(complaintId) ;
      if(!complaint){
        return res.status(404).json({
          message: 'Complaint not found!' ,
        }) ;
      }
      const comments = complaint.comments ;
      return res.status(200).json(comments) ;
  }catch(err){
    console.log('Error in getting comments: ', err.message) ; 
  }
}

// Delete a comment on Complaint
export const deleteComment = async(req, res)=>{
  try {
    const { complaintId, commentId } = req.params;
    // Find the complaint by ID
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Find the index of the comment to be deleted
    const commentIndex = complaint.comments.findIndex(comment => comment._id.toString() === commentId);

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment from the array
    complaint.comments.splice(commentIndex, 1);

    // Save the updated complaint document
    await complaint.save();
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.log('Error while deleting comment!', err.message);
    return res.status(500).json({ message: 'Internal server error while deleting comments!' });
  }
}

// Delete a complaint
export const deleteComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({
        error: "Complaint not found!",
      });
    }
    console.log(req.user._id);
    console.log(complaint.createdBy);
    if (req?.user._id.toString() !== complaint?.createdBy.toString()) {
      return res.status(400).json({
        error: "You can only delete your own complaint.",
      });
    }
    await Complaint.findByIdAndDelete(complaintId);
    return res.status(200).json({
      message: "Complaint deleted successfully!",
    });
  } catch (err) {
    console.log(`Error in delete Complaint Controller!, ${err.message}`);
    return res.status(500).json({
      error: "Internal Server Error!",
    });
  }
};
// Get My Complaints
export const getMyComplaints = async (req, res, next) => {
  console.log(req.user);
  console.log(req.params.id);
  
  if (req.user._id.toString() !== req.params.id) {
    return res.status(500).json('You can only view your own complaints!');
  }
  
  try {
    const complaints = await Complaint.find({ createdBy: req.params.id })
      .populate({
        path: "createdBy",
        select: "name email hostelName",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

// Get All complaints
export const getAllComplaints = async (req, res) => {
  try {
    // Ensure req.user is defined
    if (!req.user) {
      return res.status(403).json({
        success: false,
        message: "User information is missing in the request.",
      });
    }

    // Fetch all complaints sorted by createdAt in descending order and populate createdBy and comments.user fields
    const complaints = await Complaint.find({})
      .sort({ createdAt: -1 })
      .populate({
        path: 'createdBy',
        select: 'name email hostelName', // select the fields you want from User
      })
      .populate({
        path: 'comments.user',
        select: 'name email', // select the fields you want from User
      });

    // Log complaints to verify if `createdBy` is populated correctly
    console.log(complaints);

    // Filter complaints with status "pending" or "escalated" and match hostelName with req.user.hostelName
    const filteredComplaints = complaints.filter(
      (complaint) =>
        (complaint.status === 'pending' || complaint.status === 'escalated') 
      &&
        complaint.createdBy?.hostelName === req.user.hostelName
    );

    res.status(200).json({
      success: true,
      complaints: filteredComplaints,
      message: "Fetched Successfully!",
    });
  } catch (err) {
    console.error("Error in All complaints controller", err.message);
    return res.status(500).json({
      success: false,
      message: "Error fetching complaints",
      error: err.message,
    });
  }
};



// Resolve or escalate a complaint (warden only)
// Resolve a Complaint
export const resolveComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findById(complaintId);
    const user = req.user;

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    // Check if the user is a warden
    if (req.user.role !== "warden") {
      return res
        .status(403)
        .json({ message: "You are not authorized to resolve complaints" });
    }

    complaint.status = "resolved";
    await complaint.save() ;
    return res
      .status(200)
      .json({ message: "Complaint resolved successfully", complaint });
  } catch (err) {
    console.log(`Error in Resolve Complaint Controller!, ${err.message}`);
    return res.status(500).json({
      error: "Internal Server Error!",
    });
  
  }
}
export const getAllComplaintsAdmin=async(req,res)=>{
         try{
        const comp = await Complaint.find({})
        .sort({createdAt:-1})
        .populate({
          path:'createdBy',
          select: 'hostelName' ,
        });
        const comp1=comp.filter((c)=>{
            return (c.status==='pending'||c.status==='escalated') 
            // (c.createdBy?.hostelName === req.user?.hostelName);
        });
        //console.log(comp1);
        res.status(200).json({
          success: true,
          message: "Fetched Successfully!",
          comp1,
        });
    }catch(err){
        console.log(err);
    }
      
}
export const patchComplaint=async(req,res)=>{
    const { id } = req.params;
  const { status } = req.body;
  // Check if the status is one of the allowed values
  const allowedStatuses = ['pending', 'resolved', 'escalated'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.status(200).json({ message: 'Complaint status updated successfully', complaint });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

    


export const escalateComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { comment } = req.body;
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
        // // Check if the user is a warden
        // if(user.role !== "warden") {
        //     return res.status(403).json({ message: 'You are not authorized to escalate complaints' });
        // }


    // Check if the user is a warden
    if (user.role !== "warden") {
      return res
        .status(403)
        .json({ message: "You are not authorized to escalate complaints" });
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    complaint.status = "escalated";
    await complaint.save();

    // Send email to DSW
    const emailSubject = `Escalated Complaint: ${complaint.title}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e2e2; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #f8f8f8; padding: 20px; text-align: center; border-bottom: 1px solid #e2e2e2;">
          <h2 style="color: #4CAF50;">Escalated Complaint</h2>
          <p style="font-size: 16px; color: #777;">Please address the following complaint urgently</p>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #333;"><strong>Complaint ID:</strong> ${complaint._id}</p>
          <p style="font-size: 16px; color: #333;"><strong>Title:</strong> ${complaint.title}</p>
          <p style="font-size: 16px; color: #333;"><strong>Description:</strong> ${complaint.description}</p>
          <p style="font-size: 16px; color: #333;"><strong>Warden Comment:</strong> ${comment}</p>
        </div>
        <div style="padding: 20px; background-color: #f8f8f8; border-top: 1px solid #e2e2e2;">
          <p style="font-size: 16px; color: #333;">Thank you for your attention to this matter.</p>
          <p style="font-size: 16px; color: #333; margin: 0;">Best regards,</p>
          <p style="font-size: 16px; color: #333; margin: 0;"><strong>${user.name}</strong></p>
          <p style="font-size: 16px; color: #333; margin: 0;">Warden</p>
        </div>
      </div>
    `;

    await sendEmail(emailSubject, emailHtml);

    return res.status(200).json({
      message: "Complaint escalated and email sent to DSW",
      complaint,
    });
  } catch (err) {
    console.log(`Error in escalate Complaint Controller!, ${err.message}`);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
