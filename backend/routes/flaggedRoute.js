import express from 'express';
import isAdmin from '../middlewares/isAdmin';
import Flagged from '../controllers/flagged';
const router = express.Router();

const {flagArticles} = Flagged

router.patch('/:articleId',flagArticles)
export default router