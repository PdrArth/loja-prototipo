'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/Toast/ToastContext';

export default function TestAuthPage() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const { showToast } = useToast();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Teste de Autenticação</h1>
        
        <div className="space-y-4">
          <div>
            <strong>isLoading:</strong> {isLoading ? 'true' : 'false'}
          </div>
          
          <div>
            <strong>isAuthenticated:</strong> {isAuthenticated ? 'true' : 'false'}
          </div>
          
          <div>
            <strong>isAdmin:</strong> {isAdmin ? 'true' : 'false'}
          </div>
          
          <div>
            <strong>user:</strong> {user ? JSON.stringify(user, null, 2) : 'null'}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Teste de Toast</h2>
          <div className="space-x-2">
            <button
              onClick={() => showToast('Teste de sucesso!', 'success')}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Teste Success
            </button>
            <button
              onClick={() => showToast('Teste de erro!', 'error')}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Teste Error
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Links de Teste</h2>
          <div className="space-y-2">
            <a href="/login" className="block text-blue-600 hover:underline">
              → Login Cliente
            </a>
            <a href="/admin/login" className="block text-blue-600 hover:underline">
              → Login Admin
            </a>
            <a href="/admin" className="block text-blue-600 hover:underline">
              → Área Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
