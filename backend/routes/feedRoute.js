import express from 'express';
const router = express.Router();

import { verifyToken } from '../helpers/token';
import getFeed from '../controllers/feed'


router.get('/',verifyToken,getFeed)

export default router