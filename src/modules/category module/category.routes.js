import express from 'express';
import upload from '../../middlewares/upload.middleware.js';
import { validateBody } from '../../middlewares/validate.middleware.js';
import { asyncHandler } from '../../middlewares/asyncHandler.middleware.js';
import { createCategory,
        deleteCategory,
        getCategories,
        updateCategory } from './category.controller.js';
import { createCategorySchema, updateCategorySchema } from './category.validation.js';
const categoryRoutes=express.Router();
categoryRoutes.post('/create',
    upload.single('image'),
    validateBody(createCategorySchema),
    asyncHandler(createCategory)
    );
categoryRoutes.get('/',asyncHandler(getCategories));
categoryRoutes.delete('/delete/:id',asyncHandler(deleteCategory));
categoryRoutes.patch('/update/:id',
    upload.single('image'),
    validateBody(updateCategorySchema),
    asyncHandler(updateCategory));
export default categoryRoutes;