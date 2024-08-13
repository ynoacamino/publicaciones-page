'use client';

import { SessionProvider } from 'next-auth/react';

export default function NextAuth({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
