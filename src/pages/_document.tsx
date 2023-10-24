import { useCompanyStore } from "@customers/stores";
import { Html, Head, Main, NextScript } from "next/document";
import { useStore } from "zustand";

export default function Document() {
  const companyStore = useStore(useCompanyStore);
  const { company } = companyStore;

  return (
    <Html lang="en">
      <Head title={company.name || process.env.NEXT_PUBLIC_APP_NAME}></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
