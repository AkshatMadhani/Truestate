import express from 'express';
import { getFilterOptions, getTransactions } from '../controllers/sales.js';
const router = express.Router();

router.get('/transactions', getTransactions);
router.get('/filter-options', getFilterOptions);

export default router;
