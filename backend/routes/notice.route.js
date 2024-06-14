import express from 'express';
import { createNotice , getAllNotice,deleteNotice} from '../controllers/notice.controller.js';
import { authMiddleWare } from '../middlewares/authMiddleware.js';
const router=express.Router();
router.post("/",authMiddleWare,createNotice);
router.get("/",authMiddleWare,getAllNotice);
router.delete("/delete/:id",deleteNotice);
export default router;

