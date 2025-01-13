// src/config/network-config.ts

import { bsc, bscTestnet } from "wagmi/chains";

export type NetworkConfig = {
  chainId: number;
  name: string;
  networkName: string;
  isTestnet: boolean;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorers: {
    name: string;
    url: string;
  };
};

const SUPPORTED_NETWORKS: { [chainId: number]: NetworkConfig } = {
  56: {
    chainId: bsc.id,
    name: "BNB Smart Chain",
    networkName: "BSC Mainnet",
    isTestnet: false,
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [bsc.rpcUrls.default.http[0]],
    blockExplorers: {
      name: "BscScan",
      url: bsc.blockExplorers.default.url,
    },
  },
  97: {
    chainId: bscTestnet.id,
    name: "BNB Smart Chain Testnet",
    networkName: "BSC Testnet",
    isTestnet: true,
    nativeCurrency: {
      name: "tBNB",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: [bscTestnet.rpcUrls.default.http[0]],
    blockExplorers: {
      name: "BscScan (Testnet)",
      url: bscTestnet.blockExplorers.default.url,
    },
  },
};

const DEFAULT_CHAIN_ID = 56; // Mainnet as default

export const getNetworkConfig = (): NetworkConfig => {
  const envChainId = process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID;
  const chainId = envChainId ? parseInt(envChainId) : DEFAULT_CHAIN_ID;

  // console.log("Network Config:", {
  //   envChainId,
  //   parsedChainId: chainId,
  //   isTestnet: chainId === 97,
  // });

  const network = SUPPORTED_NETWORKS[chainId];
  if (!network) {
    throw new Error(`Unsupported network chain ID: ${chainId}`);
  }

  return network;
};
