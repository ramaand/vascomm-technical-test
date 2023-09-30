import Joi from 'joi'

export const userSchema = {
  create: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().allow('').optional(),
    isActive: Joi.boolean().default(true).optional(),
    role: Joi.string().valid('admin', 'user').default('user').optional(),
    isDeleted: Joi.boolean().default(false).optional(),
  }),
};
