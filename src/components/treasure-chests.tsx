// src/components/treasure-chests.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
// import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
// import { useCarousel } from "@/components/ui/carousel";
import { Gift } from "lucide-react";
// import { AlertCircle } from "lucide-react"; // Import AlertCircle icon
// import { Alert, AlertDescription } from "@/components/ui/alert";

import DiscountButton from "@/components/ui/custom/discount-button";
// import { priceCalculator } from "@/services/price-calculator";

import apeSafariSplash from "../../public/assets/images/splash.png";
import jungleJamboree from "../../public/assets/images/waiting.png";
import wildWalletExpedition from "../../public/assets/images/waiting.png";
import bananaBonus from "../../public/assets/images/waiting.png";
import apeExtravaganza from "../../public/assets/images/extravaganza.png";

const treasureChests = [
  {
    title: "New Years Special",
    subtitle: "Grab your 75% Off New Years Offer",
    image: apeSafariSplash,
    alt: "",
    tag: "$999",
    discount: 75,
    discountedPriceUSD: 999,
  },
  {
    title: "ApeSafari Splash",
    subtitle: "Grab 10% Off Your ApeSafari Adventure",
    image: apeSafariSplash,
    alt: "",
    tag: "$99",
    discount: 10,
    discountedPriceUSD: 99,
  },
  {
    title: "Jungle Jamboree",
    subtitle: "Secure ApeSafari Coins with a 20% Discount",
    image: jungleJamboree,
    alt: "",
    tag: "$199",
    discount: 20,
    discountedPriceUSD: 199,
  },
  {
    title: "Wild Wallet Expedition",
    subtitle: "Roar into Savings with 30% off ApeSafari",
    image: wildWalletExpedition,
    alt: "",
    tag: "$299",
    discount: 30,
    discountedPriceUSD: 299,
  },
  {
    title: "Banana Bonus",
    subtitle: "Swing into ApeSafari at a 40% Discount",
    image: bananaBonus,
    alt: "",
    tag: "$399",
    discount: 40,
    discountedPriceUSD: 399,
  },
  {
    title: "Ape Extravaganza",
    subtitle: "Half-Price Adventure with a 50% ApeSafari Discount",
    image: apeExtravaganza,
    alt: "",
    tag: "$499",
    discount: 50,
    discountedPriceUSD: 499,
  },
];

interface TreasureChestsProps {
  onBuyWithDiscountAction: (packageDetails: {
    discount: number;
    packageTitle: string;
    packagePrice: number;
  }) => void;
}

export const TreasureChests = ({
  onBuyWithDiscountAction,
}: TreasureChestsProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // const [setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    // setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Add state to track current chest index
  // const [currentChestIndex, setCurrentChestIndex] = useState(0);

  // Create a ref to track mounted state
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  //   return () => setMounted(false);
  // }, []);

  // Memoize handlers to prevent unnecessary re-renders
  // const handleChestSelect = useCallback((index: number) => {
  //   setCurrentChestIndex(index);
  // }, []);

  // Handler for buying the current chest
  const handleBuyCurrentChest = useCallback(() => {
    // if (mounted && currentChestIndex !== null) {
    console.log("current chest: ", current);
    const selectedChest = treasureChests[current];
    onBuyWithDiscountAction({
      discount: selectedChest.discount,
      packageTitle: selectedChest.title,
      packagePrice: selectedChest.discountedPriceUSD,
    });
    // }
  }, [current, onBuyWithDiscountAction]);

  // Memoize chest items to prevent unnecessary re-renders
  // const renderChestItem = useCallback(
  //   (chest: (typeof treasureChests)[0], index: number) => (
  //     <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
  //       <Card>
  //         <CardHeader>
  //           <CardTitle className="flex flex-col justify-center items-center text-xl md:text-lg text-center text-biloba-flower-400">
  //             {chest.title}
  //           </CardTitle>
  //           <CardDescription className="flexCenter text-center text-base">
  //             {chest.subtitle}
  //           </CardDescription>
  //         </CardHeader>
  //         <CardContent className="flex justify-center px-6 mb-6">
  //           <div
  //             className="relative cursor-pointer transition-transform hover:scale-105"
  //             onClick={() => handleChestSelect(index)}
  //           >
  //             <Image
  //               src={chest.image}
  //               alt=""
  //               width={256}
  //               height={256}
  //               className={`rounded-full border-4 transition-all duration-300 ${
  //                 currentChestIndex === index
  //                   ? "border-biloba-flower-600 shadow-lg"
  //                   : "border-biloba-flower-400 hover:border-biloba-flower-500"
  //               }`}
  //             />
  //             {currentChestIndex === index && (
  //               <div className="absolute inset-0 bg-biloba-flower-400/10 rounded-full flex items-center justify-center">
  //                 <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-biloba-flower-600">
  //                   Selected
  //                 </div>
  //               </div>
  //             )}
  //             <div className="absolute text-center bottom-[-8px] left-1/2 transform -translate-x-1/2 bg-white px-5 py-[2px] rounded-full border-biloba-flower-300 border-2">
  //               <span className="text-biloba-flower-800 text-lg font-bold">
  //                 ${chest.discountedPriceUSD}
  //               </span>
  //             </div>
  //           </div>
  //         </CardContent>
  //         <CardFooter className="flex flex-col justify-center mt-6">
  //           <Button
  //             onClick={handleBuyCurrentChest}
  //             disabled={currentChestIndex !== index}
  //             className={`
  //               transition-all duration-300
  //               ${
  //                 currentChestIndex === index
  //                   ? "bg-biloba-flower-600 hover:bg-biloba-flower-700"
  //                   : "bg-gray-400 cursor-not-allowed"
  //               }
  //             `}
  //           >
  //             {currentChestIndex === index
  //               ? `Buy ${chest.title}`
  //               : "Select Chest First"}
  //           </Button>
  //         </CardFooter>
  //       </Card>
  //     </CarouselItem>
  //   ),
  //   [currentChestIndex, handleBuyCurrentChest, handleChestSelect],
  // );

  return (
    <section className="bg-biloba-flower-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-biloba-flower-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(194 159 244)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader className="">
            <CardTitle className="flex flex-row flexBetween uppercase text-2xl text-center text-biloba-flower-400 pb-2">
              <Gift color="#c29ff4" size={36} />
              <p className="md:mx-4 mt-1">Treasure Chests</p>
              <Gift color="#c29ff4" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Discover the Riches Inside
              </span>
              <br />
              <br />
              Explore the assured savings offered by our ApeSafari Treasure
              Chest promotions. Every purchase provides you with ApeSafari
              tokens at a reduced price, guaranteeing greater value for your
              money.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flexCenter flex-col">
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-xs"
            >
              <CarouselContent>
                {treasureChests.map((chest, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/1 lg:basis-1/1"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex flex-col justify-center items-center text-xl md:text-lg text-center text-biloba-flower-400 ">
                          {chest.title}
                        </CardTitle>
                        <CardDescription className="flexCenter text-center text-base">
                          {chest.subtitle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex justify-center px-6 mb-6">
                        <div className="relative">
                          <Image
                            src={chest.image}
                            alt=""
                            width={256}
                            height={256}
                            className="rounded-full border-4 border-biloba-flower-400"
                          />
                          <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white text-gray-800 text-center px-5 py-[2px] rounded-full border-gray-300 border-2">
                            <span className="text-2xl font-bold">
                              ${chest.discountedPriceUSD}
                            </span>
                            {/* <br />
                            {current} of {count} */}
                          </div>
                        </div>
                      </CardContent>
                      {/* <CardFooter className="flex flex-col justify-center mt-6">
                        <CryptoButton
                          onBuyWithCrypto={() => handleBuyWithCrypto(index)}
                          className="btn-biloba-flower"
                          showHelpText={false}
                        >
                          Buy with Crypto
                        </CryptoButton>
                      </CardFooter> */}
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
          <CardFooter className="justify-center w-full mt-6">
            <DiscountButton
              onBuyWithDiscountAction={handleBuyCurrentChest}
              className="btn-biloba-flower"
              showHelpText={true}
            >
              Buy with Crypto
            </DiscountButton>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
