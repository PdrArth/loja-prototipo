import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="card p-8 text-center max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">
            Página não encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            A página que você procura não existe ou foi removida.
          </p>
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button variant="primary" fullWidth>
                Voltar para a Home
              </Button>
            </Link>
            <Link href="/carrinho" className="block">
              <Button variant="secondary" fullWidth>
                Ver carrinho
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 