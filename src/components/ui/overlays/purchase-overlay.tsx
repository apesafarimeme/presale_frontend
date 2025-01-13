// src/components/overlays/purchase-overlay.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";

import { useWaitForTransactionReceipt } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  // DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Check, AlertCircle, Coins } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { addPurchase } from "@/services/firebase";
import { usePurchaseState } from "@/hooks/usePurchaseState";
import { useTransactionHandler } from "@/hooks/useTransactionHandler";
import { priceCalculator } from "@/services/price-calculator";
// import { PRICE_SCHEDULE } from "@/constants/price-schedule";
import { getTokenDecimals } from "@/utils/token-utils";

interface PurchaseOverlayProps {
  isOpen: boolean;
  onCloseAction: () => void;
  selectedCrypto: string;
  fixedTokenAmount?: string;
  // calculatePrice?: (tokenPrice: string | number | null) => string;
  title?: string;
  subtitle?: string;
}

// interface MetaMaskToken {
//   type: "ERC20";
//   options: {
//     address: string;
//     symbol: string;
//     decimals: number;
//     image?: string;
//   };
// }

interface TransactionDialogProps {
  isOpen: boolean;
  onCloseAction: () => void;
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
}

// New hook for detecting MetaMask
const useMetaMask = () => {
  const [isMetaMask, setIsMetaMask] = useState(false);

  useEffect(() => {
    const checkMetaMask = () => {
      setIsMetaMask(
        typeof window !== "undefined" &&
          !!window.ethereum &&
          !!window.ethereum.isMetaMask
      );
    };

    checkMetaMask();
    // Optional: Listen for provider changes
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", checkMetaMask);
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeListener("accountsChanged", checkMetaMask);
      }
    };
  }, []);

  return isMetaMask;
};

// New component for the post-transaction dialog
const TransactionSuccessDialog = ({
  isOpen,
  onCloseAction,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
}: TransactionDialogProps) => {
  const isMetaMask = useMetaMask();

  const handleAddToMetaMask = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum?.isMetaMask) {
        console.log("Attempting to add token:", {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
        });

        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: tokenAddress, // The address of the token contract
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters
              decimals: tokenDecimals, // The number of decimals the token uses
              // Optional:
              image: "https://your-token-logo-url.png", // A string URL of the token logo
            },
          },
        });

        if (wasAdded) {
          toast.success("Token successfully added to MetaMask");
        } else {
          toast.error("Token was not added");
        }
      }
    } catch (error) {
      console.error("Error adding token to MetaMask:", error);
      // More detailed error logging
      if (error instanceof Error) {
        toast.error(`Failed to add token: ${error.message}`);
      } else {
        toast.error("Failed to add token to MetaMask");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <span>Transaction Successful!</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Your purchase has been completed successfully
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Transaction Details */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Token Symbol</span>
                <span className="font-medium">{tokenSymbol}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Contract Address</span>
                <span className="font-medium font-mono text-xs">
                  {tokenAddress.slice(0, 6)}...{tokenAddress.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Decimals</span>
                <span className="font-medium">{tokenDecimals}</span>
              </div>
            </div>

            {/* MetaMask Section */}
            {isMetaMask && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Would you like to add the tokens to your MetaMask wallet?
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onCloseAction}
              >
                Close
              </Button>
              {isMetaMask && (
                <Button className="flex-1 gap-2" onClick={handleAddToMetaMask}>
                  <Image
                    src="/assets/icons/metamask-fox.svg"
                    alt="MetaMask"
                    width={20}
                    height={20}
                  />
                  Add to MetaMask
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

const cryptoOptions = ["BNB", "USDT", "USDC", "BUSD", "DAI", "ETH"];

export const PurchaseOverlay = ({
  isOpen,
  onCloseAction,
  selectedCrypto,
  title = "Buy with Crypto",
  subtitle = "Purchase ApeSafari with your preferred cryptocurrency",
}: PurchaseOverlayProps) => {
  const {
    amount,
    setAmount,
    tokenAmount,
    setTokenAmount,
    currentCrypto,
    handleCryptoChange,
    isPurchasing,
    setIsPurchasing,
    showSuccessDialog,
    setShowSuccessDialog,
    balance,
    address,
  } = usePurchaseState(selectedCrypto);

  // Debug useEffect for price feed testing
  // Uncomment to test Chainlink price feeds directly
  // useEffect(() => {
  //   const testPriceFeeds = async () => {
  //     try {
  //       console.log('Testing BNB price feed...');
  //       const bnbPrice = await priceCalculator.getNativeTokenPrice('BNB');
  //       console.log('BNB price:', bnbPrice);

  //       console.log('Testing ETH price feed...');
  //       const ethPrice = await priceCalculator.getNativeTokenPrice('ETH');
  //       console.log('ETH price:', ethPrice);
  //     } catch (error) {
  //       console.error('Price feed test failed:', error);
  //     }
  //   };

  //   if (isOpen) {
  //     testPriceFeeds();
  //   }
  // }, [isOpen]);

  // const getTokenDecimals = (symbol: string) => {
  //   switch (symbol) {
  //     case "USDT":
  //       return 6;
  //     case "BNB":
  //     case "USDC":
  //     case "BUSD":
  //     case "DAI":
  //       return 18;
  //     default:
  //       return 18;
  //   }
  // };
  //
  // Add state for USD values
  const [cryptoUsdValue, setCryptoUsdValue] = useState<string>("0.00");
  const [tokenUsdValue, setTokenUsdValue] = useState<string>("0.00");
  const [isCalculating, setIsCalculating] = useState(false);
  const [rawTokenInput, setRawTokenInput] = useState<string>("");

  // Add state for native token price
  const [nativeTokenPrice, setNativeTokenPrice] = useState<string>("0.00");

  // Add to the existing useEffect or create a new one
  useEffect(() => {
    const updateNativePrice = async () => {
      if (currentCrypto === "BNB" || currentCrypto === "ETH") {
        try {
          const price = await priceCalculator.getNativeTokenPrice(
            currentCrypto
          );
          setNativeTokenPrice(price.toFixed(2));
        } catch (error) {
          console.error("Error fetching native token price:", error);
          setNativeTokenPrice("0.00");
        }
      }
    };

    updateNativePrice();
  }, [currentCrypto]);

  // Update USD values when inputs change
  useEffect(() => {
    const updateUsdValues = async () => {
      if (!isCalculating) {
        // Update USD value for crypto amount
        if (amount) {
          if (currentCrypto === "BNB" || currentCrypto === "ETH") {
            const price = await priceCalculator.getNativeTokenPrice(
              currentCrypto
            );
            setCryptoUsdValue((Number(amount) * price).toFixed(2));
          } else {
            setCryptoUsdValue(Number(amount).toFixed(2));
          }
        } else {
          setCryptoUsdValue("0.00");
        }

        // Update USD value for token amount
        if (rawTokenInput) {
          setTokenUsdValue((Number(rawTokenInput) * 0.01).toFixed(2));
        } else {
          setTokenUsdValue("0.00");
        }
      }
    };

    updateUsdValues();
  }, [amount, rawTokenInput, currentCrypto, isCalculating]);

  const [inputType, setInputType] = useState<"crypto" | "token">("crypto");
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);

  const [inputMode, setInputMode] = useState<"crypto" | "token">("crypto");
  // const [isCalculating, setIsCalculating] = useState(false);

  // Handle amount input change
  const handleAmountChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setInputMode("crypto");

      if (value && Number(value) > 0) {
        setIsCalculating(true);
        try {
          const calculatedTokens = await priceCalculator.calculateTokenAmount(
            value,
            currentCrypto as "BNB" | "ETH" | "USDT" | "USDC" | "BUSD" | "DAI"
          );
          setTokenAmount(calculatedTokens);
          setRawTokenInput(calculatedTokens);
        } catch (error) {
          console.error("Error calculating tokens:", error);
          setTokenAmount("0.00");
          setRawTokenInput("0.00");
        } finally {
          setIsCalculating(false);
        }
      } else {
        setTokenAmount("");
        setRawTokenInput("");
      }
    }
  };

  // Handle token amount input change
  const handleTokenAmountChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    console.log("Token input change:", value);

    // Allow any valid number input
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setRawTokenInput(value);
      setTokenAmount(value);
      setInputMode("token");

      if (value && Number(value) > 0) {
        setIsCalculating(true);
        try {
          console.log("Calculating crypto amount for tokens:", {
            tokenAmount: value,
            crypto: currentCrypto,
          });

          // Calculate the required crypto amount
          const paymentAmount =
            await priceCalculator.calculatePaymentFromTokens(
              value,
              currentCrypto as "BNB" | "ETH" | "USDT" | "USDC" | "BUSD" | "DAI"
            );

          console.log("Calculated crypto amount:", paymentAmount);
          setAmount(paymentAmount);
        } catch (error) {
          console.error("Error calculating crypto amount:", error);
          setAmount("0.00");
        } finally {
          setIsCalculating(false);
        }
      } else {
        setAmount("");
      }
    }
  };

  // Handle max click
  const handleMaxClick = () => {
    if (balance) {
      const formattedValue = formatInputValue(
        balance.toString(),
        currentCrypto
      );
      setAmount(formattedValue);
      setInputType("crypto");
    }
  };

  // Effect for crypto to token calculation
  useEffect(() => {
    const calculateTokens = async () => {
      if (inputType === "crypto" && amount && amount !== "") {
        setIsCalculating(true);
        try {
          const calculatedTokens = await priceCalculator.calculateTokenAmount(
            amount,
            currentCrypto as "BNB" | "ETH" | "USDT" | "USDC" | "BUSD" | "DAI"
          );
          setTokenAmount(calculatedTokens);
        } catch (error) {
          console.error("Error calculating tokens:", error);
          setTokenAmount("0.00");
        } finally {
          setIsCalculating(false);
        }
      }
    };

    calculateTokens();
  }, [amount, currentCrypto, inputType, setTokenAmount, setIsCalculating]);

  // Effect for token to crypto calculation
  useEffect(() => {
    const calculateCrypto = async () => {
      if (inputType === "token" && tokenAmount && tokenAmount !== "") {
        setIsCalculating(true);
        try {
          const calculatedAmount = await priceCalculator.calculatePaymentAmount(
            tokenAmount,
            currentCrypto as "BNB" | "ETH" | "USDT" | "USDC" | "BUSD" | "DAI"
          );
          setAmount(calculatedAmount);
        } catch (error) {
          console.error("Error calculating crypto amount:", error);
          setAmount("0.00");
        } finally {
          setIsCalculating(false);
        }
      }
    };

    calculateCrypto();
  }, [tokenAmount, currentCrypto, inputType, setAmount, setIsCalculating]);

  const { handleTransaction } = useTransactionHandler(
    currentCrypto,
    amount,
    tokenAmount,
    address
  );

  // Handle transaction success
  const handleTransactionSuccess = useCallback(async () => {
    try {
      await addPurchase({
        timestamp: Date.now(),
        cryptoSymbol: currentCrypto,
        paymentAmount: amount,
        tokenAmount: tokenAmount,
        value: (parseFloat(tokenAmount) * 1).toFixed(2),
      });
      setIsPurchasing(false);
      toast.success("Purchase successful! 🎉");
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Error recording purchase:", error);
      toast.error(
        "Purchase recorded on blockchain but failed to update history"
      );
      setIsPurchasing(false);
    }
  }, [
    currentCrypto,
    amount,
    tokenAmount,
    setIsPurchasing,
    setShowSuccessDialog,
  ]);

  // Handle transaction error
  const handleTransactionError = (error: Error) => {
    console.error("Transaction failed:", error);
    toast.error(
      error.message.includes("insufficient funds")
        ? "Insufficient funds for this transaction"
        : "Transaction failed. Please try again."
    );
    setIsPurchasing(false);
  };

  const {
    isLoading: isTransactionPending,
    isSuccess: isTransactionSuccessful,
  } = useWaitForTransactionReceipt({
    hash: transactionHash,
    query: {
      enabled: Boolean(transactionHash),
    },
  });

  useEffect(() => {
    const handleBlur = () => {
      if (rawTokenInput && Number(rawTokenInput) > 0) {
        setTokenAmount(Number(rawTokenInput).toFixed(2));
      }
    };

    return () => {
      handleBlur();
    };
  }, [rawTokenInput, setTokenAmount]);

  useEffect(() => {
    if (isTransactionSuccessful) {
      handleTransactionSuccess();
    }
  }, [isTransactionSuccessful, handleTransactionSuccess]);

  useEffect(() => {
    if (!isOpen) {
      setTransactionHash(undefined);
    }
  }, [isOpen]);

  // Handle purchase
  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);
      const hash = await handleTransaction();
      if (hash) {
        setTransactionHash(hash);
      } else {
        throw new Error("Transaction failed - no hash returned");
      }
    } catch (error) {
      handleTransactionError(error as Error);
      setTransactionHash(undefined);
    }
  };

  // Reset values when overlay closes
  const handleClose = useCallback(() => {
    setAmount("");
    setTokenAmount("");
    setShowSuccessDialog(false);
    setTransactionHash(undefined); // Reset transaction hash
    setIsPurchasing(false); // Reset purchasing state
    onCloseAction();
  }, [
    onCloseAction,
    setAmount,
    setTokenAmount,
    setShowSuccessDialog,
    setTransactionHash,
    setIsPurchasing,
  ]);

  // Helper function for formatting decimals
  const formatInputValue = (value: string, symbol: string): string => {
    const num = Number(value);
    if (isNaN(num)) return "";

    const decimals = getTokenDecimals(symbol);
    return num.toFixed(decimals === 6 ? 6 : 2); // 6 decimals for USDT, 2 for others
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
      >
        <DialogContent className="sm:max-w-md overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
                <Coins className="h-6 w-6 text-gray-500" />
                <span>{title}</span>
              </DialogTitle>
              <DialogDescription className="text-center">
                {subtitle}
              </DialogDescription>
            </DialogHeader>

            {/* Crypto Amount Input Section */}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={amount}
                        onChange={handleAmountChange}
                        className={`border-none text-2xl font-bold bg-transparent p-0 h-auto focus-visible:ring-0 ${
                          inputMode === "crypto"
                            ? "text-primary-600"
                            : "text-gray-500"
                        }`}
                        placeholder="0.00"
                      />
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleMaxClick}
                          className="text-xs"
                        >
                          MAX
                        </Button>
                        <Select
                          value={currentCrypto}
                          onValueChange={(value) => {
                            handleCryptoChange(value);
                            setAmount("");
                            setTokenAmount("");
                          }}
                        >
                          <SelectTrigger className="w-[85px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {cryptoOptions.map((crypto) => (
                              <SelectItem key={crypto} value={crypto}>
                                {crypto}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {amount && !isCalculating && (
                      <div className="text-sm text-gray-500 mt-1">
                        ≈ ${cryptoUsdValue} USD
                      </div>
                    )}
                  </div>
                </div>

                {/* Display balance */}
                <div className="text-sm text-center text-gray-500">
                  Balance: {Number(balance).toFixed(4)} {currentCrypto}
                </div>
              </div>

              {/* Token Amount Input Section */}
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <Input
                      type="text"
                      inputMode="decimal"
                      value={rawTokenInput}
                      onChange={handleTokenAmountChange}
                      className={`border-none text-2xl font-bold bg-transparent p-0 h-auto focus-visible:ring-0 ${
                        inputMode === "token"
                          ? "text-primary-600"
                          : "text-gray-500"
                      }`}
                      placeholder="0.00"
                    />
                    <div className="px-3 py-1.5 bg-white dark:bg-gray-700 rounded-full">
                      <span className="font-semibold">AFA</span>
                    </div>
                  </div>
                  {rawTokenInput && !isCalculating && (
                    <div className="text-sm text-gray-500 mt-1">
                      ≈ ${tokenUsdValue} USD
                    </div>
                  )}
                </div>
              </div>
              {/* Helper Text */}
              <div className="text-sm text-gray-500 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="mb-2">💡 You can enter either:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The amount of {currentCrypto} you want to spend</li>
                  <li>The amount of AFA tokens you want to receive</li>
                </ul>
                {currentCrypto === "BNB" || currentCrypto === "ETH" ? (
                  <p className="mt-2 text-xs">
                    Note: Price is updated in real-time using Chainlink price
                    feeds. Current {currentCrypto} price: ${nativeTokenPrice}
                  </p>
                ) : (
                  <p className="mt-2 text-xs">1 {currentCrypto} = $1 USD</p>
                )}
              </div>

              {/* Transaction Status */}
              {isPurchasing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <p className="text-sm font-medium">
                      Processing Transaction
                    </p>
                    <p className="text-xs text-gray-500">
                      Please wait while your transaction is being processed...
                    </p>
                  </div>
                </motion.div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {isCalculating
                      ? "Calculating amounts..."
                      : `You will receive ${Number(rawTokenInput || 0).toFixed(
                          2
                        )} $AFA for ${amount || "0.00"} ${currentCrypto}`}
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Button */}
              <Button
                className="w-full"
                onClick={handlePurchase}
                disabled={
                  isPurchasing ||
                  isTransactionPending ||
                  isCalculating ||
                  !amount ||
                  !tokenAmount
                }
              >
                {isPurchasing || isTransactionPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {isTransactionPending
                        ? "Transaction Pending..."
                        : "Processing..."}
                    </span>
                  </div>
                ) : (
                  <span>Pay with {currentCrypto}</span>
                )}
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      <TransactionSuccessDialog
        isOpen={showSuccessDialog}
        onCloseAction={() => {
          setShowSuccessDialog(false);
          handleClose();
        }}
        tokenAddress="0x83871D16CDAC6F0A83Cf0Fc594e8aaA13430EF5c"
        tokenSymbol="PST"
        tokenDecimals={18}
      />
    </>
  );
};
