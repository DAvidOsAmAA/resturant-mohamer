import joi from "joi";

// let schema = {
//   createSubMeal: joi.object({
//     name: joi.string().min(3).max(30).required(),
//     price: joi.number().min(1).required(),
//   }),
//   updateSubMeal: joi.object({
//     name: joi.string().min(3).max(30),
//     price: joi.number().min(1),
//   }),
// };

// export const validateSubMeal = (method) => {
//   return (req, res, next) => {
//     let { error } = schema[method].validate(req.body, { abortEarly: false });
//     if (error) {
//       return res.status(400).json({ message: "Validation error", errors: error.details.map((err) => err.message) });
//     }
//     next();
//   };
// };

export const createSubMealSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  price: joi.number().min(1).required(),
  quantity: joi.number().min(1),
});
export const updateSubMealSchema = joi.object({
  name: joi.string().min(3).max(30),
  price: joi.number().min(1),
  quantity: joi.number().min(1),
}); 