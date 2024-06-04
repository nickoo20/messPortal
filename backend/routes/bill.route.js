import express from 'express';
import { authMiddleWare, authorize } from '../middlewares/authMiddleware.js' ;
import { getCostPerDay, updateCostPerDay } from '../controllers/config.controller.js';

const router = express.Router() ;
router.get('/', authMiddleWare, getCostPerDay) ;
router.post('/', authMiddleWare, authorize('accountant'), updateCostPerDay) ;

export default router;