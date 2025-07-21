'use client';

import React from 'react';

interface ConversionFeaturesProps {
  productPrice: number;
  stock?: number;
  className?: string;
}

export function ConversionFeatures({ productPrice, stock = 10, className = "" }: ConversionFeaturesProps) {
  const getUrgencyMessage = () => {
    if (stock <= 3) {
      return {
        message: `Apenas ${stock} unidades restantes!`,
        color: 'text-red-600 bg-red-50 border-red-200',
        icon: '🔥'
      };
    }
    if (stock <= 10) {
      return {
        message: `Estoque limitado - ${stock} unidades`,
        color: 'text-orange-600 bg-orange-50 border-orange-200',
        icon: '⚡'
      };
    }
    return null;
  };

  const urgency = getUrgencyMessage();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Urgency Banner */}
      {urgency && (
        <div className={`flex items-center gap-2 p-3 rounded-lg border ${urgency.color}`}>
          <span className="text-lg">{urgency.icon}</span>
          <span className="font-medium">{urgency.message}</span>
        </div>
      )}
    </div>
  );
}
