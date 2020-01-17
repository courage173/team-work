import express from 'express';
import isAdmin from '../middlewares/isAdmin';
const router = express.Router();
import Category from '../controllers/category';
import Articles from '../controllers/article';
import { verifyToken } from '../helpers/token';
import ArticleComment from '../controllers/articleComment';



const {uploadArticle,updateArticle,getSingleArticle,
    getUserArticles,getAllArticles,
    getArticlesInCategory,deleteArticle,getFeed} = Articles
const {createArticleComment} = ArticleComment




router.post('/',verifyToken,uploadArticle)
router.patch('/:articleId',verifyToken,updateArticle)
router.get('/:articleId',getSingleArticle)
router.get('/',getAllArticles)
router.get('/user-feed/:userId',verifyToken, getUserArticles)
router.get('/cat/:categoryId',getArticlesInCategory)
//article comment route
router.post('/:articleId/comment',verifyToken, createArticleComment)
//delete articles
router.delete('/:articleId',verifyToken, deleteArticle)

export default router