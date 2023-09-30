import Joi from 'joi'

export const productSchema = {
  create: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    isActive: Joi.boolean().default(true).optional(),
    isDeleted: Joi.boolean().default(false).optional(),
    imageSrc: Joi.string().optional(),
  }),
};
