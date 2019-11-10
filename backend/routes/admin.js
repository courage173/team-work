import express from 'express';
import isAdmin from '../middlewares/isAdmin';
import {validateRegisterationCredentials} from '../middlewares/validatCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence'
const router = express.Router();
import User from '../controllers/admin'


const {
    signUp
  } = User


router.post('/create-user',validateRegisterationCredentials,validateEmailExistence, signUp)




export default router