// src/components/ui/overlays/crypto-selection

// "use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bitcoin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Import statements for coin icons
import bnb from "../../../../public/assets/icons/coins/bnb.svg";
import usdt from "../../../../public/assets/icons/coins/usdt.svg";
import usdc from "../../../../public/assets/icons/coins/usdc.svg";
import dai from "../../../../public/assets/icons/coins/dai.svg";
import busd from "../../../../public/assets/icons/coins/busd.svg";
import eth from "../../../../public/assets/icons/coins/eth.svg";

interface CryptoSelectionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (crypto: string) => void;
}

const coins = [
  { name: "Binance Coin", src: bnb, alt: "BNB logo", symbol: "BNB" },
  { name: "Tether", src: usdt, alt: "USDT logo", symbol: "USDT" },
  { name: "USD Coin", src: usdc, alt: "USDC logo", symbol: "USDC" },
  { name: "Dai", src: dai, alt: "DAI logo", symbol: "DAI" },
  { name: "Binance USD", src: busd, alt: "BUSD logo", symbol: "BUSD" },
  { name: "Ethereum", src: eth, alt: "ETH logo", symbol: "ETH" },
];

export const CryptoSelectionOverlay = ({
  isOpen,
  onClose,
  onSelect,
}: CryptoSelectionOverlayProps) => {
  const handleSelect = (symbol: string) => {
    onSelect(symbol);
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
              <Bitcoin className="h-6 w-6 text-gray-500" />
              <span>Select Payment Method</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Choose your preferred cryptocurrency for the purchase
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              {coins.map((coin, index) => (
                <motion.div
                  key={coin.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => handleSelect(coin.symbol)}
                    className={cn(
                      "w-full h-14 px-4 flex items-center justify-center gap-2",
                      "hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
                      "hover:scale-[1.02]",
                    )}
                  >
                    <div className="relative w-6 h-6">
                      <Image
                        src={coin.src}
                        alt={coin.alt}
                        fill
                        sizes="24px"
                        className="object-contain"
                      />
                    </div>
                    <span className="font-medium">{coin.symbol}</span>
                  </Button>
                </motion.div>
              ))}
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Make sure you have sufficient balance in your wallet for the
                transaction
              </AlertDescription>
            </Alert>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
