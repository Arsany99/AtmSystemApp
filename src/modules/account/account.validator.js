import joi from 'joi'
import { generalField } from '../../utils/generalField.js'


export const createAccountVlidator = {
    body: joi.object({
        balance: joi.number().min(1000).required(),
    }).required(),
    headers: generalField.headers.required()
}
export const depositVlidator = {
    body: joi.object({
        type: joi.string().valid('withdrawal', 'deposit').required(),
        amount: joi.number().min(100).required()
    }).required(),
    headers: generalField.headers.required()
}
export const withdrawalVlidator = {
    body: joi.object({
        type: joi.string().valid('withdrawal', 'deposit').required(),
        amount: joi.number().min(100).required()
    }).required(),
    headers: generalField.headers.required()
}
