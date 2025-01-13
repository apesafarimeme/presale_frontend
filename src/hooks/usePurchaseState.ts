// hooks/usePurchaseState.ts
import { useEffect, useMemo, useState } from "react";
import { useBalance, useAccount } from "wagmi";
import { formatUnits } from "viem";
import {
  getTokenAddress,
  getTokenDecimals,
  TokenSymbol,
} from "@/config/addresses";
import { getNetworkConfig } from "@/config/network";

export const usePurchaseState = (initialCrypto: string) => {
  useEffect(() => {
    setCurrentCrypto(initialCrypto);
  }, [initialCrypto]);
  const [amount, setAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("0.00");
  const [currentCrypto, setCurrentCrypto] = useState(initialCrypto);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { address } = useAccount();
  const networkConfig = getNetworkConfig();
  // console.log("Network Config:", networkConfig); // Debug log

  // Update balance fetching
  const { data: balance, refetch: refetchBalance } = useBalance({
    address: address,
    token:
      currentCrypto === "BNB"
        ? undefined // For native token (BNB)
        : (getTokenAddress(
            currentCrypto as TokenSymbol,
            // networkConfig.chainId
          ) as `0x${string}`),
    chainId: networkConfig.chainId,
    // enabled: Boolean(address), // Only fetch when address is available
  });

  // Log for debugging
  // useEffect(() => {
  // console.log("Balance Update:", {
  //   currentCrypto,
  //   address,
  //   tokenAddress:
  //     currentCrypto === "BNB"
  //       ? "Native Token"
  //       : getTokenAddress(currentCrypto, networkConfig.chainId),
  //   balance: balance?.value,
  //   formattedBalance: balance
  //     ? formatUnits(balance.value, getTokenDecimals(currentCrypto))
  //     : "0.00",
  // });
  // }, [currentCrypto, address, balance, networkConfig.chainId]);

  // Effect to refetch balance when crypto changes
  useEffect(() => {
    if (address) {
      refetchBalance();
    }
  }, [address, currentCrypto, refetchBalance]);

  const formattedBalance = useMemo(() => {
    if (!balance?.value) return "0.00";
    const decimals = getTokenDecimals(currentCrypto as TokenSymbol);
    const formatted = formatUnits(balance.value, decimals);

    console.log("Formatting Balance:", {
      token: currentCrypto,
      decimals,
      rawBalance: balance.value.toString(),
      formatted,
    });

    return formatted;
  }, [balance?.value, currentCrypto]);

  const handleCryptoChange = (value: string) => {
    setCurrentCrypto(value);
    // Balance will automatically update due to the useEffect above
  };

  return {
    amount,
    setAmount,
    tokenAmount,
    setTokenAmount,
    currentCrypto,
    setCurrentCrypto,
    handleCryptoChange,
    balance: formattedBalance,
    isPurchasing,
    setIsPurchasing,
    isTransactionPending,
    setIsTransactionPending,
    showSuccessDialog,
    setShowSuccessDialog,
    address,
  };
};
