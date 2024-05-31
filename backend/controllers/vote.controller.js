import Complaint from "../models/complaint.model.js";

// Upvote a complaint
export const upvoteComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findById(complaintId);
    const userId = req.user._id;
    console.log(userId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    // let upvote=complaint.upvotes;
    // upvote
    const userUpvoted = complaint.upvotes?.includes(userId);
    console.log(userUpvoted);
    if (userUpvoted) {
      await Complaint.updateOne(
        { _id: complaintId },
        { $pull: { upvotes: userId } }
      );
      console.log(complaint.upvotes) ;
      const updatedVotes = complaint.upvotes.filter((id) => (
        id.toString() !== userId.toString()
      ));
      return res.status(200).json(updatedVotes);
    } else {
       await Complaint.findByIdAndUpdate({_id:userId},{$pull:{
        downvotes:userId,
       }}) ;
      complaint.upvotes.push(userId);
      await complaint.save();
      const updatedVotes = complaint.upvotes;
      return res.status(200).json({
        updatedVotes,
        message:'Upvoted successfully!',
    }) ;
    }
  } catch (err) {
    console.log(`Error in upvote Controller, ${err.message}`);
    return res.status(500).json({
      error: "Internal Server Error!",
    });
  }
};

// Downvote a complaint
export const downvoteComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params ;
        const complaint = await Complaint.findById(complaintId) ;
        const userId = req.user._id ;
        console.log(userId) ;

        if (!complaint) {
          return res.status(404).json({ message: "Complaint not found" });
        }
        // upvote
        const userDownvoted = complaint.downvotes?.includes(userId) ;
        console.log(userDownvoted) ;
        if (userDownvoted) {
          await Complaint.updateOne(
            { _id: complaintId },
            { $pull: { downvotes: userId } }
          ) ;
          console.log(complaint.downvotes) ;
          const updatedVotes = complaint.downvotes.filter((id) => (
            id.toString() !== userId.toString()
          ));
          return res.status(200).json({
            message: "Downvote removed!",
            updatedVotes,
          });
        } else {
            await Complaint.findByIdAndUpdate({_id:complaintId},{ $pull:{
                upvotes:userId,
            }}) ;
          complaint.downvotes.push(userId);
          await complaint.save();
          const updatedVotes = complaint.downvotes ; 
          return res.status(200).json({
            message: "Downvoted successfully",
            updatedVotes,
          });
        }
      } catch (err) {
        console.log(`Error in upvote Controller, ${err.message}`);
        return res.status(500).json({
          error: "Internal Server Error!",
        });
      }
};
