const express=require('express')
const router =express.Router()
const mealcontroller=require('./meals.controller')
const { validatecreatmealscheema,
    validateGetMealsQuery, 
    validatemealidparamsscheema,
    validateupdateMealBodySchema}= require('./meal.validate')
router.get('/:id',validatemealidparamsscheema,mealcontroller.getmealbyid)
router.get('/',validateGetMealsQuery, mealcontroller.getallmeals)           
    router.put('/:id', validatemealidparamsscheema,validateupdateMealBodySchema,mealcontroller.updateMeal)
router.post('/', validatecreatmealscheema,mealcontroller.creatmeal)          
router.delete('/:id',validatemealidparamsscheema, mealcontroller.deleteMeal)
module.exports=router