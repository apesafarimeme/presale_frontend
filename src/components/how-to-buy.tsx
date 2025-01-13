// src/components/HowToBuy.tsx

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CryptoButton from "@/components/ui/custom/crypto-button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ShoppingBasket } from "lucide-react";

import howToBuy from "../../public/assets/images/howtobuy.png";

interface HowToBuyProps {
  onBuyWithCryptoAction: (params: {
    discount: number;
    fixedTokenAmount: string;
    packageTitle: string;
    packagePrice: number;
  }) => void;
}

export const HowToBuy = ({ onBuyWithCryptoAction }: HowToBuyProps) => {
  const handleBuyWithCrypto = () => {
    onBuyWithCryptoAction({
      discount: 0,
      fixedTokenAmount: "0",
      packageTitle: "Regular Purchase",
      packagePrice: 0,
    });
  };
  return (
    <section
      id="howtobuy"
      className="bg-sea-pink-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min"
    >
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-sea-pink-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(239 125 136)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-basket"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card
          id="howtobuy"
          className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white"
        >
          <CardHeader>
            <CardTitle className="flex flex-row flexCenter pb-2">
              <ShoppingBasket color="#ef7d88" size={36} />
              <h2 className="mx-6 mb-1tracking-wider uppercase text-3xl text-sea-pink-400 font-[family-name:var(--font-tribeca)] text-center">
                How to buy?
              </h2>
              <ShoppingBasket color="#ef7d88" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Get Started with Ease and Confidence
              </span>
              <br />
              <br />
              <span className="text-center">
                The ApeSafari purchase process is crafted for ease and
                simplicity! If you encounter any issues, our support team is
                here to help and will respond promptly.
                <br />
                <br />
              </span>
              <span className="text-center">
                You can buy ApeSafari using any of six major cryptocurrencies:
                BNB, USDT, USDC, DAI, BUSD and ETH. Just click the button below
                and follow the on-screen steps to complete your purchase
                effortlessly!
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Image
              src={howToBuy}
              alt="An ape dressed in safari clothes holding a calendar and pointing at it with his other hand."
              width={256}
              height={256}
              className="rounded-full border-4 border-sea-pink-400"
            />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="htb">
                <AccordionTrigger className="text-xl text-gray-400 text-center justify-center py-6">
                  3 Steps to Buy ApeSafari
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 flex flex-col items-center text-center">
                    <div className="space-y-2 max-w-sm">
                      <h4 className="font-semibold">Step 1: Create a Wallet</h4>
                      <p>
                        If you already have a compatible wallet, proceed to step
                        2. If you don’t, we suggest using MetaMask, which is
                        available as a browser extension for Desktop and as a
                        mobile app. Just head to the MetaMask download page.
                      </p>
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <h4 className="font-semibold">Step2: Fund your Wallet</h4>
                      <p>
                        You can purchase directly in MetaMask using a credit
                        card or transfer funds from a crypto exchange to your
                        wallet. We accept BNB, USDT, USDC, DAI, BUSD and ETH.
                      </p>
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <h4 className="font-semibold">
                        Step3: Buy and Stake ApeSafari
                      </h4>
                      <p>
                        To maximize your gains, connect your wallet to our
                        website, select a payment method, and decide how much
                        ApeSafari you&apos;d like to purchase. You can then
                        either buy or buy and stake for even bigger rewards!
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter className="justify-center w-full mt-6">
            <CryptoButton
              onBuyWithCryptoAction={handleBuyWithCrypto}
              className="btn-sea-pink"
            >
              Buy with Crypto
            </CryptoButton>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
