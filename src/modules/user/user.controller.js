import userModel from "../../../db/user.model.js";
import { AppError } from "../../utils/classError.js";
import { asyncHandler } from "../../utils/globalErrorHandling.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



//===================================sign up=========================//

export const signUp = asyncHandler(async (req, res, next) => {
    const { name, password} = req.body
    const userExist = await userModel.findOne({ name})
    userExist && next(new AppError('user already exist', 409))
    const token = jwt.sign({ name }, 'generateTokenSecret')
    const hash = bcrypt.hashSync(password, 10)
    const user = new userModel({ name,password: hash })
    const newUser = await user.save()
    newUser ? res.status(201).json({ msg: 'done', user: newUser }) : next(new AppError('user not created', 500))
})


//====================sign in============================================//
export const signIn = asyncHandler(async (req, res, next) => {
    const { name ,password } = req.body
    const user = await userModel.findOne({name })
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return next(new AppError('user not exist or invalid password' , 404))
        
    }
    const token = jwt.sign({name } ,"generateTokenSecret")
    
    res.status(200).json({ msg: 'done'  , token});
});
