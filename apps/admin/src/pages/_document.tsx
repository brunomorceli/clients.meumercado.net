/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://cdn.tiny.cloud/1/lc4t3gyiof8oca90ebrlgw4chto0wof2y2ewgz5gbv8zn32q/tinymce/6/tinymce.min.js"
          referrerPolicy="origin"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
