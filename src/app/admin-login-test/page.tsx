'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginTestPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { loginAdmin } = useAuth();
  const router = useRouter();

  console.log('AdminLoginTestPage - Renderizando');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('AdminLoginTestPage - Tentativa de login:', email);
    setError('');
    setIsLoading(true);

    try {
      const result = await loginAdmin(email, password);
      console.log('AdminLoginTestPage - Resultado:', result);
      
      if (result.success) {
        console.log('AdminLoginTestPage - Login bem-sucedido, redirecionando');
        router.push('/admin');
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
    } catch (err) {
      console.error('AdminLoginTestPage - Erro:', err);
      setError('Erro interno. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestCredentials = () => {
    setEmail('admin@loja.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login Test</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@loja.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin123"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          <button
            type="button"
            onClick={fillTestCredentials}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Preencher credenciais de teste
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <Link href="/admin/login" className="text-blue-600 hover:underline block">
            → Página oficial de login admin
          </Link>
          <Link href="/test-auth" className="text-blue-600 hover:underline block">
            → Teste de autenticação
          </Link>
          <Link href="/" className="text-gray-600 hover:underline block">
            ← Voltar para home
          </Link>
        </div>
      </div>
    </div>
  );
}
