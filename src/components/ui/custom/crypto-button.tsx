// src/components/ui/custom/crypto-button.tsx

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Coins } from "lucide-react";

import { PRESALE_CONFIG } from "@/config/presale";

// Import statements for coin icons
import bnb from "../../../../public/assets/icons/coins/bnb.svg";
import usdt from "../../../../public/assets/icons/coins/usdt.svg";
import usdc from "../../../../public/assets/icons/coins/usdc.svg";
import dai from "../../../../public/assets/icons/coins/dai.svg";
import busd from "../../../../public/assets/icons/coins/busd.svg";
import eth from "../../../../public/assets/icons/coins/eth.svg";

interface CryptoButtonProps {
  onBuyWithCryptoAction: (params: {
    discount: number;
    fixedTokenAmount: string;
    packageTitle: string;
    packagePrice: number;
  }) => void;
  children: React.ReactNode;
  className?: string;
  showIcons?: boolean;
  showHelpText?: boolean;
}

const coins = [
  { src: bnb, alt: "BNB logo", symbol: "BNB" },
  { src: usdt, alt: "USDT logo", symbol: "USDT" },
  { src: usdc, alt: "USDC logo", symbol: "USDC" },
  { src: dai, alt: "DAI logo", symbol: "DAI" },
  { src: busd, alt: "BUSD logo", symbol: "BUSD" },
  { src: eth, alt: "ETH logo", symbol: "ETH" },
];

const CryptoButton: React.FC<CryptoButtonProps> = ({
  children,
  className,
  showIcons = true,
  showHelpText = true,
  onBuyWithCryptoAction,
}) => {
  const now = Math.floor(Date.now() / 1000);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (now >= PRESALE_CONFIG.START_TIME && now <= PRESALE_CONFIG.END_TIME) {
      e.preventDefault();
      onBuyWithCryptoAction({
        discount: 0,
        fixedTokenAmount: "0",
        packageTitle: "Regular Purchase",
        packagePrice: 0,
      });
    } else {
      console.log("presale not started or ended");
    }
  };
  return (
    <div className="flex flex-col items-center">
      <button
        className={cn(
          "relative px-8 py-4 font-bold text-white rounded-full group",
          "transition-all duration-150 ease-in-out",
          "shadow-lg hover:shadow-xl",
          className,
        )}
        onClick={handleClick}
      >
        <span className="relative flex items-center justify-center">
          <Coins className="mr-2 h-5 w-5" />
          {children}
        </span>
      </button>

      {showIcons && (
        <div className="mt-4 flex justify-center space-x-4 mb-4">
          <TooltipProvider>
            {coins.map((coin, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="w-8 h-8 rounded-full">
                    <Image
                      src={coin.src}
                      alt={coin.alt}
                      priority={true}
                      width={32}
                      height={32}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{coin.symbol}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      )}

      {showHelpText && (
        <a
          href="#howtobuy"
          className="mt-2 text-sm text-gray-400 hover:text-gray-300 underline decoration-dotted"
        >
          How to buy?
        </a>
      )}
    </div>
  );
};

export default CryptoButton;
