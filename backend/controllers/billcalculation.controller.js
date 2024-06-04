import User from '../models/user.model.js';
import {LeaveModel} from '../models/Leave.model.js';
// Function to calculate bill for a student for a given month based on days present
const billForALL=async (req, res) => {
    const { month, year,billPerDay } = req.query;
  
    try {
      // Call calculateBillForStudent function for each student to calculate bills
      const students=await User.find();
      const bills = await Promise.all(
        // Assuming students collection in your database
        students.map(async student => {
          const totalBill = await calculateBillForStudent(student.registrationNumber, month, year,billPerDay);
          return { studentId: student.registrationNumber, studentName: student.name, totalBill };
        })
      );
  
      res.json({ bills });
    } catch (error) {
      console.error('Error fetching bills:', error);
      res.status(500).json({ error: 'An error occurred while fetching bills' });
    }
  };
  //router.get('/',calculateBillForStudent);
  const billForOne= async (req, res) => {
    const {registrationNumber}=req.params;
    console.log(registrationNumber)
    const { month, year ,billPerDay} = req.query;
  
    try {
      // Call calculateBillForStudent function for each student to calculate bills
      const student=await User.findOne({registrationNumber});
      if(!student)
      return res.status(404).json({ message: 'User not found' });
      const bill=await calculateBillForStudent(student.registrationNumber,month,year,billPerDay);
      // const bills = await Promise.all(
      //   // Assuming students collection in your database
      //   students.map(async student => {
      //     const totalBill = await calculateBillForStudent(student.registrationNumber, month, year);
      //     return { studentId: student.registrationNumber, studentName: student.name, totalBill };
      //   })
      // );
     
      res.json({ bill });
    } catch (error) {
      console.error('Error fetching bills:', error);
      res.status(500).json({ error: 'An error occurred while fetching bills' });
    }
  };
const calculateBillForStudent = async (studentId, month, year,billPerDay) => {
    try {
        // Find leave records for the specified student and month
        const leaveRecords = await LeaveModel.find({
            studentId,
            startDate: { $gte: new Date(year, month - 1, 1) }, // Start of month
            endDate: { $lte: new Date(year, month - 1, 31, 23, 59, 59) } // End of month
        });

        // Calculate total days in the month
        const totalDaysInMonth = new Date(year, month, 0).getDate();

        // Calculate total leave duration in days
        let totalLeaveDays = 0;
        leaveRecords.forEach(leave => {
            // Calculate duration of leave in days
            const durationInDays = Math.ceil((leave.endDate - leave.startDate) / (1000 * 60 * 60 * 24));
            totalLeaveDays += durationInDays;
        });

        // Calculate total days present (days when student is not on leave)
        const totalDaysPresent = totalDaysInMonth - totalLeaveDays;

        // Calculate bill based on number of days present
        //const billingRatePerDay = 50; // Adjust with your billing rate
        const totalBill = totalDaysPresent * billPerDay;

        return totalBill;
    } catch (err) {
        console.error('Error calculating bill:', err);
        throw err;
    }
};







export {billForALL,billForOne};