import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => (
  <footer className="bg-white border-t border-gray-200 mt-16 py-8 text-sm text-gray-600">
    <div className="container-custom flex flex-col md:flex-row md:justify-between gap-8">
      {/* Institucional */}
      <div>
        <h3 className="font-bold text-primary-700 mb-2">Institucional</h3>
        <ul className="space-y-1">
          <li><Link href="/sobre">Sobre a loja</Link></li>
          <li><Link href="/contato">Contato</Link></li>
          <li><Link href="/politica-troca">Política de Troca</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
        </ul>
      </div>
      {/* Segurança e pagamento */}
      <div>
        <h3 className="font-bold text-primary-700 mb-2">Segurança & Pagamento</h3>
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Site Seguro</span>
          <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">SSL</span>
        </div>
        <div className="flex items-center gap-2">
          <img src="/icons/visa.svg" alt="Visa" className="h-7 w-10 object-contain bg-white rounded shadow border border-gray-200" />
          <img src="/icons/mastercard.svg" alt="Mastercard" className="h-7 w-10 object-contain bg-white rounded shadow border border-gray-200" />
          <img src="/icons/amex.svg" alt="Amex" className="h-7 w-10 object-contain bg-white rounded shadow border border-gray-200" />
          <img src="/icons/elo.svg" alt="Elo" className="h-7 w-10 object-contain bg-white rounded shadow border border-gray-200" />
          <img src="/icons/pix.svg" alt="Pix" className="h-7 w-10 object-contain bg-white rounded shadow border border-gray-200" />
        </div>
      </div>
      {/* Redes sociais */}
      <div>
        <h3 className="font-bold text-primary-700 mb-2">Siga-nos</h3>
        <div className="flex gap-3">
          <a href="#" aria-label="Instagram" className="hover:text-primary-600"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
          <a href="#" aria-label="Facebook" className="hover:text-primary-600"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="https://wa.me/5511999990000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-600"><svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21.67 20.13A10 10 0 1 0 3.87 21.67l2.2-.61a1 1 0 0 1 .94.24l2.1 2.1a1 1 0 0 0 1.41 0l2.1-2.1a1 1 0 0 1 .94-.24l2.2.61a10 10 0 0 0 7.8-1.54z"/></svg></a>
        </div>
      </div>
    </div>
    <div className="container-custom mt-8 text-center text-xs text-gray-400">
      © {new Date().getFullYear()} Valentina Shoes. Todos os direitos reservados.
    </div>
  </footer>
); 