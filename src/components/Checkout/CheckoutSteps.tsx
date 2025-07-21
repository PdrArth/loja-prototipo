import React from 'react';

interface CheckoutStepsProps {
  current: number; // 0: Carrinho, 1: Entrega, 2: Pagamento, 3: Sucesso
}

const steps = [
  { label: 'Carrinho' },
  { label: 'Entrega' },
  { label: 'Pagamento' },
  { label: 'Sucesso' },
];

export const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ current }) => (
  <nav aria-label="Progresso do checkout" className="mb-8">
    <ol className="flex items-center justify-center gap-2 sm:gap-6">
      {steps.map((step, idx) => (
        <li key={step.label} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2
              ${idx < current ? 'bg-primary-600 text-white border-primary-600' : idx === current ? 'bg-white text-primary-700 border-primary-600' : 'bg-gray-100 text-gray-400 border-gray-200'}
            `}
          >
            {idx + 1}
          </div>
          <span className={`text-xs sm:text-sm font-medium ${idx === current ? 'text-primary-700' : 'text-gray-500'}`}>{step.label}</span>
          {idx < steps.length - 1 && (
            <span className="w-6 h-1 bg-gray-200 rounded-full" />
          )}
        </li>
      ))}
    </ol>
  </nav>
); 