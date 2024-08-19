import mongoose , { Types } from 'mongoose'


const transactionSchema = new mongoose.Schema({
    account: { type: Types.ObjectId, ref: 'account', required: true },
    type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  });
  
  const transactionModel = mongoose.model('transaction', transactionSchema)
  export default transactionModel;
  