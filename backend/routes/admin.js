import express from 'express';
import isAdmin from '../middlewares/isAdmin';
import validateRegisterationCredentials from '../middlewares/validatCredentials'
const router = express.Router();
import User from '../controllers/admin'


const {
    signUp
  } = User


router.post('/create-user', signUp)




export default router