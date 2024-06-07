import express from 'express';

import {makeStudentRepresentative,removeStudentRepresentative,findALLMr} from '../controllers/StudentRepresentative.js';
const router=express.Router();

router.patch("/add/:registrationNumber",makeStudentRepresentative);
router.patch('/remove/:registrationNumber',removeStudentRepresentative);
// router.get("/add/0832",async(req,res)=>{
//     try {
//         console.log("in the get");
//     res.send("get is working");
//     } catch (error) {
//         console.log(error);

//     }
    
// })
router.get('/all',findALLMr);
export default router;
