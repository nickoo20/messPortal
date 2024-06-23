import express from 'express';
import { getGlobalSettings, updateGlobalSettings } from '../controllers/toggleHostelChange.controller.js';
const router=express.Router();
router.get("/",getGlobalSettings)
router.put("/",updateGlobalSettings)
export default router;