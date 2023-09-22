'use client';

import type { AppProps } from 'next/app'

import '@/styles/globals.css'
import 'rsuite/dist/rsuite.min.css';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient && <Component {...pageProps} />;
}
