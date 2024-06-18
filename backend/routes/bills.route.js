import express from 'express'
import User  from '../models/user.model.js';
import { AdminauthMiddleWare } from '../middlewares/AdminAuthMiddleware.js';
import {authMiddleWare} from '../middlewares/authMiddleware.js';
const router = express.Router();
import {billForALL,billForOne,billForStudent} from "../controllers/billcalculation.controller.js"
import {updateBill,checkEntry,checkEntryForFestival,updateFestCharge} from "../controllers/billPerDay.controller.js"
router.get('/',billForALL );
router.get('/:registrationNumber',AdminauthMiddleWare,billForOne);
router.post('/studentbill',authMiddleWare,billForStudent)
router.post('/update-billPerDay',AdminauthMiddleWare,updateBill);
router.post('/check-entry',checkEntry);
router.post('/check-fest',checkEntryForFestival);
router.post('/update-fest',updateFestCharge);
  export default router;