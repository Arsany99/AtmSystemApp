import express from 'express'
import { signIn, signUp } from './user.controller.js';
import { validation } from '../../middelware/validation.js';
import { signInVlidator, signUpVlidator } from './user.validator.js';
const router = express.Router();





router.post('/signIn', validation(signUpVlidator) , signIn)
router.post('/signup' ,validation(signInVlidator), signUp)



export default router
