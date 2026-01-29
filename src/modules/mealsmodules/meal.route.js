import express from 'express';
import * as mealcontroller from './meals.controller.js';  

import { 
    validatecreatmealscheema,
    validateGetMealsQuery, 
    validatemealidparamsscheema,
    validateupdateMealBodySchema 
} from './meal.validate.js';

const router = express.Router();

router.get('/:id', validatemealidparamsscheema, mealcontroller.getmealbyid);
router.get('/', validateGetMealsQuery, mealcontroller.getallmeals);           
router.put('/:id', validatemealidparamsscheema, validateupdateMealBodySchema, mealcontroller.updateMeal);
router.post('/', validatecreatmealscheema, mealcontroller.creatmeal);          
router.delete('/:id', validatemealidparamsscheema, mealcontroller.deleteMeal);

export default router;
