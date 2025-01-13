// src/utils/token-utils.ts
export const getTokenDecimals = (symbol: string) => {
  switch (symbol) {
    case "USDT":
      return 6;
    case "BNB":
    case "USDC":
    case "BUSD":
    case "DAI":
      return 18;
    default:
      return 18;
  }
};
