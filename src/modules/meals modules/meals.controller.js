const meals =require('../../../DB/models/meals.model')
exports.getmealbyid=async (req,res)=>{
    try {
        const Meal =await meals.findById(req.params.id)
        if (!Meal) return res.status(404).json({massege:'meal not found'})
            res.status(200).json(Meal)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}