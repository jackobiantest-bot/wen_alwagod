import Wallet from '../models/wallet.model';

//get all wallets
export const getAllWallets = async () => {
  const data = await Wallet.find();
  return data;
};

//create new wallet
export const newWallet = async (body) => {
  const data = await Wallet.create(body);
  return data;
};

//update single wallet
export const updateWallet = async (_id, body) => {
  const data = await Wallet.findByIdAndUpdate(
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

//delete single wallet
export const deleteWallet = async (id) => {
  await Wallet.findByIdAndDelete(id);
  return '';
};

//get single wallet
export const getWallet = async (id) => {
  const data = await Wallet.findById(id);
  return data;
};
