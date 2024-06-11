//import AsyncErrorHandler from "../error/CatchAsyncError.js";
//import Errorhandler from "../error/errorClass.js";
import moment from "moment";

import { ExpenseModel as Expense } from "../models/expense.model.js";

const newExpense =async (req, res, next) => {
    try{
        console.log(req);
  const {
    HostelName,
    title,
    amount,
    category,
    description,

    date,
  } = req.body;

  if (!HostelName) {
    return res.status(400).json({Error:"All fields are required"});
  }
  if (!title) {
    return res.status(400).json({Error:"All fields are required"});
  }
  if (!amount) {
    return res.status(400).json({Error:"All fields are required"});  }
  if (!category) {
    return res.status(400).json({Error:"All fields are required"});  }
  if (!description) {
    return res.status(400).json({Error:"All fields are required"});  }
//   if (!transactionType) {
//     return next(new Errorhandler("transactionType is Required", 400));
//   }
  if (!date) {
    return res.status(400).json({Error:"All fields are required"});  

  }
 
  const exp = await Expense.create({
    HostelName,
    title,
    amount,
    category,
    description,
    
    date,
  });
  res.status(200).json({
    success: true,
    message: "Created Successfully!",
    exp,
  });
}
catch(err){
    res.status(500).json({err:err.message});
}
};

const getAllExpense = async (req, res, next) => {
    try{
  const exp = await Expense.find({}).sort({ date: -1 , _id: -1 });
  res.status(200).json({
    success: true,
    message: "Fetched Successfully!",
    exp,
  });
}catch(err){
    res.status(500).json({err:err.message});

}
};

// const singleExpense = AsyncErrorHandler(async (req, res, next) => {
//   const { expID } = req.params;
//   const exp = await Expense.findById(expID).populate("content");

//   res.status(200).json({
//     success: true,
//     message: "Fetched successfully!",
//     exp,
//   });
// });

const deleteExpense = async (req, res, next) => {
    try{
  const { id } = req.params;

  const exp = await Expense.findByIdAndDelete(id);

  if (!exp) {
    return next(new Errorhandler("Expense not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Deleted Successfully!",
  });
}catch(err){
    res.status(500).json({err:err.message});

}
};

const getSingleHostelExpense = async (req, res) => {
    try{
    console.log(req)
  const { searchHostelName } = req.body;
  console.log(searchHostelName)
  if (!searchHostelName) {
    return next(new Errorhandler("HostelName is Required", 400));
  }
  const query = { HostelName: searchHostelName };

  
    const exp = await Expense.find({ HostelName: searchHostelName }).sort({ date: -1 , _id: -1 });
    res.status(200).json({
      success: true,
      message: "Fetched Successfully!",
      exp,
    });
//   else {
//     query.date = {
//       $gt: moment().subtract(dateSpan, "days").toDate(),
//     };

    // const exp = await Expense.find(query);
    // res.status(200).json({
    //   success: true,
    //   message: "Fetched Successfully!",
    //   exp,
    // });
  //}
} catch(err){
    res.status(500).json({err:err.message});

}
};

export {
  newExpense,
  getAllExpense,
  //singleExpense,
  deleteExpense,
  getSingleHostelExpense,
};
