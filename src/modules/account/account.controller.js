import userModel from "../../../db/user.model.js";
import { AppError } from "../../utils/classError.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";
import accountModel from "../../../db/account.model.js";
import { customAlphabet } from "nanoid";
import transactionModel from "../../../db/transacition.model.js";



//===================================createAccount=========================//

export const createAccount = asyncHandler(async (req, res, next) => {
    const { balance} = req.body
    const accountExist = await accountModel.findOne({ user: req.userInfo._id})
    accountExist && next(new AppError('account already exist', 409))
    const numbers = '0123456789';
    const generateNumericId = customAlphabet(numbers, 10) 
    const numericId = generateNumericId()   
    const account = await accountModel.create({balance ,accountNumber:numericId , user: req.userInfo._id })
 
    res.status(201).json({ msg: 'done', account }) 
})



//=========================== deposit account=============================//

export const deposite = asyncHandler(async (req, res, next) => {
    const { type , amount} = req.body
    const accountExist = await accountModel.findOne({ user: req.userInfo._id})
    !accountExist && next(new AppError('account not exist', 404))
    if (type!="deposit") {
        return next(new AppError('you are in wrong page' ,404))

    }
    const transacition = await transactionModel.create({type ,amount ,account:accountExist._id })
    const newBalance = accountExist.balance + amount
    const updatedAccount = await accountModel.updateOne({user:req.userInfo._id} , {balance:newBalance},{new:true})
   
    res.status(201).json({ msg: 'done', updatedAccount , transacition }) 
})



//============================withdrawal==========================//

export const withdrawal = asyncHandler(async (req, res, next) => {
    const { type , amount} = req.body
    const accountExist = await accountModel.findOne({ user: req.userInfo._id})
    !accountExist && next(new AppError('account not exist', 404))
    if (type!="withdrawal") {
        return next(new AppError('you are in wrong page' ,404))

    }
    const transacition = await transactionModel.create({type ,amount ,account:accountExist._id })
    const newBalance = accountExist.balance - amount
    const updatedAccount = await accountModel.updateOne({user:req.userInfo._id} , {balance:newBalance},{new:true})
   
    res.status(201).json({ msg: 'done', updatedAccount , transacition }) 
})



//============================== balance =========================//

export const balance = asyncHandler(async (req, res, next) => {
    const accountExist = await accountModel.findOne({ user: req.userInfo._id})
    !accountExist && next(new AppError('account not exist', 404))
    const balanceCst = accountExist.balance
    res.status(201).json({ msg: 'done', balance:balanceCst }) 
})


//============================== transactions =========================//

export const transactions = asyncHandler(async (req, res, next) => {
    const accountExist = await accountModel.findOne({ user: req.userInfo._id})
    !accountExist && next(new AppError('account not exist', 404))
    const transacition = await transactionModel.find({account:accountExist._id})
    res.status(201).json({ msg: 'done', transacition }) 
})