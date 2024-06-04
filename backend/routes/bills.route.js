import express from 'express'
import User  from '../models/user.model.js';
import { AdminauthMiddleWare } from '../middlewares/AdminAuthMiddleware.js';
const router = express.Router();
import {billForALL,billForOne} from "../controllers/billcalculation.controller.js"
router.get('/',AdminauthMiddleWare,billForALL );
router.get('/:registrationNumber',AdminauthMiddleWare,billForOne);
  export default router;