import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as Brazilian currency (R$)
 * @param price - The price to format
 * @returns Formatted price string (e.g., "R$ 1.299,90")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

/**
 * Calculates the total price for multiple items
 * @param price - Unit price
 * @param quantity - Quantity of items
 * @returns Total price
 */
export function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

/**
 * Generates a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Generates a UUID
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Generates a random number
 */
export function generateRandomNumber(min: number = 0, max: number = 100): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random string
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Debug log function
 */
export function debugLog(...args: any[]): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[DEBUG]', ...args);
  }
}

/**
 * Delay function
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Class names utility (alias for cn)
 */
export function classNames(...inputs: ClassValue[]) {
  return cn(...inputs);
}

/**
 * Responsive utility
 */
export function responsive(base: string, sm?: string, md?: string, lg?: string, xl?: string): string {
  let classes = base;
  if (sm) classes += ` sm:${sm}`;
  if (md) classes += ` md:${md}`;
  if (lg) classes += ` lg:${lg}`;
  if (xl) classes += ` xl:${xl}`;
  return classes;
}
