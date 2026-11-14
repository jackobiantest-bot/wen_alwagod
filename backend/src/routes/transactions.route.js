import express from 'express';
import * as transactionsController from '../controllers/transactions.controller';
import { newTransactionsValidator } from '../validators/transactions.validator';
import { transactionsAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all transactionss
router.get('', transactionsController.getAllTransactionss);

//route to create a new transactions
router.post('', newTransactionsValidator, transactionsController.newTransactions);

//route to get a single transactions by their transactions id
router.get('/:_id', transactionsAuth, transactionsController.getTransactions);

//route to update a single transactions by their transactions id
router.put('/:_id', transactionsController.updateTransactions);

//route to delete a single transactions by their transactions id
router.delete('/:_id', transactionsController.deleteTransactions);

export default router;
