'use client';

import React, { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Por favor, insira seu e-mail');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 2000);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                🎉 Bem-vinda ao clube VIP!
              </h2>
              
              <p className="text-xl text-white/90 mb-6">
                Você receberá seu cupom de 10% OFF em alguns minutos no seu e-mail.
              </p>
              
              <div className="bg-white/20 rounded-lg p-4 mb-6">
                <p className="text-white font-medium">
                  ✨ Benefícios exclusivos ativados:
                </p>
                <ul className="text-white/90 mt-2 space-y-1">
                  <li>• Desconto de 10% na primeira compra</li>
                  <li>• Acesso antecipado às promoções</li>
                  <li>• Frete grátis em compras acima de R$ 149</li>
                </ul>
              </div>
              
              <button
                onClick={() => setIsSubscribed(false)}
                className="text-white/80 hover:text-white underline"
              >
                Cadastrar outro e-mail
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ganhe 10% OFF na primeira compra! 🎁
              </h2>
              
              <p className="text-xl text-white/90 mb-2">
                Cadastre-se na nossa newsletter e receba:
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Ofertas Exclusivas</h3>
                <p className="text-white/80 text-sm">Promoções só para assinantes</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Lançamentos</h3>
                <p className="text-white/80 text-sm">Seja a primeira a saber</p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0V9.5m0 0v3m0-3h3m-3 0h-3" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-1">Dicas de Estilo</h3>
                <p className="text-white/80 text-sm">Looks e tendências</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Seu melhor e-mail"
                    className={`w-full px-4 py-3 rounded-lg bg-white/20 border ${
                      error ? 'border-red-300' : 'border-white/30'
                    } text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50`}
                    disabled={isSubmitting}
                  />
                  {error && (
                    <p className="text-red-200 text-sm mt-1">{error}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </div>
                  ) : (
                    'Quero o desconto!'
                  )}
                </button>
              </div>
            </form>

            {/* Disclaimer */}
            <p className="text-white/70 text-xs mt-4">
              Ao se cadastrar, você concorda em receber e-mails promocionais. 
              Você pode cancelar a qualquer momento.
            </p>

            {/* Social Proof */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/80 text-sm mb-3">
                Junte-se a mais de 15.000 mulheres que já recebem nossas ofertas!
              </p>
              <div className="flex justify-center items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 bg-white/30 rounded-full border-2 border-white/50"></div>
                  ))}
                </div>
                <span className="text-white/80 text-sm ml-2">+15k assinantes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
