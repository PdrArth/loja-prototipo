import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/layout/Header";
import { ToastProvider } from '@/components/ui/Toast/ToastContext';
import { Footer } from '@/components/layout/Footer';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Valentina Shoes - Calçados, Bolsas e Acessórios",
  description: "Loja online de calçados femininos, bolsas e acessórios com qualidade e estilo. Encontre o produto perfeito para você na Valentina Shoes.",
  keywords: "calçados femininos, bolsas, acessórios, sapatos, sandálias, tênis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans min-h-screen antialiased`}>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Header />
              <main className="pt-16">
                <ClientLayout>
                  {children}
                </ClientLayout>
              </main>
              <Footer />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
