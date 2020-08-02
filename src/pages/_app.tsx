import type { AppProps } from "next/app";
import "../../public/global.css";
import { FC } from "react";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
