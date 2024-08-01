"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export const  config = createConfig(
  getDefaultConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(
        `https://sepolia.infura.io/v3/562af077c32046d3bbbe28d699eea607`,  // change to .env file
      ),
    },

    walletConnectProjectId: "ce0c94a0958e8e19f0b4549bbc858433",  // change to .env file

    appName: "zkonnect",

  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};