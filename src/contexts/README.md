# Cart Context Documentation

## Visão Geral

O sistema de carrinho foi implementado com componentização extrema, separando responsabilidades em múltiplos arquivos especializados.

## Estrutura de Arquivos

### Contextos (`/contexts`)
- `CartContext.tsx` - Contexto principal do carrinho com Provider
- `cart-reducer.ts` - Reducer para gerenciar estado do carrinho
- `index.ts` - Exportações centralizadas

### Hooks (`/hooks`)
- `useCart.ts` - Hook principal para usar o carrinho
- `index.ts` - Exportações centralizadas

### Utilitários (`/lib`)
- `cart-utils.ts` - Funções para manipulação do carrinho
- `cart-storage.ts` - Persistência no localStorage
- `__tests__/cart-utils.test.ts` - Testes unitários

### Tipos (`/types`)
- `Cart.ts` - Interfaces e tipos específicos do carrinho
- `Product.ts` - Tipos de produto e item do carrinho

## Como Usar

### 1. Provider (já configurado no layout)
```tsx
import { CartProvider } from '@/contexts/CartContext';

<CartProvider>
  {children}
</CartProvider>
```

### 2. Hook básico
```tsx
import { useCart } from '@/hooks/useCart';

function Component() {
  const { 
    items, 
    addToCart, 
    updateQuantity, 
    removeFromCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();
}
```

### 3. Hooks especializados
```tsx
import { useIsCartEmpty, useCartStats } from '@/hooks/useCart';

const isEmpty = useIsCartEmpty();
const { itemCount, totalItems, totalPrice } = useCartStats();
```

## Funcionalidades

- ✅ Adicionar produtos ao carrinho
- ✅ Atualizar quantidades (com validação)
- ✅ Remover itens do carrinho
- ✅ Limpar carrinho completo
- ✅ Persistência no localStorage
- ✅ Cálculo de totais
- ✅ Verificação de produtos no carrinho
- ✅ Validação de quantidades (1-99)
- ✅ Testes unitários completos

## Configurações

As configurações do carrinho estão em `/config/constants.ts`:

```typescript
export const CART_CONFIG = {
  maxQuantity: 99,
  minQuantity: 1,
  storageKey: 'valentina-shoes-cart'
};
```