'use client';

import React from 'react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

const benefits: Benefit[] = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
      </svg>
    ),
    title: "Frete Grátis",
    description: "Em compras acima de R$ 199",
    highlight: "Para todo o Brasil"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Troca Fácil",
    description: "30 dias para trocar ou devolver",
    highlight: "Sem complicação"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Compra Segura",
    description: "Seus dados protegidos",
    highlight: "SSL 256 bits"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Atendimento 24h",
    description: "Suporte sempre disponível",
    highlight: "Chat online"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    title: "Parcelamento",
    description: "Em até 12x sem juros",
    highlight: "No cartão de crédito"
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Qualidade Garantida",
    description: "Produtos selecionados",
    highlight: "Satisfação garantida"
  }
];

export function BenefitsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher a Valentina Shoes?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos a melhor experiência de compra com benefícios exclusivos para você
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-xl mb-4 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
                {benefit.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 mb-2">
                {benefit.description}
              </p>

              {benefit.highlight && (
                <p className="text-primary-600 font-medium text-sm">
                  {benefit.highlight}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de clientes satisfeitos e descubra por que somos a escolha número 1 em calçados femininos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Ver Produtos
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Falar com Atendimento
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Formas de Pagamento Aceitas
            </h4>
            <p className="text-gray-600">Pague da forma que preferir</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Payment method icons (simplified) */}
            <div className="bg-gray-100 rounded-lg p-4 w-20 h-12 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">VISA</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 w-20 h-12 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">MASTER</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 w-20 h-12 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">ELO</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 w-20 h-12 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">PIX</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 w-20 h-12 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">BOLETO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
