import Link from 'next/link';
import { Button } from '@/components/ui/Button/Button';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link 
            href="/" 
            className="text-primary-600 hover:text-primary-700 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para produtos
          </Link>
        </nav>
        
        <div className="card p-8 text-center max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">
            Produto não encontrado
          </h1>
          <p className="text-gray-600 mb-6">
            O produto que você está procurando não existe ou foi removido do nosso catálogo.
          </p>
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button variant="primary" fullWidth>
                Ver todos os produtos
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