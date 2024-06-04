import Complaint from "../models/complaint.model.js";

// Upvote a complaint
export const upvoteComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findById(complaintId);
    const userId = req.user._id;

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const userUpvoted = complaint.upvotes.includes(userId);
    if (userUpvoted) {
      // Remove the upvote
      await Complaint.updateOne(
        { _id: complaintId },
        { $pull: { upvotes: userId } }
      );
      const updatedVotes = complaint.upvotes.filter((id) => (
        id.toString() !== userId.toString()
      ));
      return res.status(200).json({
        message: "Upvote removed!",
        updatedVotes,
      });
    } else {
      const userDownvoted = complaint.downvotes.includes(userId);
      if (userDownvoted) {
        // Remove the downvote if the user had downvoted before
        await Complaint.updateOne(
          { _id: complaintId },
          { $pull: { downvotes: userId } }
        );
      }

      // Add the upvote
      complaint.upvotes.push(userId);
      await complaint.save();
      const updatedVotes = complaint.upvotes;
      return res.status(200).json({
        message: 'Upvoted successfully!',
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

// Downvote a complaint
export const downvoteComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findById(complaintId);
    const userId = req.user._id;

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const userDownvoted = complaint.downvotes.includes(userId);
    if (userDownvoted) {
      // Remove the downvote
      await Complaint.updateOne(
        { _id: complaintId },
        { $pull: { downvotes: userId } }
      );
      const updatedVotes = complaint.downvotes.filter((id) => (
        id.toString() !== userId.toString()
      ));
      return res.status(200).json({
        message: "Downvote removed!",
        updatedVotes,
      });
    } else {
      const userUpvoted = complaint.upvotes.includes(userId);
      if (userUpvoted) {
        // Remove the upvote if the user had upvoted before
        await Complaint.updateOne(
          { _id: complaintId },
          { $pull: { upvotes: userId } }
        );
      }

      // Add the downvote
      complaint.downvotes.push(userId);
      await complaint.save();
      const updatedVotes = complaint.downvotes;
      return res.status(200).json({
        message: "Downvoted successfully",
        updatedVotes,
      });
    }
  } catch (err) {
    console.log(`Error in downvote Controller, ${err.message}`);
    return res.status(500).json({
      error: "Internal Server Error!",
    });
  }
};