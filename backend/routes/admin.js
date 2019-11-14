import express from 'express';
import isAdmin from '../middlewares/isAdmin';
import {validateRegisterationCredentials,validateSigninCredentials} from '../middlewares/validatCredentials';
import validateEmailExistence from '../middlewares/validateEmailExistence'
const router = express.Router();
import User from '../controllers/admin'
import Gifs from '../controllers/gifs';
import { verifyToken } from '../helpers/token';
import auth from '../middlewares/auth'
const fileUpload = require("express-fileupload");






const {
    signUp, signIn
  } = User

const {uploadGif} = Gifs

router.use(
  fileUpload({
      useTempFiles: true
  })
);



router.post('/create-user',validateRegisterationCredentials,validateEmailExistence, signUp)
router.post('/signin',validateSigninCredentials, signIn)

//uploading gifs
router.post('/gifs',verifyToken, uploadGif)



export default router