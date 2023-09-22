'use client';

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Masterpage } from "@/components";

import '../middlewares/axios.middleware';
import 'rsuite/dist/rsuite.min.css';
import 'react-quill/dist/quill.snow.css';
import "@/styles/globals.css";
import { Toaster } from "@/components/Shared/Toaster";

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
