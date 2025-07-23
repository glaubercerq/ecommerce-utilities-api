/**
 * Serviço para geração de senhas seguras
 */

/**
 * Conjuntos de caracteres disponíveis
 */
const CHARACTER_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  // Caracteres similares que podem causar confusão
  similarChars: 'il1Lo0O'
};

/**
 * Gera uma senha segura baseada nas opções fornecidas
 * @param {Object} options - Opções para geração da senha
 * @returns {Promise<string>} - Senha gerada
 */
export async function generateSecurePassword(options = {}) {
  const {
    length = 12,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSpecialChars = true,
    excludeSimilar = false,
    customCharacters = null
  } = options;

  let availableChars = '';

  // Se caracteres customizados foram fornecidos, use apenas eles
  if (customCharacters) {
    availableChars = customCharacters;
  } else {
    // Constrói o conjunto de caracteres baseado nas opções
    if (includeUppercase) availableChars += CHARACTER_SETS.uppercase;
    if (includeLowercase) availableChars += CHARACTER_SETS.lowercase;
    if (includeNumbers) availableChars += CHARACTER_SETS.numbers;
    if (includeSpecialChars) availableChars += CHARACTER_SETS.specialChars;

    // Remove caracteres similares se solicitado
    if (excludeSimilar) {
      availableChars = availableChars
        .split('')
        .filter(char => !CHARACTER_SETS.similarChars.includes(char))
        .join('');
    }
  }

  if (!availableChars) {
    throw new Error('Nenhum conjunto de caracteres disponível para gerar a senha');
  }

  // Gera a senha
  let password = '';
  
  // Garante que pelo menos um caractere de cada tipo solicitado esteja presente
  const guaranteedChars = [];
  
  if (!customCharacters) {
    if (includeUppercase) {
      const upperChars = excludeSimilar 
        ? CHARACTER_SETS.uppercase.split('').filter(c => !CHARACTER_SETS.similarChars.includes(c))
        : CHARACTER_SETS.uppercase.split('');
      guaranteedChars.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
    }
    
    if (includeLowercase) {
      const lowerChars = excludeSimilar 
        ? CHARACTER_SETS.lowercase.split('').filter(c => !CHARACTER_SETS.similarChars.includes(c))
        : CHARACTER_SETS.lowercase.split('');
      guaranteedChars.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);
    }
    
    if (includeNumbers) {
      const numberChars = excludeSimilar 
        ? CHARACTER_SETS.numbers.split('').filter(c => !CHARACTER_SETS.similarChars.includes(c))
        : CHARACTER_SETS.numbers.split('');
      guaranteedChars.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
    }
    
    if (includeSpecialChars) {
      const specialChars = CHARACTER_SETS.specialChars.split('');
      guaranteedChars.push(specialChars[Math.floor(Math.random() * specialChars.length)]);
    }
  }

  // Adiciona os caracteres garantidos
  password += guaranteedChars.join('');

  // Preenche o resto da senha com caracteres aleatórios
  for (let i = guaranteedChars.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  // Embaralha a senha para que os caracteres garantidos não fiquem sempre no início
  password = shuffleString(password);

  return password;
}

/**
 * Embaralha uma string aleatoriamente
 * @param {string} str - String para embaralhar
 * @returns {string} - String embaralhada
 */
function shuffleString(str) {
  return str
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Valida se uma senha atende aos critérios mínimos de segurança
 * @param {string} password - Senha para validar
 * @param {Object} criteria - Critérios de validação
 * @returns {Object} - Resultado da validação
 */
export function validatePasswordStrength(password, criteria = {}) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true
  } = criteria;

  const issues = [];

  if (password.length < minLength) {
    issues.push(`Senha deve ter pelo menos ${minLength} caracteres`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    issues.push('Senha deve conter pelo menos uma letra maiúscula');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    issues.push('Senha deve conter pelo menos uma letra minúscula');
  }

  if (requireNumbers && !/[0-9]/.test(password)) {
    issues.push('Senha deve conter pelo menos um número');
  }

  if (requireSpecialChars && !/[^A-Za-z0-9]/.test(password)) {
    issues.push('Senha deve conter pelo menos um caractere especial');
  }

  return {
    isValid: issues.length === 0,
    issues,
    strength: calculatePasswordStrength(password)
  };
}

/**
 * Calcula a força de uma senha
 * @param {string} password - Senha para analisar
 * @returns {Object} - Informações sobre a força da senha
 */
function calculatePasswordStrength(password) {
  let score = 0;
  const feedback = [];

  // Comprimento
  if (password.length >= 12) {
    score += 25;
  } else if (password.length >= 8) {
    score += 15;
    feedback.push('Considere usar uma senha mais longa');
  } else {
    feedback.push('Senha muito curta');
  }

  // Variedade de caracteres
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^A-Za-z0-9]/.test(password)) score += 15;

  // Complexidade adicional
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= password.length * 0.7) {
    score += 10;
  } else {
    feedback.push('Evite repetir muitos caracteres');
  }

  // Padrões comuns
  if (!/(.)\1{2,}/.test(password)) {
    score += 10;
  } else {
    feedback.push('Evite sequências repetitivas');
  }

  // Determina o nível
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
