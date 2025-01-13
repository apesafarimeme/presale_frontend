// src/components/start-today.tsx

// "use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

import CryptoButton from "@/components/ui/custom/crypto-button";
import startToday from "../../public/assets/images/start.png";

interface StartTodayProps {
  onBuyWithCryptoAction: (params: {
    discount: number;
    fixedTokenAmount: string;
    packageTitle: string;
    packagePrice: number;
  }) => void;
}

export const StartToday = ({ onBuyWithCryptoAction }: StartTodayProps) => {
  const handleBuyWithCrypto = () => {
    onBuyWithCryptoAction({
      discount: 0,
      fixedTokenAmount: "0",
      packageTitle: "Regular Purchase",
      packagePrice: 0,
    });
  };
  return (
    <section className="bg-portage-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-portage-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(138 138 239)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader className="">
            <CardTitle className="flex flex-row flexCenter pb-2">
              <Calendar color="#8a8aef" size={36} />
              <span className="mx-6 mb-1 tracking-wider uppercase text-3xl text-portage-400 font-[family-name:var(--font-tribeca)] text-center">
                Start today
              </span>
              <Calendar color="#8a8aef" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Your Adventure Begins Now
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image
              src={startToday}
              alt="An ape dressed in safari clothes holding a calendar and pointing at it with his other hand."
              width={256}
              height={256}
              className="rounded-full border-4 border-portage-400"
            />
          </CardContent>
          <CardFooter className="justify-center w-full mt-6">
            <CryptoButton
              onBuyWithCryptoAction={handleBuyWithCrypto}
              className="btn-portage"
            >
              Buy with Crypto
            </CryptoButton>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
