import express from "express";
import { createSubMeal, deleteSubMeal, getSubMeals, updateSubMeal } from "./subMeals.controller.js";
import validate from "../middlewares/validate.js";
import { createSubMealSchema, updateSubMealSchema } from "./subMeals.validateSchema.js";
import { asynchandler } from "../../utilis/asyncHandler.js";
import {uploadSingleImage} from "../../utilis/multer.js";

let router = express.Router();

router.post('subMeals/create',uploadSingleImage('image'),validate(createSubMealSchema),asynchandler(createSubMeal));
router.get('subMeals/get',asynchandler(getSubMeals));
router.delete('subMeals/delete/:id',asynchandler(deleteSubMeal));
router.patch('subMeals/update/:id',validate(updateSubMealSchema),asynchandler(updateSubMeal));

export default router;





