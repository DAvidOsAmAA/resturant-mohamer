import Joi from 'joi';

const validate = (schema, property) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], { 
            abortEarly: false, 
            stripUnknown: true,  
            allowUnknown: false 
        });
        
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors
            });
        }
       
        req[property] = value;
        next();
    };
};

const getMealsQuerySchema = Joi.object({
    category: Joi.string().valid('appetizer', 'main', 'dessert', 'drink', 'salad'),
    minPrice: Joi.number().min(0),
    maxPrice: Joi.number().min(0),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().default('-createdAt')
});

const mealidparamsscheema = Joi.object({
    id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.base': 'Meal ID must be text',
            'string.empty': 'Meal ID cannot be empty',
            'string.pattern.base': 'Invalid meal ID format. Must be a 24-character hexadecimal string',
            'any.required': 'Meal ID is required'
        })
});

const creatmealscheema = Joi.object({
    name: Joi.string().trim().min(3).max(120).required(),
    description: Joi.string().trim().min(10).max(500).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid('appetizer', 'main', 'dessert', 'drink', 'salad').required(),
    image: Joi.string().uri().allow('').optional(),
    isAvailable: Joi.boolean().default(true)
});

const updateMealBodySchema = Joi.object({
    name: Joi.string().trim().min(3).max(100),
    description: Joi.string().trim().min(10).max(500),
    price: Joi.number().min(0),
    category: Joi.string().valid('appetizer', 'main', 'dessert', 'drink', 'salad'),
    image: Joi.string().uri().allow(''),
    isAvailable: Joi.boolean()
}).min(1);

export const validateGetMealsQuery = validate(getMealsQuerySchema, 'query');
export const validatemealidparamsscheema = validate(mealidparamsscheema, 'params');
export const validatecreatmealscheema = validate(creatmealscheema, 'body');
export const validateupdateMealBodySchema = validate(updateMealBodySchema, 'body');
export const handleJoiError = (err, req, res, next) => {
    next(err);
};
