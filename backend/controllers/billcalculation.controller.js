import User from '../models/user.model.js';
import {LeaveModel} from '../models/leave.model.js';
import {StudentBill} from '../models/studentBill.model.js';
import Decimal from 'decimal.js';
import FestCharge from '../models/FestivalCharge.model.js';
//import { billPerDay } from '../models/billUpdate.model.js';
import moment from 'moment';
import { billUpdate } from '../models/billUpdate.model.js';
// Function to calculate bill for a student for a given month based on days present
const billForALL=async (req, res) => {
    let { month, year ,HostelName} = req.query;
    const hostelName=HostelName;
    //console.log(extraCharge)
    
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
      const students=await User.find({hostelName});
      const bills = await Promise.all(
        students.map(async student => {
          const existing =await StudentBill.findOne({registrationNumber:student.registrationNumber,month,year});
          if(existing){
            console.log(true);
            console.log(existing)
         return existing;
          }
          const finalbill = await calculateBillForStudent(student.registrationNumber, month, year,billPerDay,serviceCharge);
          const totalbill=finalbill.totalbill;
          const festivalcharges=finalbill.festCharges;
          const festival=finalbill.festival;
          const entry=new StudentBill({registrationNumber:student.registrationNumber,studentName: student.name,year,month,totalbill,billPerDay,serviceCharge,festivalcharges,festival })
          //return { studentId: student.registrationNumber, studentName: student.name,totalbill,serviceCharge,festivalcharges,festival };
          entry.save();
          //console.log(entry);
          //entry.billPerDay=billPerDay;
          //await entry.save();
          
          return entry;
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
    //console.log("in the controller")
    let {registrationNumber}=req.params;
    console.log(registrationNumber)
    let { month, year} = req.query;
    
    
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
      //console.log(reg);
      if(!student)
      return res.status(404).json({ message: 'User not found' });
      const existing =await StudentBill.findOne({registrationNumber:registrationNumber,month,year});
          if(existing){
            console.log(true);
            console.log(existing)
         return res.json({existing});
          }
      const finalbill=await calculateBillForStudent(student.registrationNumber,month,year,billPerDay,serviceCharge);

      const festivalCharge=finalbill.festCharges;
      const festival=finalbill.festival;
      const totalbill=finalbill.totalbill;
      const entry=new StudentBill({registrationNumber,studentName: student.name,year,month,totalbill,billPerDay,serviceCharge,festivalcharges:festivalCharge,festival })
      //return { studentId: student.registrationNumber, studentName: student.name,totalbill,serviceCharge,festivalcharges,festival };
      entry.save();
      res.json({entry});
     
    } catch (error) {
      console.error('Error fetching bills:', error);
      res.status(500).json({ error: 'An error occurred while fetching bills' });
    }
  };
   const billForStudent= async (req, res) => {
     try {
      const {month,year}=req.body;
      const bills=await billUpdate.findOne({month,year});
      let billPerDay=0;
      //let serviceCharge=0;
      if(!bills)
      {billPerDay=97.91;
       //serviceCharge=200;
      }
      else
      {billPerDay=bills.billPerDay;
       //serviceCharge=bills.serviceCharge;
      }
      let {registrationNumber}=req.user;
      console.log(registrationNumber)
      registrationNumber=parseInt(registrationNumber,10)
      
      const data=await StudentBill.findOne({registrationNumber,month,year});
      console.log(data)
      if(data)
      {
        data.billPerDay=billPerDay;
        return res.status(200).json({data});
  
      }
      return res.status(404).json({message:"Your bill has not been calculated yet"});
     } catch (error) {
       res.status(500).json({error:error.message})
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







export {billForALL,billForOne,billForStudent};