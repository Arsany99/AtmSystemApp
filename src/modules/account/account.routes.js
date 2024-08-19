import express from 'express'
import { balance, createAccount, deposite, transactions, withdrawal } from './account.controller.js';
import { auth } from '../../middelware/auth.js';
import { validation } from '../../middelware/validation.js';
import { createAccountVlidator, depositVlidator, withdrawalVlidator } from './account.validator.js';
const router = express.Router();





router.post('/' ,validation(createAccountVlidator),auth() ,createAccount)
router.post('/deposit',validation(depositVlidator) ,auth() ,deposite)
router.post('/withdrawal',validation(withdrawalVlidator) ,auth() ,withdrawal)
router.get('/balance' ,auth() ,balance)
router.get('/transactions' ,auth() ,transactions)



export default router
