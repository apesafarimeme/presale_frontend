// src/components/ui/overlays/discount-purchase-overlay.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Coins, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePurchaseState } from "@/hooks/usePurchaseState";
import { useTransactionHandler } from "@/hooks/useTransactionHandler";
import { priceCalculator } from "@/services/price-calculator";
import { PRICE_SCHEDULE } from "@/constants/price-schedule";

interface DiscountPurchaseOverlayProps {
  isOpen: boolean;
  onCloseAction: () => void;
  selectedCrypto: string;
  packageDetails: {
    discount: number;
    packageTitle: string;
    discountedPriceUSD: number;
  };
}

const cryptoOptions = ["BNB", "USDT", "USDC", "BUSD", "DAI", "ETH"];

export const DiscountPurchaseOverlay = ({
  isOpen,
  onCloseAction,
  selectedCrypto,
  packageDetails,
}: DiscountPurchaseOverlayProps) => {
  const {
    currentCrypto,
    handleCryptoChange,
    isPurchasing,
    setIsPurchasing,
    address,
  } = usePurchaseState(selectedCrypto);

  const [cryptoAmount, setCryptoAmount] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [nativeTokenPrice, setNativeTokenPrice] = useState<string>("0.00");

  // Calculate amounts when crypto changes
  useEffect(() => {
    const calculateAmounts = async () => {
      try {
        setIsCalculating(true);
        const currentTokenPrice = PRICE_SCHEDULE.getCurrentPrice();

        // Calculate original value and token amount
        const originalUsdAmount =
          (packageDetails.discountedPriceUSD * 100) /
          (100 - packageDetails.discount);
        const calculatedTokenAmount = originalUsdAmount / currentTokenPrice;
        setTokenAmount(calculatedTokenAmount.toFixed(2));

        // Calculate crypto amount
        if (currentCrypto === "BNB" || currentCrypto === "ETH") {
          const nativePrice = await priceCalculator.getNativeTokenPrice(
            currentCrypto
          );
          setNativeTokenPrice(nativePrice.toFixed(2));
          const calculatedCryptoAmount =
            packageDetails.discountedPriceUSD / nativePrice;
          setCryptoAmount(calculatedCryptoAmount.toFixed(6));
        } else {
          setCryptoAmount(packageDetails.discountedPriceUSD.toString());
        }
      } catch (error) {
        console.error("Error calculating amounts:", error);
      } finally {
        setIsCalculating(false);
      }
    };

    calculateAmounts();
  }, [currentCrypto, packageDetails]);

  const { handleTransaction } = useTransactionHandler(
    currentCrypto,
    cryptoAmount,
    tokenAmount,
    address
  );

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);
      const hash = await handleTransaction();
      if (hash) {
        // Handle successful transaction
        onCloseAction();
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsPurchasing(false);
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
              <Coins className="h-6 w-6 text-primary-500" />
              <span>{packageDetails.packageTitle}</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Exclusive {packageDetails.discount}% discount package
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Package Details Card */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">You Pay</span>
                <span className="font-medium">
                  ${packageDetails.discountedPriceUSD.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Token Value</span>
                <span className="font-medium text-green-600">
                  $
                  {(
                    (packageDetails.discountedPriceUSD * 100) /
                    (100 - packageDetails.discount)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Token Amount</span>
                <span className="font-medium">{tokenAmount} AFA</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-3">
              <Select value={currentCrypto} onValueChange={handleCryptoChange}>
                <SelectTrigger>
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

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Amount to pay</span>
                <span className="font-medium">
                  {isCalculating
                    ? "Calculating..."
                    : `${cryptoAmount} ${currentCrypto}`}
                </span>
              </div>

              {(currentCrypto === "BNB" || currentCrypto === "ETH") && (
                <div className="text-xs text-gray-500">
                  Current {currentCrypto} price: ${nativeTokenPrice}
                </div>
              )}
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {isCalculating
                  ? "Calculating amounts..."
                  : `You will receive ${tokenAmount} ApeSafari tokens for ${cryptoAmount} ${currentCrypto}`}
              </AlertDescription>
            </Alert>

            <Button
              className="w-full"
              onClick={handlePurchase}
              disabled={isPurchasing || isCalculating}
            >
              {isPurchasing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <span>Pay with {currentCrypto}</span>
              )}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
