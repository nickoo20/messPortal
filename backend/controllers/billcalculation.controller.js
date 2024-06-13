import User from '../models/user.model.js';
import {LeaveModel} from '../models/Leave.model.js';
import Decimal from 'decimal.js';
import FestCharge from '../models/FestivalCharge.model.js';
//import { billPerDay } from '../models/billUpdate.model.js';
import moment from 'moment';
import { billUpdate } from '../models/billUpdate.model.js';
// Function to calculate bill for a student for a given month based on days present
const billForALL=async (req, res) => {
    const { month, year } = req.query;
   const bills=await billUpdate.findOne({month,year});
   let billPerDay=0;
   let serviceCharge=0;
   if(!bills)
   {billPerDay=97.91;
    serviceCharge=200;
   }
   else
   {billPerDay=bills.billPerDay;
    serviceCharge=bills.serviceCharge;
   }
   

    try {
      const students=await User.find();
      const bills = await Promise.all(
        students.map(async student => {
          const finalbill = await calculateBillForStudent(student.registrationNumber, month, year,billPerDay,serviceCharge);
          const totalbill=finalbill.totalbill;
          const festivalcharges=finalbill.festCharges;
          const festival=finalbill.festival;
          return { studentId: student.registrationNumber, studentName: student.name,totalbill,serviceCharge,festivalcharges,festival };
        })
      );
      res.json({ bills });
    } catch (error) {
      console.error('Error fetching bills:', error);
      res.status(500).json({ error: 'An error occurred while fetching bills' });
    }
  };

  //for one student

  const billForOne= async (req, res) => {
    let {registrationNumber}=req.params;

    const { month, year } = req.query;
    const bills=await billUpdate.findOne({month,year});
   let billPerDay=0;
   let serviceCharge=0;
   if(!bills)
   {billPerDay=97.91;
    serviceCharge=200;
   }
   else
   {billPerDay=bills.billPerDay;
    serviceCharge=bills.serviceCharge;
   }
    try {
      registrationNumber=parseInt(registrationNumber,10);
      const student=await User.findOne({registrationNumber});
      if(!student)
      return res.status(404).json({ message: 'User not found' });
      const finalbill=await calculateBillForStudent(student.registrationNumber,month,year,billPerDay,serviceCharge);

      const festivalCharge=finalbill.festCharges;
      const festival=finalbill.festival;
      const totalbill=finalbill.totalbill;

     
      res.json({studentId: student.registrationNumber, studentName: student.name, totalbill ,serviceCharge,festivalCharge,festival});
    } catch (error) {
      console.error('Error fetching bills:', error);
      res.status(500).json({ error: 'An error occurred while fetching bills' });
    }
  };
const calculateBillForStudent = async (studentId, month, year,billPerDay,extraCharge) => {
    
    const startDate = moment(`${year}-${month}-01`);
    const endDate = startDate.clone().endOf('month');
    const totalDays = endDate.date();
   
    const leaves = await LeaveModel.find({
        registrationNumber: studentId,
        startDate: { $gte: startDate.toDate(), $lte: endDate.toDate() }
    });
     const festvalues=await FestCharge.findOne({month,year,registrationNumber:studentId});
     
     let festCharges=0;
     let festival="N/A";
     if(festvalues)
     {festCharges=festvalues.charge;
      festival=festvalues.festival;
     }


    let totalLeaveDays = 0;
    leaves.forEach(leave => {
        const leaveStart = moment(leave.startDate).isBefore(startDate) ? startDate : moment(leave.startDate);
        const leaveEnd = moment(leave.endDate).isAfter(endDate) ? endDate : moment(leave.endDate);
        const leaveDays = leaveEnd.diff(leaveStart, 'days') + 1;
        totalLeaveDays += leaveDays;
    });

    
    let bill=new Decimal(totalDays).minus(totalLeaveDays).times(billPerDay).toFixed(2);
    bill=parseInt(bill,10);
    
    const totalbill=parseInt(bill,10)+parseInt(extraCharge,10)+parseInt(festCharges,10);
    //console.log(totalbill)
    const finalbill={
      totalbill,
      festCharges,
      festival
    }
    return finalbill;
};







export {billForALL,billForOne};