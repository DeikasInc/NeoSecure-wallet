import express from 'express';
import {sql} from '../config/db.js'; 
import {createTransaction, deleteTransaction, getSummaryByUserId, getTransactionsByUserId} from '../controllers/transactionsController.js'; 

const router = express.Router();

router.post("/", createTransaction);
router.get("/:userid", getTransactionsByUserId);
router.delete("/:id", deleteTransaction);
router.get("/summary/:userid", getSummaryByUserId);




export default router;
