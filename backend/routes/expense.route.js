import express from "express";


import {
  newExpense,
  getAllExpense,
  //singleExpense,
  deleteExpense,
  getSingleHostelExpense,
} from "../controllers/expense.controller.js";

const router = express.Router();

// creating new expense
router.post("/", newExpense);

// fetching all expenses
router.get("/",  getAllExpense);

// single expense
//router.get("/sigle-expense/:ExpID", singleExpense);

// deleting expense
router.delete("/delete-expense/:id",  deleteExpense);

router.post("/single-hostel-expense", getSingleHostelExpense);

export default router;
