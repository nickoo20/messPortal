import express from 'express'
import cors from 'cors';
import {markleave} from "../controllers/markleave.controller.js"

const router=express.Router();
router.use(cors())
router.post("/",markleave);
export default  router;