const joi =require('joi')
const validate=(scheema,property)=>{
    return (req,res,next)=>{
        const {error,value}=scheema.validate(req[property],{abortEarly:false,stripUnkown:true,  allowUnknown: false})
        if(error){const errors=error.details.map(detail=>({
            field:detail.path.join('.'),
            massege:details.massege
        })) 
         return res.status(400).json({success:false,
            error: 'Validation failed',
            details: errors
        })}
       
        req[property] = value;
        next();
    }
}
const getMealsQuerySchema=joi.object({
    category:joi.string.valid('appetizer', 'main', 'dessert', 'drink', 'salad'),
    minPrice: Joi.number().min(0),
  maxPrice: Joi.number().min(0),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sort: Joi.string().default('-createdAt')
})
const mealidparamsscheema=joi.object({
    id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.base': 'Meal ID must be text',
      'string.empty': 'Meal ID cannot be empty',
      'string.pattern.base': 'Invalid meal ID format. Must be a 24-character hexadecimal string',
      'any.required': 'Meal ID is required'
    })})
    const creatmealscheema=joi.object({
        name:joi.string.trim().min(3).max(12).required(),
        description: Joi.string().trim().min(10).max(500).required(),
        price: Joi.number().min(0).required(),
        category: Joi.string().valid('appetizer', 'main', 'dessert', 'drink', 'salad').required(),
        image: Joi.string().uri().allow('').optional(),
        isAvailable: Joi.boolean().default(true)
    })
    module.exports={ validateGetMealsQuery: validate(getMealsQuerySchema, 'query'),validatemealidparamsscheema:validate(mealidparamsscheema,'params'),validatecreatmealscheema:(creatmealscheema,'body'),
    handleJoiError: (err, req, res, next) => {
        next(err);
      }}