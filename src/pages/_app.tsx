import type { AppProps } from "next/app";
import "../styles/index.css";
import { useEffect, FC } from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { JssProvider, createGenerateId } from "react-jss";
import { MantineProvider } from "@mantine/core";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/sonner";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import Router from "next/router";
import { Session } from "next-auth";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp: FC<AppProps<{ session: Session }>> = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.getElementById("mantine-ssr-styles");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <JssProvider generateId={createGenerateId({ minify: true })}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
            />

            <link rel="manifest" href="/manifest.json" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="shortcut icon" href="/favicon.ico" />

            <meta name="application-name" content="Anavrin App" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="Anavrin" />
            <meta name="description" content="Crypto portfolio manager" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-config" content="/icons/browserconfig.xml" />
            <meta name="msapplication-TileColor" content="#2B5797" />
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="theme-color" content="#2b2b2b" />

            <link rel="apple-touch-icon" href="icons/apple-icon-180.png" />

            <meta name="apple-mobile-web-app-capable" content="yes" />

            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2048-2732.jpg"
              media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2732-2048.jpg"
              media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1668-2388.jpg"
              media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2388-1668.jpg"
              media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1536-2048.jpg"
              media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2048-1536.jpg"
              media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1668-2224.jpg"
              media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2224-1668.jpg"
              media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1620-2160.jpg"
              media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2160-1620.jpg"
              media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1284-2778.jpg"
              media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2778-1284.jpg"
              media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1170-2532.jpg"
              media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2532-1170.jpg"
              media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1125-2436.jpg"
              media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2436-1125.jpg"
              media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1242-2688.jpg"
              media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2688-1242.jpg"
              media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-828-1792.jpg"
              media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1792-828.jpg"
              media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1242-2208.jpg"
              media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-2208-1242.jpg"
              media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-750-1334.jpg"
              media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1334-750.jpg"
              media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-640-1136.jpg"
              media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            />
            <link
              rel="apple-touch-startup-image"
              href="icons/apple-splash-1136-640.jpg"
              media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            />

            {/* <link rel='apple-touch-startup-image' href='/static/images/apple_splash_2048.png' sizes='2048x2732' />
<link rel='apple-touch-startup-image' href='/static/images/apple_splash_1668.png' sizes='1668x2224' />
<link rel='apple-touch-startup-image' href='/static/images/apple_splash_1536.png' sizes='1536x2048' />
<link rel='apple-touch-startup-image' href='/static/images/apple_splash_1125.png' sizes='1125x2436' />
<link rel='apple-touch-startup-image' href='/static/images/apple_splash_1242.png' sizes='1242x2208' />
<link rel='apple-touch-startup-image' href='/static/images/apple_splash_750.png' sizes='750x1334' />
<link rel='apple-touch-startup-image' href='/static/images/apple_splash_640.png' sizes='640x1136' /> */}
          </Head>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: "light"
            }}
          >
            <main className={GeistSans.className}>
              <Component {...pageProps} />
            </main>
            <Toaster />
          </MantineProvider>
        </JssProvider>
      </SessionProvider>
    </>
  );
};
export default MyApp;
