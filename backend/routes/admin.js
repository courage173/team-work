import express from 'express';
import isAdmin from '../middlewares/isAdmin';
import {validateRegisterationCredentials,validateSigninCredentials} from '../middlewares/validatCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence'
const router = express.Router();
import User from '../controllers/admin'


const {
    signUp, signIn
  } = User


router.post('/create-user',validateRegisterationCredentials,validateEmailExistence, signUp)
router.post('/signin',validateSigninCredentials, signIn)




export default router