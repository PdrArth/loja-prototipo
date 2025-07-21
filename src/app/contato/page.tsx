'use client';

import React, { useState } from 'react';
import { useToast } from '@/components/ui/Toast/ToastContext';

export default function ContatoPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    showToast('Mensagem enviada com sucesso! Em breve retornaremos.', 'success');
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-primary-700 mb-4">Fale Conosco</h1>
        <p className="text-gray-700 mb-6">Tem dúvidas, sugestões ou precisa de ajuda? Preencha o formulário abaixo ou entre em contato pelos nossos canais de atendimento.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" required className="w-full px-4 py-2 rounded border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" required className="w-full px-4 py-2 rounded border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
            <textarea required rows={4} className="w-full px-4 py-2 rounded border border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors duration-200" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar mensagem'}
          </button>
        </form>
        <div className="mt-8 text-sm text-gray-600">
          <div><span className="font-semibold">E-mail:</span> contato@valentinashoes.com.br</div>
          <div><span className="font-semibold">WhatsApp:</span> (11) 99999-0000</div>
          <div><span className="font-semibold">Atendimento:</span> Seg a Sex, 9h às 18h</div>
        </div>
      </div>
    </div>
  );
} 