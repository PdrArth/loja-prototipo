/**
 * Utilitários para validação de dados
 */

/**
 * Valida se um email tem formato válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida se um preço é válido (maior que 0)
 */
export function isValidPrice(price: number): boolean {
  return typeof price === 'number' && price > 0 && !isNaN(price);
}

/**
 * Valida se uma quantidade é válida (inteiro positivo)
 */
export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0;
}

/**
 * Valida se uma string não está vazia
 */
export function isNotEmpty(str: string): boolean {
  return typeof str === 'string' && str.trim().length > 0;
}

/**
 * Valida se um ID é válido (não vazio)
 */
export function isValidId(id: string): boolean {
  return isNotEmpty(id);
}

/**
 * Valida se uma URL é válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}