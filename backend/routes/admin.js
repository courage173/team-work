import express from 'express';
import isAdmin from '../middlewares/isAdmin';
import {validateRegisterationCredentials,validateSigninCredentials} from '../middlewares/validatCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence'
const router = express.Router();
import User from '../controllers/admin';
import { verifyToken } from '../helpers/token';
const fileUpload = require("express-fileupload");







const {
    signUp, signIn, uploadPic
  } = User


  router.use(
    fileUpload({
        useTempFiles: true
    })
  );
  


router.post('/create-user',validateRegisterationCredentials,validateEmailExistence, signUp)
router.post('/signin',validateSigninCredentials, signIn)
router.patch('/upload-image',verifyToken, uploadPic)





export default router