const express=require('express')
const router =express.Router()
const mealcontroller=require('./meals.controller')
router.get('/:id',mealcontroller.getmealbyid)
module.exports=router