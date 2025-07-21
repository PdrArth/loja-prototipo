'use client';

import React from 'react';
import { ChatWidget } from '@/components/ChatWidget';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      {children}

      {/* Chat Widget */}
      <ChatWidget />
    </>
  );
}
