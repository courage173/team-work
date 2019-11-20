import express from 'express';
import isAdmin from '../middlewares/isAdmin';
const router = express.Router();
import Category from '../controllers/category';
import Articles from '../controllers/article';
import { verifyToken } from '../helpers/token';




const {uploadArticle,updateArticle,getSingleArticle,getAllArticles,getArticlesInCategory} = Articles





router.post('/',verifyToken,uploadArticle)
router.patch('/:articleId',verifyToken,updateArticle)
router.get('/:articleId',getSingleArticle)
router.get('/',getAllArticles)


export default router