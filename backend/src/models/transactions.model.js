const { Schema, model } = require('mongoose');

const transactionsSchema = new Schema(
  {
    wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
    type: { type: String, enum: ['TOPUP', 'PAYMENT', 'TRANSFER'], required: true },
    amount: { type: Number, required: true, min: 1 },
    fromStation: { type: Schema.Types.ObjectId, ref: 'Station' },
    toStation: { type: Schema.Types.ObjectId, ref: 'Station' },
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING', index: true },
    idempotencyKey: { type: String, required: true },
    failureReason: String,
    reference: { type: String, unique: true },
  },
  {
    timestamps: true
  }
);

transactionsSchema.index({ idempotencyKey: 1, wallet: 1 }, { unique: true });

module.export = model('Transactions', transactionsSchema);
