import express from 'express';
import { uploadSingleImage } from '../../utilis/multer.js';
import validate from '../middlewares/validate.js';
import {asynchandler} from '../../utilis/asyncHandler.js'
import { createCategory,
        deleteCategory,
        getCategories,
        getSpecificCategory,
        updateCategory } from './category.controller.js';
import { createCategorySchema, updateCategorySchema } from './category.validateSchema.js'
const categoryRoutes=express.Router();

categoryRoutes.post('/create',
    uploadSingleImage('image'),
    validate(createCategorySchema),
    asynchandler(createCategory)
    );
    categoryRoutes.get('/',asynchandler(getCategories));
    categoryRoutes.get('/:id',asynchandler(getSpecificCategory))
categoryRoutes.delete('/delete/:id',asynchandler(deleteCategory));
categoryRoutes.patch('/update/:id',
    uploadSingleImage('image'),
    validate(updateCategorySchema),
    asynchandler(updateCategory));
export default categoryRoutes;