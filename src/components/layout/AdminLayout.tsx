'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('AdminLayout - user:', user, 'isLoading:', isLoading, 'isAdmin:', isAdmin);

    if (!isLoading) {
      if (!user) {
        console.log('Redirecionando para admin login - usuário não logado');
        router.push('/admin/login');
      } else if (!isAdmin) {
        console.log('Redirecionando para home - usuário não é admin');
        router.push('/');
      }
    }
  }, [user, isLoading, isAdmin, router]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  // Se não é admin, não renderizar nada (redirecionamento já foi feito)
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      
      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer Admin */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <p>&copy; 2024 Valentina Admin. Todos os direitos reservados.</p>
            </div>
            <div className="flex items-center gap-4">
              <span>Versão 1.0.0</span>
              <span>•</span>
              <span>Logado como: {user.name}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
