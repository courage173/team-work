import express from 'express';
const router = express.Router();
import Category from '../controllers/category';

import {validateCategory} from '../middlewares/validatCredentials';
import {verifyToken} from '../helpers/token';
import isAdmin from '../middlewares/isAdmin'

const {createCat, updateCat,getAllCat,getSingleCat, deleteCat} = Category


router.post('/',verifyToken,isAdmin, validateCategory,createCat)
router.patch('/:categoryId',verifyToken,isAdmin,validateCategory, updateCat)
router.get('/',verifyToken,isAdmin,getAllCat)
router.get('/:categoryId',verifyToken,isAdmin,getSingleCat)
router.delete('/:categoryId',verifyToken,isAdmin,deleteCat)
export default router