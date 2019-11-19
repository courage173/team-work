import express from 'express';
import isAdmin from '../middlewares/isAdmin';
const router = express.Router();
import {validateComments, validateCategory} from '../middlewares/validatCredentials'

import Gifs from '../controllers/gifs';
import { verifyToken } from '../helpers/token';

import GifComment from '../controllers/gifComment'
import Category from '../controllers/category';

const fileUpload = require("express-fileupload");


const {uploadGif, deleteGifs,getAllGifs,getOneGif} = Gifs
const {createGifComment} = GifComment
const {createCat, updateCat,getAllCat} = Category

router.use(
  fileUpload({
      useTempFiles: true
  })
);





//uploading gifs
router.post('/gifs',verifyToken, uploadGif)
router.delete('/delete-gifs/:gif_id',verifyToken, deleteGifs)
router.get('/all-gifs', getAllGifs)
router.get('/:id', getOneGif)

//gif comments
router.post('/:gifId/comment',verifyToken,validateComments,createGifComment)
//Categories routes
router.post('/',validateCategory,createCat)


export default router