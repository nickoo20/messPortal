import User from "../models/user.model.js";
import { LeaveModel as Leave } from "../models/leave.model.js";

const markleave = async (req, res) => {
  try{
    
  const { startDate,endDate } = req.body;
  if(startDate>endDate)
  return res.status(400).json({message:"Start date can't be after End date"});
  const registrationNumber=parseInt(req.body.registrationNumber,10);
   console.log(registrationNumber)
  const user = await User.findOne({registrationNumber});
  if (!user) {
    return res.status(404).json({ message: "Student not found" });
  }
  const existing=await Leave.find({registrationNumber});
  
  const newstartDate = new Date(startDate);
  const newendDate = new Date(endDate);
  
  for(let leave of existing){
    
  if((leave.startDate<=newstartDate&&leave.endDate>=newstartDate)||(leave.startDate<=newendDate&&leave.endDate>=newendDate)||(newstartDate<=leave.startDate&&newendDate>=leave.endDate))
  return res.status(400).json({message:"Start date and end date are overlapping with a preexisting entry of the student"});
  }
  const leave = new Leave({
    registrationNumber: user.registrationNumber,
    startDate: startDate,
    endDate: endDate,
  });
  await leave.save();
  res.status(200).json({ message: 'Leave marked successfully' });
}catch(err){
  res.status(500).json({message:"an error occured"});
}
};
export {markleave};
