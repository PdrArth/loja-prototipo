'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/formatters';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { useToast } from '@/components/ui/Toast/ToastContext';
import { CheckoutSteps } from '@/components/Checkout/CheckoutSteps';

/**
 * Página de checkout com resumo do pedido
 */
export default function CheckoutPage() {
  const router = useRouter();
  const { 
    items, 
    getTotalPrice, 
    getTotalItems,
    clearCart 
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const { showToast } = useToast();
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState<number | null>(null);
  const [calculandoFrete, setCalculandoFrete] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const handleCalcularFrete = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalculandoFrete(true);
    await new Promise((r) => setTimeout(r, 1000));
    setFrete(cep.startsWith('0') ? 0 : 19.9); // Frete grátis para CEPs iniciados em 0 (mock)
    setCalculandoFrete(false);
    setShowAddress(true);
    showToast('Frete calculado com sucesso!', 'success');
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const isEmpty = items.length === 0;

  /**
   * Processa o pedido (simulado)
   */
  const handleFinalizarPedido = async () => {
    setIsProcessing(true);
    
    // Simula processamento do pedido
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Limpa o carrinho
    clearCart();
    
    // Marca pedido como concluído
    setOrderCompleted(true);
    setIsProcessing(false);
  };

  // Redireciona para home se carrinho estiver vazio
  if (isEmpty && !orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8m-8 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Carrinho vazio
            </h2>
            
            <p className="text-gray-600 mb-6">
              Adicione produtos ao carrinho antes de finalizar o pedido
            </p>
            
            <Link href="/">
              <Button variant="primary" size="lg">
                Ir às Compras
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Tela de sucesso após finalizar pedido
  if (orderCompleted) {
    const pedidoId = 'PED' + Math.floor(100000 + Math.random() * 900000);
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Pedido Finalizado com Sucesso!
            </h1>
            <p className="text-gray-600 mb-2">
              Obrigado pela sua compra! Seu pedido foi processado e você receberá um e-mail de confirmação em breve.
            </p>
            <div className="text-green-700 font-semibold mb-4">
              Número do pedido: <span className="font-mono">{pedidoId}</span>
            </div>
            <p className="text-gray-500 mb-6">
              Você pode acompanhar o status do seu pedido na área de pedidos ou entrar em contato com nosso suporte em caso de dúvidas.
            </p>
            <Link href="/">
              <Button variant="primary" size="lg">
                Voltar à Página Inicial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Tela de processamento do pedido
  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="xl" label="Processando pedido..." />
      </div>
    );
  }

  const totalComFrete = frete !== null ? totalPrice + frete : totalPrice;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <CheckoutSteps current={1} />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Finalizar Pedido
          </h1>
          <p className="text-gray-600">
            Revise seu pedido e finalize a compra
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Resumo do Pedido
                </h2>

                {/* Cálculo de frete */}
                <form onSubmit={handleCalcularFrete} className="flex flex-col sm:flex-row gap-3 mb-6">
                  <input
                    type="text"
                    value={cep}
                    onChange={e => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    placeholder="Digite seu CEP"
                    className="flex-1 px-4 py-2 rounded border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                    pattern="\d{8}"
                    maxLength={8}
                    minLength={8}
                  />
                  <Button type="submit" variant="primary" loading={calculandoFrete}>
                    Calcular Frete
                  </Button>
                </form>
                {frete !== null && (
                  <div className={`mb-6 text-${frete === 0 ? 'green' : 'primary'}-700 font-semibold`}>
                    Frete: {frete === 0 ? 'Grátis' : formatPrice(frete)}
                  </div>
                )}
                
                {/* Items List */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div 
                      key={item.produto.id}
                      className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.produto.imagem}
                          alt={item.produto.nome}
                          className="h-16 w-16 rounded-lg object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/fallback-image.svg';
                          }}
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {item.produto.nome}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Quantidade: {item.quantidade}
                        </p>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatPrice(item.produto.preco * item.quantidade)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatPrice(item.produto.preco)} cada
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Back to Cart Link */}
                <div className="pt-4 border-t border-gray-200">
                  <Link 
                    href="/carrinho"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Voltar ao Carrinho
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-8">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Total do Pedido
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
                    </span>
                    <span className="text-gray-900 font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frete</span>
                    <span className={frete === 0 ? 'text-green-600 font-bold' : 'text-primary-600 font-medium'}>
                      {frete === null ? 'Calcule o frete' : frete === 0 ? 'Grátis' : formatPrice(frete)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Impostos</span>
                    <span className="text-gray-900 font-medium">Inclusos</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total Final
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        {formatPrice(totalComFrete)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Resumo do endereço e pagamento (mock) */}
                {showAddress && (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-primary-700 mb-2">Endereço de entrega</h3>
                    <div className="text-sm text-primary-900 mb-2">Rua Exemplo, 123 - Centro, São Paulo/SP - 01000-000</div>
                    {/* Aqui pode ter botão para editar endereço futuramente */}
                  </div>
                )}
                
                {showAddress && (
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={() => router.push('/checkout/pagamento')}
                    disabled={frete === null}
                    className="mb-4"
                  >
                    Continuar para pagamento
                  </Button>
                )}
                
                <p className="text-xs text-gray-500 text-center">
                  Ao finalizar, você concorda com nossos termos de uso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}