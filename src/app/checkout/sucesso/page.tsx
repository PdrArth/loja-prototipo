'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function SucessoPage() {
  const [pedidoId, setPedidoId] = useState<string>('');

  useEffect(() => {
    setPedidoId('PED' + Math.floor(100000 + Math.random() * 900000));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedido Finalizado com Sucesso!</h1>
        <p className="text-gray-600 mb-2">Obrigado pela sua compra! Seu pedido foi processado e você receberá um e-mail de confirmação em breve.</p>
        <div className="text-green-700 font-semibold mb-4">
          Número do pedido: <span className="font-mono">{pedidoId}</span>
        </div>
        <p className="text-gray-500 mb-6">Você pode acompanhar o status do seu pedido na área de pedidos ou entrar em contato com nosso suporte em caso de dúvidas.</p>
        <Link href="/">
          <Button variant="primary" size="lg">Voltar à Página Inicial</Button>
        </Link>
      </div>
    </div>
  );
} 