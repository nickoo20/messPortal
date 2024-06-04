import express from 'express'
import cors from 'cors';
import {markleave} from "../controllers/markleave.controller.js"
import { AdminauthMiddleWare } from '../middlewares/AdminAuthMiddleware.js';
const router=express.Router();
//router.use(cors())
router.post("/",AdminauthMiddleWare,markleave);
export default  router;