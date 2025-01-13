// src/app/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

import { CryptoSelectionOverlay } from "@/components/ui/overlays/crypto-selection-overlay";
import { PurchaseOverlay } from "@/components/ui/overlays/purchase-overlay";
import WalletSelectionOverlay from "@/components/ui/overlays/wallet-selection-overlay";
// import { PresaleStakingOverlay } from "@/components/ui/overlays/PresaleStakingOverlay";
import { DiscountPurchaseOverlay } from "@/components/ui/overlays/discount-purchase-overlay";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Presale } from "@/components/presale";
// import { LiveSales } from "@/components/ui/live-sales";
import { WhyAreYouWaiting } from "@/components/why-are-you-waiting";
import { Features } from "@/components/features";
import { PresaleStaking } from "@/components/presale-staking";
import { EarnWithStaking } from "@/components/earn-with-staking";
import { StartToday } from "@/components/start-today";
import { SmartContract } from "@/components/smart-contract";
import { HowToBuy } from "@/components/how-to-buy";
import { Roadmap } from "@/components/roadmap";
import { JoinTheCommunity } from "@/components/join-the-community";
import { Faq } from "@/components/faq";
import { Disclaimer } from "@/components/disclaimer";
import { TreasureChests } from "@/components/treasure-chests";
import { Tokenomics } from "@/components/tokenomics";

export default function Home() {
  const { isConnected } = useAccount();
  const [isPresaleStakingOverlayOpen, setIsPresaleStakingOverlayOpen] =
    useState(false);
  // console.log("Staking overlay state:", isPresaleStakingOverlayOpen);

  const [isWalletSelectionOpen, setIsWalletSectionOpen] = useState(false);
  const [isCryptoSelectionOverlayOpen, setIsCryptoSelectionOverlayOpen] =
    useState(false);

  const [currentAction, setCurrentAction] = useState<
    "purchase" | "staking" | null
  >(null);

  // console.log("Page render state:", {
  //   isConnected,
  //   isPresaleStakingOverlayOpen,
  //   isWalletSelectionOpen,
  //   isCryptoSelectionOverlayOpen,
  // });

  const [isPurchaseOverlayOpen, setIsPurchaseOverlayOpen] = useState(false);
  const [isDiscountPurchaseOverlayOpen, setIsDiscountPurchaseOverlayOpen] =
    useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("BNB");
  const [purchaseType, setPurchaseType] = useState<"regular" | "discount">(
    "regular",
  );
  const [discountPackageDetails, setDiscountPackageDetails] = useState({
    discount: 0,
    packageTitle: "",
    discountedPriceUSD: 0,
  });

  useEffect(() => {
    if (isConnected && isWalletSelectionOpen) {
      setIsWalletSectionOpen(false);
      // Only show crypto selection for purchase flow
      if (currentAction === "purchase") {
        setIsCryptoSelectionOverlayOpen(true);
      } else if (currentAction === "staking") {
        setIsPresaleStakingOverlayOpen(true);
      }
    }
  }, [isConnected, isWalletSelectionOpen, currentAction]);

  // useEffect(() => {
  //   if (isConnected && isPresaleStakingOverlayOpen) {
  //     setIsWalletSectionOpen(false);
  //     setIsCryptoSelectionOverlayOpen(true);
  //   }
  // }, [isConnected, isPresaleStakingOverlayOpen]);

  // Handle regular purchase
  const handleBuyWithCrypto = () => {
    setCurrentAction("purchase");
    setPurchaseType("regular");
    if (!isConnected) {
      setIsWalletSectionOpen(true);
    } else {
      setIsCryptoSelectionOverlayOpen(true);
    }
  };

  // Handle staking
  // const handlePresaleStaking = () => {
  //   setCurrentAction("staking");
  //   if (!isConnected) {
  //     setIsWalletSectionOpen(true);
  //   } else {
  //     setIsPresaleStakingOverlayOpen(true);
  //   }
  // };

  // Discount purchase flow
  const handleBuyWithDiscountAction = ({
    discount,
    packageTitle,
    packagePrice,
  }: {
    discount: number;
    packageTitle: string;
    packagePrice: number;
  }) => {
    setCurrentAction("purchase");
    setPurchaseType("discount");
    setDiscountPackageDetails({
      discount,
      packageTitle,
      discountedPriceUSD: packagePrice,
    });
    if (!isConnected) {
      console.log("is not connected");
      setIsWalletSectionOpen(true);
    } else {
      console.log("is connected");
      setIsCryptoSelectionOverlayOpen(true);
    }
  };

  const handleCryptoSelect = (crypto: string) => {
    setSelectedCrypto(crypto);
    console.log("purchaseType: ", purchaseType);
    if (purchaseType === "discount") {
      setIsDiscountPurchaseOverlayOpen(true);
    } else {
      setIsDiscountPurchaseOverlayOpen(false);
      setIsPurchaseOverlayOpen(true);
    }
    setIsCryptoSelectionOverlayOpen(false);
  };

  const handlePresaleStaking = () => {
    console.log("handlePresaleStaking called", {
      isConnected,
      currentState: {
        staking: isPresaleStakingOverlayOpen,
        wallet: isWalletSelectionOpen,
        crypto: isCryptoSelectionOverlayOpen,
      },
    });

    if (!isConnected) {
      console.log("Opening wallet selection");
      setIsWalletSectionOpen(true);
      // Make sure crypto selection is closed
      setIsCryptoSelectionOverlayOpen(false);
    } else {
      console.log("Opening staking overlay");
      setIsPresaleStakingOverlayOpen(true);
      // Make sure other overlays are closed
      setIsCryptoSelectionOverlayOpen(false);
      setIsWalletSectionOpen(false);
    }
  };

  // Separate effect for wallet connection
  // useEffect(() => {
  //   console.log("Wallet connection effect", {
  //     isConnected,
  //     isWalletSelectionOpen,
  //   });

  //   if (isConnected && isWalletSelectionOpen) {
  //     setIsWalletSectionOpen(false);
  //     // Only open crypto selection for purchase flow
  //     if (purchaseType === "regular" || purchaseType === "discount") {
  //       setIsCryptoSelectionOverlayOpen(true);
  //     } else {
  //       // For staking, open staking overlay directly
  //       setIsPresaleStakingOverlayOpen(true);
  //     }
  //   }
  // }, [isConnected, isWalletSelectionOpen, purchaseType]);

  return (
    <>
      <Header />
      <Hero />
      <Presale onBuyWithCryptoAction={handleBuyWithCrypto} />
      {/* <LiveSales onBuyWithCryptoAction={handleBuyWithCrypto} /> */}
      <WhyAreYouWaiting onBuyWithCryptoAction={handleBuyWithCrypto} />
      <Features />
      <PresaleStaking onPresaleStakingAction={handlePresaleStaking} />
      <EarnWithStaking onBuyWithCryptoAction={handleBuyWithCrypto} />
      <StartToday onBuyWithCryptoAction={handleBuyWithCrypto} />
      <TreasureChests onBuyWithDiscountAction={handleBuyWithDiscountAction} />
      <Tokenomics onBuyWithCryptoAction={handleBuyWithCrypto} />
      <SmartContract onBuyWithCryptoAction={handleBuyWithCrypto} />
      <HowToBuy onBuyWithCryptoAction={handleBuyWithCrypto} />
      <Roadmap />
      <JoinTheCommunity />
      <Faq onBuyWithCryptoAction={handleBuyWithCrypto} />
      <Disclaimer />

      {/* Regular purchase overlay */}
      <PurchaseOverlay
        isOpen={isPurchaseOverlayOpen}
        onCloseAction={() => setIsPurchaseOverlayOpen(false)}
        selectedCrypto={selectedCrypto}
        title="Buy with Crypto"
        subtitle="Purchase ApeSafari tokens using your preferred cryptocurrency"
      />

      {/* Wallet selection overlays */}
      <WalletSelectionOverlay
        isOpen={isWalletSelectionOpen}
        onClose={() => setIsWalletSectionOpen(false)}
      />

      <CryptoSelectionOverlay
        isOpen={isCryptoSelectionOverlayOpen && currentAction === "purchase"}
        onClose={() => {
          setIsCryptoSelectionOverlayOpen(false);
          setCurrentAction(null);
        }}
        onSelect={handleCryptoSelect}
      />

      {/* <PresaleStakingOverlay
        isOpen={isPresaleStakingOverlayOpen && currentAction === "staking"}
        onCloseAction={() => {
          setIsPresaleStakingOverlayOpen(false);
          setCurrentAction(null);
        }}
      /> */}

      {/* Discount purchase overlays */}
      <DiscountPurchaseOverlay
        isOpen={isDiscountPurchaseOverlayOpen}
        onCloseAction={() => setIsDiscountPurchaseOverlayOpen(false)}
        selectedCrypto={selectedCrypto}
        packageDetails={discountPackageDetails}
      />
    </>
  );
}
