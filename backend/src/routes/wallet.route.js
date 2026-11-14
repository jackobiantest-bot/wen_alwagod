import express from 'express';
import * as walletController from '../controllers/wallet.controller';
import { newWalletValidator } from '../validators/wallet.validator';
import { walletAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all wallets
router.get('', walletController.getAllWallets);

//route to create a new wallet
router.post('', newWalletValidator, walletController.newWallet);

//route to get a single wallet by their wallet id
router.get('/:_id', walletAuth, walletController.getWallet);

//route to update a single wallet by their wallet id
router.put('/:_id', walletController.updateWallet);

//route to delete a single wallet by their wallet id
router.delete('/:_id', walletController.deleteWallet);

export default router;
