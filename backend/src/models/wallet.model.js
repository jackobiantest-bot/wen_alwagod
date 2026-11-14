const { Schema, model } = require('mongoose');

const stationBalanceSchema = new Schema({
  station: { type: Schema.Types.ObjectId, ref: 'Station', required: true },
  balance: { type: Number, required: true, min: 0, default: 0 }, // بالقرش (عدد صحيح)، لا تستخدم الفواصل العشرية
}, { _id: false });

const walletSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    stationBalances: [stationBalanceSchema],
    totalBalance: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true
  }
);

module.exports = model('Wallet', walletSchema);
