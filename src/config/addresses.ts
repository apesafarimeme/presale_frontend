// src/config/token-addresses.ts
// This file contains the token addresses for different tokens on bsc mainnet and testnet
//

// interface TokenAddresses {
//   [key: string]: {
//     mainnet: `0x${string}`;
//     testnet: `0x${string}`;
//     decimals: {
//       mainnet: number;
//       testnet: number;
//     };
//     priceFeed: {
//       mainnet: `0x${string}`;
//       testnet: `0x${string}`;
//     } | null;
//   };
// }

// const isTestnet = process.env.NEXT_PUBLIC_NETWORK_ENV === "testnet";

// export const TOKEN_ADDRESSES: TokenAddresses = {
//   USDT: {
//     mainnet: "0x55d398326f99059fF775485246999027B3197955",
//     testnet: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
//     decimals: {
//       mainnet: 6,
//       testnet: 18, // USDT uses 18 decimals on testnet
//     },
//     priceFeed: {
//       mainnet: "0xB97Ad0E74fa7d920791E90258A6E2085088b4320",
//       testnet: "0xEca2605f0BCF2BA5966372C99837b1F182d3D620",
//     },
//   },
//   USDC: {
//     mainnet: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
//     testnet: "0x64544969ed7EBf5f083679233325356EbE738930",
//     decimals: {
//       mainnet: 6,
//       testnet: 18, // USDT uses 18 decimals on testnet
//     },
//     priceFeed: {
//       mainnet: "0x51597f405303C4377E36123cBc172b13269EA163",
//       testnet: "0x90c069C4538adAc136E051052E14c1cD799C41B7",
//     },
//   },
//   BUSD: {
//     mainnet: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
//     testnet: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
//     decimals: {
//       mainnet: 18,
//       testnet: 18, // USDT uses 18 decimals on testnet
//     },
//     priceFeed: null, // No price feed for BUSD
//   },
//   DAI: {
//     mainnet: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
//     testnet: "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867",
//     decimals: {
//       mainnet: 8,
//       testnet: 18, // USDT uses 18 decimals on testnet
//     },
//     priceFeed: {
//       mainnet: "0x132d3C0B1D2cEa0BC552588063bdBb210FDeecfA",
//       testnet: "0xE4eE17114774713d2De0eC0f035d4F7665fc025D",
//     },
//   },
//   BNB: {
//     mainnet: "0x0000000000000000000000000000000000000000", // Native token
//     testnet: "0x0000000000000000000000000000000000000000", // Native token
//     decimals: {
//       mainnet: 18,
//       testnet: 18, // USDT uses 18 decimals on testnet
//     },
//     priceFeed: {
//       mainnet: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
//       testnet: "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526",
//     },
//   },
//   ETH: {
//     mainnet: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", // Binance-Peg Ethereum Token (ETH)
//     testnet: "0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378",
//     decimals: {
//       mainnet: 18,
//       testnet: 18, // USDT uses 18 decimals on testnet
//     },
//     priceFeed: {
//       mainnet: "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e",
//       testnet: "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7",
//     },
//   },
// };

export const TOKEN_ADDRESSES = {
  // BSC Testnet addresses
  USDT: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
  USDC: "0x64544969ed7EBf5f083679233325356EbE738930",
  BUSD: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
  DAI: "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867",
  ETH: "0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378", // BSC Testnet ETH address
} as const;

// Create a type for the token symbols
export type TokenSymbol = keyof typeof TOKEN_ADDRESSES;

// Helper function to get token address
export const getTokenAddress = (symbol: TokenSymbol): `0x${string}` => {
  return TOKEN_ADDRESSES[symbol] as `0x${string}`;
};

// Helper function to get token decimals
export const getTokenDecimals = (symbol: TokenSymbol | "BNB"): number => {
  // All tokens on BSC testnet have 18 decimals
  return 18;
  // For mainnet, we'll need to change this to:
  switch (symbol) {
    case "USDT":
      return 6;
    case "USDC":
    case "BUSD":
    case "DAI":
    case "ETH":
    case "BNB":
      return 18;
    default:
      return 18;
  }
};

// 175,706.74581
// Add helper function to get price feed address
// export const getPriceFeedAddress = (
//   token: string,
//   chainId: number
// ): `0x${string}` | undefined => {
//   const tokenConfig = TOKEN_ADDRESSES[token];
//   if (!tokenConfig?.priceFeed) return undefined;
//   return chainId === 97
//     ? tokenConfig.priceFeed.testnet
//     : tokenConfig.priceFeed.mainnet;
// };
