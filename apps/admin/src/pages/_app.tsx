'use client';

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Masterpage } from "@/components";

import '../middlewares/axios.middleware';
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <Masterpage>
        <Component {...pageProps} />
      </Masterpage>
    )
  );
}
