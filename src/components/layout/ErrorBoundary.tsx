import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Aqui você pode logar o erro em um serviço externo se desejar
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Ocorreu um erro inesperado</h1>
          <p className="text-gray-700 mb-6">Tente recarregar a página ou voltar para a página inicial.</p>
          <a href="/" className="text-primary-600 underline">Voltar para a Home</a>
        </div>
      );
    }
    return this.props.children;
  }
} 