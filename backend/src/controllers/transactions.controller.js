import HttpStatus from 'http-status-codes';
import * as TransactionsService from '../services/transactions.service';

/**
 * Controller to get all transactionss available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllTransactionss = async (req, res, next) => {
  try {
    const data = await TransactionsService.getAllTransactionss();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All transactionss fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single transactions
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getTransactions = async (req, res, next) => {
  try {
    const data = await TransactionsService.getTransactions(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Transactions fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new transactions
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newTransactions = async (req, res, next) => {
  try {
    const data = await TransactionsService.newTransactions(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Transactions created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a transactions
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateTransactions = async (req, res, next) => {
  try {
    const data = await TransactionsService.updateTransactions(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Transactions updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a transactions
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteTransactions = async (req, res, next) => {
  try {
    await TransactionsService.deleteTransactions(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Transactions deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
