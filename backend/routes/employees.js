import express from 'express';
import isAdmin from '../middlewares/isAdmin';
const router = express.Router();

import Gifs from '../controllers/gifs';
import { verifyToken } from '../helpers/token';
import auth from '../middlewares/auth'
const fileUpload = require("express-fileupload");


const {uploadGif, deleteGifs,getAllGifs,getOneGif} = Gifs

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



export default router