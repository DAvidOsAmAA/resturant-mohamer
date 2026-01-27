const express=require('express')
const router =express.Router()
const mealcontroller=require('./meals.controller')
router.get('/:id',validateMealIdParam,mealcontroller.getmealbyid)
router.get('/',validateGetMealsQuery, mealcontroller.getallmeals)           
    
router.post('/', validateCreateMealBody,mealcontroller)          
router.delete('/:id',validateMealIdParam, mealcontroller)
module.exports=router