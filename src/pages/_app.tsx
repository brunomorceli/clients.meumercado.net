"use client";

import { useEffect, useState } from "react";
import type { AppProps } from "next/app";

import "@shared/middlewares/axios.middleware";
import "rsuite/dist/rsuite.min.css";
import "react-quill/dist/quill.snow.css";
import "../styles/globals.css";
import { GeneralUtils, Layout } from "@root/modules/shared";
import { useRouter } from "next/router";
import { Masterpage } from "@root/modules/admins/components";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);
  const pathname = router.pathname;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  if (pathname.indexOf("/admin") === 0) {
    if (GeneralUtils.getSubdomain(window.location.href)) {
      window.location.href = process.env.NEXT_PUBLIC_CLIENT_URL as string;
      return;
    }

    return (
      <Masterpage>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Masterpage>
    );
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
