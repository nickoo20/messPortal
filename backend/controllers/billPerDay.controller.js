
import { billUpdate } from "../models/billUpdate.model.js";
import FestCharge from "../models/FestivalCharge.model.js";
import User from "../models/user.model.js";
const updateBill=async(req,res)=>{
    try {
        
        const {month,year,billPerDay,serviceCharge}=req.body;
        console.log(month);
        if(!month||!year||!billPerDay)
        return res.status(400).json({error:"All feilds are required"});
        await billUpdate.deleteOne({month,year});
         const newentry = new billUpdate({month,year,billPerDay,serviceCharge});
        await newentry.save();
        
        res.status(201).json({ message: 'Bill per day entry created successfully' });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
 

        
    }
}
const checkEntry=async (req, res) => {
    const { month,year,billPerDay,serviceCharge } = req.body;
  
    try {
      const existingEntry = await billUpdate.findOne({ month,year });
  
      if (existingEntry) {
        return res.status(200).json({ exists: true });
      }
     
     
      const newEntry =  new billUpdate({ month,year,billPerDay ,serviceCharge});
      await newEntry.save();
      res.status(201).json({ message: 'Entry created successfully' });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
const checkEntryForFestival=async (req, res) => {
  
    try {
        const { month,year,festival,charge} = req.body;
        const registrationNumber=parseInt(req.body.registrationNumber,10);

        const user=await User.findOne({registrationNumber});
        if(!user)
        return res.status(404).json({message:"User not found"});

      const existingEntry = await FestCharge.findOne({ month,year,festival,registrationNumber });
  
      if (existingEntry) {
        return res.status(200).json({ exists: true });
      }
     
     
      const newEntry =  new FestCharge({ month,year,festival,registrationNumber,charge});
      await newEntry.save();
      res.status(201).json({ message: 'Entry created successfully' });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const updateFestCharge=async(req,res)=>{
    try {
        const {month,year,festival,charge}=req.body;
        const registrationNumber=parseInt(req.body.registrationNumber,10);
        console.log(registrationNumber)
        const user=await User.findOne({registrationNumber});
        if(!user)
        return res.status(404).json({message:"User not found"});

        await FestCharge.deleteOne({month,year,festival,registrationNumber});
        const newentry= new FestCharge({ month,year,festival,registrationNumber,charge});
        newentry.save();
        res.status(201).json({ message: 'Entry created successfully' });


    } catch (error) {
        res.status(500).json({ error: error.message });

    }
  }
  
export  {updateBill,checkEntry,updateFestCharge,checkEntryForFestival};