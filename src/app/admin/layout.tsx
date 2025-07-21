'use client';

import { usePathname } from 'next/navigation';
import { AdminLayout } from '@/components/layout/AdminLayout';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  console.log('AdminRootLayout - pathname:', pathname);

  // Se for a página de login, não aplicar o AdminLayout
  if (pathname === '/admin/login') {
    console.log('AdminRootLayout - Renderizando página de login sem AdminLayout');
    return <>{children}</>;
  }

  // Para outras páginas admin, aplicar o AdminLayout
  console.log('AdminRootLayout - Aplicando AdminLayout');
  return <AdminLayout>{children}</AdminLayout>;
}