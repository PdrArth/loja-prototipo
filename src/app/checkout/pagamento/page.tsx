'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function PagamentoPage() {
  const [metodo, setMetodo] = useState<'cartao' | 'pix' | 'boleto'>('cartao');
  const [form, setForm] = useState({
    nome: '',
    numero: '',
    validade: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    // Validação simples
    if (metodo === 'cartao' && (!form.nome || !form.numero || !form.validade || !form.cvv)) {
      setError('Preencha todos os campos do cartão.');
      setLoading(false);
      return;
    }
    await new Promise(res => setTimeout(res, 1200));
    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push('/checkout/sucesso'), 1800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-primary-700">Pagamento</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Método de pagamento</label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setMetodo('cartao')} className={`flex-1 px-4 py-2 rounded-lg border ${metodo === 'cartao' ? 'border-primary-600 bg-primary-50 text-primary-700 font-bold' : 'border-gray-300 bg-white text-gray-700'} transition focus:outline-none focus:ring-2 focus:ring-primary-500`}>Cartão de Crédito</button>
              <button type="button" onClick={() => setMetodo('pix')} className={`flex-1 px-4 py-2 rounded-lg border ${metodo === 'pix' ? 'border-primary-600 bg-primary-50 text-primary-700 font-bold' : 'border-gray-300 bg-white text-gray-700'} transition focus:outline-none focus:ring-2 focus:ring-primary-500`}>Pix</button>
              <button type="button" onClick={() => setMetodo('boleto')} className={`flex-1 px-4 py-2 rounded-lg border ${metodo === 'boleto' ? 'border-primary-600 bg-primary-50 text-primary-700 font-bold' : 'border-gray-300 bg-white text-gray-700'} transition focus:outline-none focus:ring-2 focus:ring-primary-500`}>Boleto</button>
            </div>
          </div>
          {metodo === 'cartao' && (
            <div className="space-y-3">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome no cartão</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={form.nome}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">Número do cartão</label>
                <input
                  id="numero"
                  name="numero"
                  type="text"
                  required
                  maxLength={19}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={form.numero}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label htmlFor="validade" className="block text-sm font-medium text-gray-700 mb-1">Validade</label>
                  <input
                    id="validade"
                    name="validade"
                    type="text"
                    required
                    maxLength={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={form.validade}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="MM/AA"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    id="cvv"
                    name="cvv"
                    type="password"
                    required
                    maxLength={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={form.cvv}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          )}
          {metodo === 'pix' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center text-green-700 font-medium">
              <div className="mb-2">Chave Pix: <span className="font-mono">pagamento@valentinashoes.com</span></div>
              <div className="text-xs text-gray-500">(Simulação: copie a chave e pague no app do seu banco)</div>
            </div>
          )}
          {metodo === 'boleto' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-blue-700 font-medium">
              <div className="mb-2">Boleto gerado! Código: <span className="font-mono">34191.79001 01043.510047 91020.150008 5 12340000010000</span></div>
              <div className="text-xs text-gray-500">(Simulação: copie o código e pague no app do seu banco)</div>
            </div>
          )}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">Pagamento aprovado! Redirecionando...</div>}
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Finalizar pedido'}
          </button>
          <button
            type="button"
            className="w-full mt-3 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-yellow-500"
            onClick={() => router.push('/checkout/mercadopago')}
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="6" fill="#fff" stroke="#333" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="7" ry="3.5" fill="#ffe600" stroke="#333" strokeWidth="1.5"/><path d="M8.5 12c.5-1 2-1 2.5 0s2 1 2.5 0" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/></svg>
            Pagar com Mercado Pago
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          <Link href="/checkout" className="text-primary-700 hover:underline font-semibold">← Voltar ao resumo</Link>
        </div>
      </div>
    </div>
  );
} 