/**
 * Constantes da aplicação
 */

export const APP_CONFIG = {
  name: 'Valentina Shoes',
  description: 'Calçados, Bolsas e Acessórios',
  version: '1.0.0',
  author: 'Valentina Shoes Team'
} as const;

export const ROUTES = {
  home: '/',
  product: '/produto',
  cart: '/carrinho',
  checkout: '/checkout',
  success: '/sucesso'
} as const;

export const CART_CONFIG = {
  maxQuantity: 99,
  minQuantity: 1,
  storageKey: 'valentina-shoes-cart'
} as const;

export const UI_CONFIG = {
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280
  },
  animations: {
    fast: 150,
    normal: 300,
    slow: 500
  }
} as const;

export const PRODUCT_CONFIG = {
  imagesPerProduct: 1,
  maxDescriptionLength: 500,
  minPrice: 10,
  maxPrice: 1000
} as const;