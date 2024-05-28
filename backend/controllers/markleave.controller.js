import User from '../models/user.model.js';
import {LeaveModel as Leave} from '../models/Leave.model.js';
import cors from 'cors';

const markleave = async (req, res) => {
    console.log("in the cintroller")
    console.log(req.body)
  const { registrationNumber,startDate,endDate } = req.body;
   console.log(registrationNumber)
  const user = await User.findOne({registrationNumber});
  if (!user) {
    return res.status(404).json({ message: 'Student not found' });
  }
  const leave = new Leave({
    registrationNumber: user.registrationNumber,
    startDate:startDate,
    endDate:endDate,
     
  });
  await leave.save();
  res.status(200).json({ message: 'Leave marked successfully' });
};
export {markleave};