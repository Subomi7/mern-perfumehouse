import express from 'express';
import { order } from '../controllers/orderController.js';
import { auth } from '../middleware/auth.js';
const router = express.Router()

//post request

router.post("/create",auth, order)


export default router