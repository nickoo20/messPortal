import express from 'express'
import User  from '../models/user.model.js';

const router = express.Router();
import {billForALL,billForOne} from "../controllers/billcalculation.controller.js"
router.get('/',billForALL );
router.get('/:registrationNumber',billForOne);
  export default router;