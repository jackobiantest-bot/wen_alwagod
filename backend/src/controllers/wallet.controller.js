import HttpStatus from 'http-status-codes';
import * as WalletService from '../services/wallet.service';

/**
 * Controller to get all wallets available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllWallets = async (req, res, next) => {
  try {
    const data = await WalletService.getAllWallets();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All wallets fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single wallet
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getWallet = async (req, res, next) => {
  try {
    const data = await WalletService.getWallet(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Wallet fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new wallet
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newWallet = async (req, res, next) => {
  try {
    const data = await WalletService.newWallet(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Wallet created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a wallet
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateWallet = async (req, res, next) => {
  try {
    const data = await WalletService.updateWallet(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Wallet updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a wallet
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteWallet = async (req, res, next) => {
  try {
    await WalletService.deleteWallet(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Wallet deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
