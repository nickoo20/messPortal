import express from 'express';
import { getAllStudents } from '../controllers/allStudents.controller.js';
import { AdminauthMiddleWare } from '../middlewares/AdminAuthMiddleware.js';
const router=express.Router();
router.get('/',AdminauthMiddleWare,getAllStudents);
export default router;