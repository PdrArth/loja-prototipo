'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function MercadoPagoSimulado() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="6" fill="#fff" stroke="#333" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="7" ry="3.5" fill="#ffe600" stroke="#333" strokeWidth="1.5"/><path d="M8.5 12c.5-1 2-1 2.5 0s2 1 2.5 0" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mercado Pago (Simulação)</h1>
        <p className="text-gray-600 mb-6">Você está sendo redirecionado para o Mercado Pago para finalizar o pagamento.<br/>Clique abaixo para simular um pagamento aprovado.</p>
        <button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-yellow-500"
          onClick={() => router.push('/checkout/sucesso')}
        >
          Simular pagamento aprovado
        </button>
      </div>
    </div>
  );
} 