const meals =require('../../../DB/models/meals.model')
exports.getmealbyid=async (req,res)=>{
    try {
        const Meal =await meals.findById(req.params.id)
        if (!Meal) return res.status(404).json({massege:'meal not found'})
            res.status(200).json(Meal)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    exports.getallmeals=async(req,res,next)=>{
        try {
            
            const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
            const filter={ isAvailable: true }
            if(category) filter.category=category
            if(minPrice||maxPrice) filter.price=price
            if(minPrice)filter.price.$gte=Number(minPrice)
               
                if(maxPrice) filter.price.$lte=Number(maxPrice)

            const MEALS = await meals.find(filter)
          
        .limit(limit)
        .sort(sort)
        .skip((page-1)*limit)
        const count = await MEALS.countDocuments(filter);
        res.status(200).json({
            
            success: true,
           data: MEALS,
           pagination:{totalPages:Math.ceil(count / limit),
            currentPage: page,
            totalItems: count
           }
           ,
       
            });
        } catch (error) {
            next(error);
        }
    }
}