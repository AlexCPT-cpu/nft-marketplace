import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import MarketplaceProvider from "@/context/marketplaceContext";

const chains = [mainnet, goerli];
const projectId = "59d7385ecf9f4c752fafa1fa419d5c28";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MarketplaceProvider>
      <WagmiConfig client={wagmiClient}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    </MarketplaceProvider>
  );
}
