import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import {
  // metaMask,
  coinbaseWallet,
  injected,
  walletConnect,
} from "wagmi/connectors";
import { type Config } from "@wagmi/core";

export const chains = [bsc, bscTestnet];

if (!process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
  throw new Error("Missing NEXT_PUBLIC_WC_PROJECT_ID");
}

export function getConfig(): Config {
  return createConfig({
    chains: [bsc, bscTestnet],
    connectors: [
      // metaMask(),
      injected(),
      coinbaseWallet(),
      walletConnect({
        projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!, // Non-null assertion
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [bsc.id]: http(),
      [bscTestnet.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
