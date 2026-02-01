// Joi Validatation
import Joi from 'joi'
import mongoose from 'mongoose'

// Custom ObjectId validator
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Invalid userId')
  }
  return value
}

export const chatSchema = Joi.object({
  userId: Joi.string()
    .required()
    .custom(objectId)
    .messages({
      'any.required': 'User ID is required',
      'string.empty': 'User ID is required'
    }),

  history: Joi.array()
    .items(
      Joi.object({
        role: Joi.string()
          .valid('user', 'assistant', 'system')
          .required(),

        message: Joi.string()
          .trim()
          .min(1)
          .required()
      })
    )
    .required()
    .messages({
      'any.required': 'Conversation is required'
    })
})
