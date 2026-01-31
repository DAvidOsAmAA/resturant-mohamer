import express from 'express';
import { uploadSingleImage } from '../../utilis/multer.js';
import validate from '../middlewares/validate.js';
import {asynchandler} from '../../utilis/asynchandler.js'
import { createCategory,
        deleteCategory,
        getCategories,
        updateCategory } from './category.controller.js';
import { createCategorySchema, updateCategorySchema } from './category.validateSchema.js'
const categoryRoutes=express.Router();
categoryRoutes.post('/create',
    uploadSingleImage('image'),
    validate(createCategorySchema),
    asynchandler(createCategory)
    );
    categoryRoutes.get('/',asyncHandler(getCategories));
categoryRoutes.delete('/delete/:id',asyncHandler(deleteCategory));
categoryRoutes.patch('/update/:id',
    uploadSingleImage('image'),
    validate(updateCategorySchema),
    asynchandler(updateCategory));
export default categoryRoutes;