// src/services/price-calculator.ts
import { formatUnits } from "viem";
import { PRICE_SCHEDULE } from "@/constants/price-schedule";
// import { publicClient } from "@/config/web3";
import {
  CHAINLINKV3_AGREGATOR_ABI,
  CHAINLINKV3_AGREGATOR_BNB_ADDRESS,
  CHAINLINKV3_AGREGATOR_ETH_ADDRESS,
} from "@/backend/chainlink_aggregator";
import { PriceCache } from "./price-cache";
import { readContract } from "wagmi/actions";
import { getConfig } from "@/config/wagmi";

// Add type for Chainlink response
type ChainlinkResponse = [bigint, bigint, bigint, bigint, bigint]; // [roundId, answer, startedAt, updatedAt, answeredInRound]

class PriceCalculator {
  // private formatInputValue(value: string, symbol: string): string {
  //   const num = Number(value);
  //   if (isNaN(num)) return "0.00";

  //   // Different precision for different tokens
  //   switch (symbol) {
  //     case "BNB":
  //     case "ETH":
  //       return num.toFixed(4);
  //     case "USDT":
  //     case "USDC":
  //     case "BUSD":
  //     case "DAI":
  //       return num.toFixed(2);
  //     default:
  //       return num.toFixed(2);
  //   }
  // }
  private priceCache: PriceCache;
  private readonly RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY = 1000; // 1 second

  constructor() {
    this.priceCache = new PriceCache();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async fetchPriceWithRetry(
    tokenSymbol: "BNB" | "ETH",
    attempts: number = this.RETRY_ATTEMPTS,
  ): Promise<number> {
    try {
      const address =
        tokenSymbol === "BNB"
          ? CHAINLINKV3_AGREGATOR_BNB_ADDRESS
          : CHAINLINKV3_AGREGATOR_ETH_ADDRESS;

      // const data = (await publicClient.readContract({
      //   address: address,
      //   abi: CHAINLINKV3_AGREGATOR_ABI,
      //   functionName: "latestRoundData",
      // })) as ChainlinkResponse;

      const data = (await readContract(getConfig(), {
        address: address as "0x${string}",
        abi: CHAINLINKV3_AGREGATOR_ABI,
        functionName: "latestRoundData",
      })) as ChainlinkResponse;

      const [, answer, , updatedAt] = data;

      // Check if price is stale (older than 1 hour)
      const now = Math.floor(Date.now() / 1000);
      if (now - Number(updatedAt) > 3600) {
        throw new Error("Price feed is stale");
      }

      return Number(formatUnits(answer, 8));
    } catch (error) {
      if (attempts > 1) {
        console.warn(
          `Retrying price fetch for ${tokenSymbol}, attempts left: ${
            attempts - 1
          }`,
        );
        await this.delay(this.RETRY_DELAY);
        return this.fetchPriceWithRetry(tokenSymbol, attempts - 1);
      }
      throw error;
    }
  }

  private getFallbackPrice(tokenSymbol: "BNB" | "ETH"): number {
    const fallbackPrices = {
      BNB: 600,
      ETH: 4000,
    };
    console.warn(
      `Using fallback price for ${tokenSymbol}: $${fallbackPrices[tokenSymbol]}`,
    );
    return fallbackPrices[tokenSymbol];
  }

  async getNativeTokenPrice(tokenSymbol: "BNB" | "ETH"): Promise<number> {
    try {
      // Check cache first
      const cachedPrice = this.priceCache.get(tokenSymbol);
      if (cachedPrice !== null) {
        return cachedPrice;
      }

      // Fetch new price
      const price = await this.fetchPriceWithRetry(tokenSymbol);

      // Cache the new price
      this.priceCache.set(tokenSymbol, price);

      return price;
    } catch (error) {
      console.error(`Error fetching ${tokenSymbol} price:`, error);

      // Check cache again, accept older cache in case of error
      const cachedPrice = this.priceCache.get(tokenSymbol);
      if (cachedPrice !== null) {
        console.warn(
          `Using cached price for ${tokenSymbol} due to fetch error`,
        );
        return cachedPrice;
      }

      // Use fallback price as last resort
      return this.getFallbackPrice(tokenSymbol);
    }
  }

  async calculateTokenAmount(
    paymentAmount: string,
    paymentToken: "BNB" | "ETH" | "USDT" | "USDC" | "BUSD" | "DAI",
  ): Promise<string> {
    try {
      const paymentAmountNum = Number(paymentAmount);
      if (isNaN(paymentAmountNum) || paymentAmountNum <= 0) {
        return "0.00";
      }

      let usdAmount: number;
      if (paymentToken === "BNB" || paymentToken === "ETH") {
        const nativePrice = await this.getNativeTokenPrice(paymentToken);
        usdAmount = paymentAmountNum * nativePrice;
      } else {
        usdAmount = paymentAmountNum;
      }

      const currentTokenPrice = PRICE_SCHEDULE.getCurrentPrice();
      const tokenAmount = usdAmount / currentTokenPrice;

      // Always return token amount with 2 decimals
      return tokenAmount.toFixed(2);
    } catch (error) {
      console.error("Error calculating token amount:", error);
      return "0.00";
    }
  }

  async calculatePaymentAmount(
    tokenAmount: string,
    paymentToken: "BNB" | "ETH" | "USDT" | "USDC" | "BUSD" | "DAI",
  ): Promise<string> {
    try {
      const tokenAmountNum = Number(tokenAmount);
      if (isNaN(tokenAmountNum) || tokenAmountNum <= 0) {
        return "0.00";
      }

      const currentTokenPrice = PRICE_SCHEDULE.getCurrentPrice();
      const usdAmount = tokenAmountNum * currentTokenPrice;

      if (paymentToken === "BNB" || paymentToken === "ETH") {
        const nativePrice = await this.getNativeTokenPrice(paymentToken);
        const cryptoAmount = usdAmount / nativePrice;
        return this.formatInputValue(cryptoAmount.toString(), paymentToken);
      } else {
        return this.formatInputValue(usdAmount.toString(), paymentToken);
      }
    } catch (error) {
      console.error("Error calculating payment amount:", error);
      return "0.00";
    }
  }

  private formatInputValue(value: string, symbol: string): string {
    const num = Number(value);
    if (isNaN(num)) return "0.00";

    switch (symbol) {
      case "BNB":
      case "ETH":
        return num.toFixed(8); // Increased precision for native tokens
      default:
        return num.toFixed(2);
    }
  }

  async calculatePaymentFromTokens(
    desiredTokens: string,
    paymentToken: "BNB" | "ETH" | "USDT" | "USDC" | "BUSD" | "DAI",
  ): Promise<string> {
    try {
      const tokenAmountNum = Number(desiredTokens);
      if (isNaN(tokenAmountNum) || tokenAmountNum <= 0) {
        return "0.00";
      }

      const currentTokenPrice = PRICE_SCHEDULE.getCurrentPrice();
      const usdAmount = tokenAmountNum * currentTokenPrice;

      if (paymentToken === "BNB" || paymentToken === "ETH") {
        const nativePrice = await this.getNativeTokenPrice(paymentToken);
        const cryptoAmount = usdAmount / nativePrice;
        return this.formatInputValue(cryptoAmount.toString(), paymentToken);
      } else {
        return this.formatInputValue(usdAmount.toString(), paymentToken);
      }
    } catch (error) {
      console.error("Error calculating payment amount:", error);
      return "0.00";
    }
  }
}

export const priceCalculator = new PriceCalculator();
