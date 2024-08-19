import mongoose, { Types } from 'mongoose'


const accountSchema = new mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: 'user',
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const accountModel = mongoose.model('account', accountSchema)
export default accountModel;
