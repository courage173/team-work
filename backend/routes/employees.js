import express from 'express';
import isAdmin from '../middlewares/isAdmin';
const router = express.Router();
import {validateComments, validateCategory} from '../middlewares/validatCredentials'

import Gifs from '../controllers/gifs';
import { verifyToken } from '../helpers/token';

import GifComment from '../controllers/gifComment'


const fileUpload = require("express-fileupload");


const {uploadGif, deleteGifs,getAllGifs,getOneGif} = Gifs
const {createGifComment,getGifComment, deleteGifComment} = GifComment


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
router.get('/:gifId/comment',verifyToken,getGifComment)
router.delete('/:commentId/comment',verifyToken, deleteGifComment)
//Categories routes


export default router