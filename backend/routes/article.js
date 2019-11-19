import express from 'express';
import isAdmin from '../middlewares/isAdmin';
const router = express.Router();
import Category from '../controllers/category';
import Articles from '../controllers/article';
import { verifyToken } from '../helpers/token';



const {uploadArticle} = Articles




router.post('/',verifyToken,uploadArticle)


export default router