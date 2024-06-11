import express from 'express'
import User  from '../models/user.model.js';
import { AdminauthMiddleWare } from '../middlewares/AdminAuthMiddleware.js';

const router = express.Router();
import {billForALL,billForOne} from "../controllers/billcalculation.controller.js"
import {updateBill,checkEntry,checkEntryForFestival,updateFestCharge} from "../controllers/billPerDay.controller.js"
router.get('/',AdminauthMiddleWare,billForALL );
router.get('/:registrationNumber',AdminauthMiddleWare,billForOne);
router.post('/update-billPerDay',AdminauthMiddleWare,updateBill)
router.post('/check-entry',checkEntry);
router.post('/check-fest',checkEntryForFestival);
router.post('/update-fest',updateFestCharge);
  export default router;