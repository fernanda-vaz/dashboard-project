import Joi from 'joi'

const userSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': '"name" deve ser um texto',
    'string.min': '"name" deve ter pelo menos 3 caracteres',
    'any.required': '"name" é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" deve ser um email válido',
    'any.required': '"email" é obrigatório',
  }),
  password: Joi.string().min(6).required(),
  'string.min': '"password" deve ter pelo menos 6 caracteres',
  'any.required': '"password" é obrigatório',
})

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false })

  if (error) {
    return res.status(400).json({
        message: 'Erro de validação',
        details: error.details.map((err) => err.message)
    })
  }

  next()
}
