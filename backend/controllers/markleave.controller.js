import User from "../models/user.model.js";
import { LeaveModel as Leave } from "../models/Leave.model.js";

export const markleave = async (req, res) => {
  const { startDate, endDate } = req.body;
  const registrationNumber = parseInt(req.body.registrationNumber, 10);
  console.log(registrationNumber);
  const user = await User.findOne({ registrationNumber });
  if (!user) {
    return res.status(404).json({ message: "Student not found" });
  }
  const leave = new Leave({
    registrationNumber: user.registrationNumber,
    startDate: startDate,
    endDate: endDate,
  });
  await leave.save();
  return res.status(200).json({ message: "Leave marked successfully", success: true });
};
