'use client';

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Masterpage } from "@admins/components";

import '@shared/middlewares/axios.middleware';
import 'rsuite/dist/rsuite.min.css';
import 'react-quill/dist/quill.snow.css';
import '../styles/globals.css'
import { Toaster } from "@shared/components";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <Masterpage>
        <Component {...pageProps} />
        <Toaster />
      </Masterpage>
    )
  );
}
