'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function Error({ 
  error, 
  reset 
}: { 
  error: Error & { digest?: string }
  reset: () => void 
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Ocorreu um erro inesperado
      </h1>
      <p className="text-gray-700 mb-6">
        Tente recarregar a página ou voltar para a página inicial.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()}>
          Tentar novamente
        </Button>
        <Link href="/">
          <Button variant="secondary">
            Voltar para a Home
          </Button>
        </Link>
      </div>
      {error?.message && (
        <pre className="mt-6 text-xs text-gray-400 max-w-lg overflow-x-auto">
          {error.message}
        </pre>
      )}
    </div>
  )
} 
