import express from 'express';
import isAdmin from '../middlewares/isAdmin';
const router = express.Router();
import Category from '../controllers/category';

import {validateCategory} from '../middlewares/validatCredentials'

const {createCat, updateCat,getAllCat,getSingleCat, deleteCat} = Category


router.post('/',validateCategory,createCat)
router.patch('/:categoryId',validateCategory, updateCat)
router.get('/',getAllCat)
router.get('/:categoryId',getSingleCat)
router.delete('/:categoryId',deleteCat)
export default router