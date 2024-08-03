"use client";
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "../../ipfs";
import { ConnectKitButton } from "connectkit";
import { useDisplayName } from "@/context/displayName";

const provider_options = {
  walletconnect: {
    package: WalletConnectProvider,
  },
};

let web3modal: Web3Modal;
if (typeof window !== "undefined") {
  web3modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions: provider_options,
  });
}

const Page: React.FC = () => {
  const [provider, setProvider] = useState<any>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const { displayName } = useDisplayName();
  console.log(displayName, useDisplayName());

  const connectWallet = async () => {
    try {
      const provider = await web3modal.connect();
      const web3Instance = new Web3(provider);
      setProvider(provider);
      setWeb3(web3Instance);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  useEffect(() => {
    if (web3modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  return (
    <div>
      <ConnectKitButton />
      {displayName}
    </div>
  );
};

export default Page;
