import { v4 as uuidv4 } from 'uuid';
import { generateSecurePassword } from '../services/password/passwordService.js';

/**
 * Gera uma senha segura
 */
export const generatePassword = async (req, res) => {
  try {
    const {
      length = parseInt(process.env.PASSWORD_LENGTH) || 12,
      includeUppercase = process.env.UPPERCASE_LETTERS === 'true',
      includeLowercase = process.env.LOWERCASE_LETTERS === 'true',
      includeNumbers = process.env.NUMBERS === 'true',
      includeSpecialChars = process.env.SPECIAL_CHARACTERS === 'true',
      excludeSimilar = false,
      customCharacters = null
    } = req.body;

    const options = {
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecialChars,
      excludeSimilar,
      customCharacters
    };

    const password = await generateSecurePassword(options);
    
    // Análise da força da senha
    const strength = analyzePasswordStrength(password, options);

    const response = {
      success: true,
      message: 'Senha gerada com sucesso',
      data: {
        id: uuidv4(),
        password,
        strength,
        options,
        generatedAt: new Date().toISOString()
      }
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao gerar senha',
      error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_ERROR'
    });
  }
};

/**
 * Gera senhas específicas para e-commerce
 */
export const generateEcommercePassword = async (req, res) => {
  try {
    const { 
      type = 'customer', // customer, admin, api_key, temporary
      userRole = null,
      customLength = null
    } = req.body;

    let passwordConfig;

    switch (type) {
      case 'admin':
        passwordConfig = {
          length: customLength || 16,
          includeUppercase: true,
          includeLowercase: true,
          includeNumbers: true,
          includeSpecialChars: true,
          excludeSimilar: true
        };
        break;
      case 'api_key':
        passwordConfig = {
          length: customLength || 32,
          includeUppercase: true,
          includeLowercase: true,
          includeNumbers: true,
          includeSpecialChars: false, // API keys geralmente sem caracteres especiais
          excludeSimilar: true
        };
        break;
      case 'temporary':
        passwordConfig = {
          length: customLength || 8,
          includeUppercase: true,
          includeLowercase: true,
          includeNumbers: true,
          includeSpecialChars: false,
          excludeSimilar: true
        };
        break;
      case 'customer':
      default:
        passwordConfig = {
          length: customLength || 12,
          includeUppercase: true,
          includeLowercase: true,
          includeNumbers: true,
          includeSpecialChars: true,
          excludeSimilar: false
        };
        break;
    }

    const password = await generateSecurePassword(passwordConfig);
    const strength = analyzePasswordStrength(password, passwordConfig);

    const response = {
      success: true,
      message: `Senha para ${type} gerada com sucesso`,
      data: {
        id: uuidv4(),
        password,
        type,
        userRole,
        strength,
        config: passwordConfig,
        recommendations: getPasswordRecommendations(type),
        generatedAt: new Date().toISOString()
      }
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao gerar senha para e-commerce',
      error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_ERROR'
    });
  }
};

/**
 * Gera múltiplas senhas em lote
 */
export const generateBatchPasswords = async (req, res) => {
  try {
    const { 
      count = 5,
      options = {},
      type = 'customer'
    } = req.body;

    if (count > 100) {
      return res.status(400).json({
        success: false,
        message: 'Máximo de 100 senhas por lote',
        error: 'BATCH_SIZE_EXCEEDED'
      });
    }

    const defaultOptions = {
      length: parseInt(process.env.PASSWORD_LENGTH) || 12,
      includeUppercase: process.env.UPPERCASE_LETTERS === 'true',
      includeLowercase: process.env.LOWERCASE_LETTERS === 'true',
      includeNumbers: process.env.NUMBERS === 'true',
      includeSpecialChars: process.env.SPECIAL_CHARACTERS === 'true',
      excludeSimilar: false
    };

    const passwordOptions = { ...defaultOptions, ...options };
    const passwords = [];

    for (let i = 0; i < count; i++) {
      const password = await generateSecurePassword(passwordOptions);
      const strength = analyzePasswordStrength(password, passwordOptions);
      
      passwords.push({
        id: uuidv4(),
        index: i + 1,
        password,
        strength,
        generatedAt: new Date().toISOString()
      });
    }

    const response = {
      success: true,
      message: `${count} senhas geradas com sucesso`,
      data: {
        batchId: uuidv4(),
        type,
        count,
        passwords,
        options: passwordOptions,
        generatedAt: new Date().toISOString()
      }
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor ao gerar lote de senhas',
      error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_ERROR'
    });
  }
};

/**
 * Analisa a força da senha
 */
function analyzePasswordStrength(password, options) {
  let score = 0;
  let feedback = [];

  // Comprimento
  if (password.length >= 12) score += 25;
  else if (password.length >= 8) score += 15;
  else feedback.push('Senha muito curta');

  // Tipos de caracteres
  if (options.includeUppercase && /[A-Z]/.test(password)) score += 20;
  if (options.includeLowercase && /[a-z]/.test(password)) score += 20;
  if (options.includeNumbers && /[0-9]/.test(password)) score += 20;
  if (options.includeSpecialChars && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 15;

  // Determina nível
  let level;
  if (score >= 80) level = 'muito_forte';
  else if (score >= 60) level = 'forte';
  else if (score >= 40) level = 'media';
  else level = 'fraca';

  return {
    score,
    level,
    feedback: feedback.length > 0 ? feedback : ['Senha atende aos critérios de segurança']
  };
}

/**
 * Retorna recomendações baseadas no tipo de senha
 */
function getPasswordRecommendations(type) {
  const recommendations = {
    customer: [
      'Mantenha a senha em local seguro',
      'Não compartilhe com terceiros',
      'Altere periodicamente'
    ],
    admin: [
      'Use autenticação de dois fatores',
      'Altere mensalmente',
      'Monitore acessos suspeitos',
      'Não use em outros sistemas'
    ],
    api_key: [
      'Armazene em variável de ambiente',
      'Rotacione regularmente',
      'Monitore uso da API',
      'Implemente rate limiting'
    ],
    temporary: [
      'Válida apenas para acesso inicial',
      'Usuário deve alterar no primeiro login',
      'Expire automaticamente após uso'
    ]
  };

  return recommendations[type] || recommendations.customer;
}
