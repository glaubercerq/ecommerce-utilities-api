import Joi from 'joi';

const qrCodeSchema = Joi.object({
  text: Joi.string().min(1).max(2000).required().messages({
    'string.empty': 'O campo text não pode estar vazio',
    'string.max': 'O texto não pode ter mais de 2000 caracteres',
    'any.required': 'O campo text é obrigatório'
  }),
  options: Joi.object({
    width: Joi.number().integer().min(100).max(1000).default(300),
    margin: Joi.number().integer().min(0).max(10).default(2),
    color: Joi.object({
      dark: Joi.string().pattern(/^#[0-9A-F]{6}$/i).default('#000000'),
      light: Joi.string().pattern(/^#[0-9A-F]{6}$/i).default('#FFFFFF')
    }),
    errorCorrectionLevel: Joi.string().valid('L', 'M', 'Q', 'H').default('M')
  }).default({})
});

const passwordSchema = Joi.object({
  length: Joi.number().integer().min(4).max(128).default(12).messages({
    'number.min': 'Comprimento mínimo da senha é 4 caracteres',
    'number.max': 'Comprimento máximo da senha é 128 caracteres'
  }),
  includeUppercase: Joi.boolean().default(true),
  includeLowercase: Joi.boolean().default(true),
  includeNumbers: Joi.boolean().default(true),
  includeSpecialChars: Joi.boolean().default(true),
  excludeSimilar: Joi.boolean().default(false),
  customCharacters: Joi.string().allow(null, '').default(null)
}).custom((value, helpers) => {
  if (!value.includeUppercase && !value.includeLowercase && 
      !value.includeNumbers && !value.includeSpecialChars && 
      !value.customCharacters) {
    return helpers.error('any.invalid');
  }
  return value;
}).messages({
  'any.invalid': 'Pelo menos um tipo de caractere deve ser incluído'
});

export const validateQRCodeRequest = (req, res, next) => {
  const { error, value } = qrCodeSchema.validate(req.body, { 
    abortEarly: false,
    allowUnknown: false 
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Erro de validação',
      error: 'VALIDATION_ERROR',
      details: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  req.body = value;
  next();
};

export const validatePasswordRequest = (req, res, next) => {
  const { error, value } = passwordSchema.validate(req.body, { 
    abortEarly: false,
    allowUnknown: false 
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Erro de validação',
      error: 'VALIDATION_ERROR',
      details: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  req.body = value;
  next();
};
