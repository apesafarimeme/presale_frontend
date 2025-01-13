// src/components/why-are-you-waiting

// "use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { AlarmClock } from "lucide-react";

import CryptoButton from "@/components/ui/custom/crypto-button";
import waiting from "../../public/assets/images/waiting.png";

interface WhyAreYouWatingProps {
  onBuyWithCryptoAction: (params: {
    discount: number;
    fixedTokenAmount: string;
    packageTitle: string;
    packagePrice: number;
  }) => void;
}

export const WhyAreYouWaiting = ({
  onBuyWithCryptoAction,
}: WhyAreYouWatingProps) => {
  const handleBuyWithCrypto = () => {
    onBuyWithCryptoAction({
      discount: 0,
      fixedTokenAmount: "0",
      packageTitle: "Regular Purchase",
      packagePrice: 0,
    });
  };
  return (
    <section className="bg-mint-green-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-mint-green-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(83 225 71)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-alarm-clock"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M5 3 2 6"/><path d="m22 6-3-3"/><path d="M6.38 18.7 4 21"/><path d="M17.64 18.67 20 21"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader>
            <CardTitle className="flex flex-row flexCenter pb-2">
              <AlarmClock color="#53e147" size={48} />
              <h2 className="mx-6 mb-1 tracking-wider uppercase text-3xl text-mint-green-400 font-[family-name:var(--font-tribeca)] text-center">
                Why are you waiting?
              </h2>
              <AlarmClock color="#53e147" size={48} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Seize the Opportunity Before It&apos;s Gone
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image
              src={waiting}
              alt="An ape dressed in safari clothes holding an alarm clock and pointing at it with his other hand."
              width={256}
              height={256}
              className="rounded-full border-4 border-mint-green-400"
            />
          </CardContent>
          <CardFooter className="justify-center w-full mt-6">
            <CryptoButton
              onBuyWithCryptoAction={handleBuyWithCrypto}
              className="btn-mint-green"
            >
              Buy with Crypto
            </CryptoButton>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
