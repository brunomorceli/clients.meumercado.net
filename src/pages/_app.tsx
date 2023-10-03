'use client';

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { AdminMasterpage } from "@admins/components";
import { CustomerMasterpage } from "@customers/components";

import 'rsuite/dist/rsuite.min.css';
import '../styles/globals.css'

import { Toaster } from "@shared/components";
import { GeneralUtils } from "@root/modules/shared";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState<boolean>(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  
  const subdomain = GeneralUtils.getSubdomain(window! ? window.location.href : '');
  if (subdomain) {
    return (
      <CustomerMasterpage>
        <Component {...pageProps} />
        <Toaster />
      </CustomerMasterpage>
    );
  }

  return (
    <AdminMasterpage>
      <Component {...pageProps} />
      <Toaster />
    </AdminMasterpage>
  );
}
