import Footer from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Toaster />
      <Footer />
    </>
  );
}
