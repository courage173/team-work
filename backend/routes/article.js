import express from 'express';
import isAdmin from '../middlewares/isAdmin';
const router = express.Router();
import Category from '../controllers/category';
import Articles from '../controllers/article';
import { verifyToken } from '../helpers/token';
import ArticleComment from '../controllers/articleComment';



const {uploadArticle,updateArticle,getSingleArticle,getAllArticles,getArticlesInCategory,deleteArticle,getFeed} = Articles
const {createArticleComment} = ArticleComment




router.post('/',verifyToken,uploadArticle)
router.patch('/:articleId',verifyToken,updateArticle)
router.get('/:articleId',getSingleArticle)
router.get('/',getAllArticles)
router.get('/feed',verifyToken, getFeed)
router.get('/cat/:categoryId',getArticlesInCategory)
//article comment route
router.post('/:articleId/comment',verifyToken, createArticleComment)
//delete articles
router.delete('/:articleId',verifyToken, deleteArticle)

export default router