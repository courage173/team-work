import express from 'express';
import isAdmin from '../middlewares/isAdmin';
const router = express.Router();
import Category from '../controllers/category';
import Articles from '../controllers/article';
import { verifyToken } from '../helpers/token';
import ArticleComment from '../controllers/articleComment';



const {uploadArticle,updateArticle,getSingleArticle,getAllArticles,getArticlesInCategory} = Articles
const {createArticleComment} = ArticleComment




router.post('/',verifyToken,uploadArticle)
router.patch('/:articleId',verifyToken,updateArticle)
router.get('/:articleId',getSingleArticle)
router.get('/',getAllArticles)
router.get('/cat/:categoryId',getArticlesInCategory)
//article comment route
router.post('/:articleId/comment',verifyToken, createArticleComment)


export default router