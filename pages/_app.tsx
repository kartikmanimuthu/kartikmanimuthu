import "../styles/global.css";
import type { AppProps } from "next/app";
import { fraunces, publicSans, jetbrainsMono } from "../lib/fonts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fraunces.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
