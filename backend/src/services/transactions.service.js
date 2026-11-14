import Transactions from '../models/transactions.model';

//get all transactionss
export const getAllTransactionss = async () => {
  const data = await Transactions.find();
  return data;
};

//create new transactions
export const newTransactions = async (body) => {
  const data = await Transactions.create(body);
  return data;
};

//update single transactions
export const updateTransactions = async (_id, body) => {
  const data = await Transactions.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single transactions
export const deleteTransactions = async (id) => {
  await Transactions.findByIdAndDelete(id);
  return '';
};

//get single transactions
export const getTransactions = async (id) => {
  const data = await Transactions.findById(id);
  return data;
};
