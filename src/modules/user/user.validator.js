import joi  from 'joi'
import { generalField } from '../../utils/generalField.js'


export const signUpVlidator = {
    body: joi.object({
        name : joi.string().min(3).max(30).required(),
        password:generalField.password.required(),
    }).required()
}


export const signInVlidator = {
    body: joi.object({
        name : joi.string().min(3).max(30).required(),
        password:generalField.password.required(),
    }).required()
}