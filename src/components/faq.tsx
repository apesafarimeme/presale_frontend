// src/components/faq.tsx

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  // ChartTooltipContent,
} from "@/components/ui/card";
import { TableOfContents } from "lucide-react";

import CryptoButton from "@/components/ui/custom/crypto-button";
import faq from "../../public/assets/images/start.png";

interface FaqProps {
  onBuyWithCryptoAction: (params: {
    discount: number;
    fixedTokenAmount: string;
    packageTitle: string;
    packagePrice: number;
  }) => void;
}

export const Faq = ({ onBuyWithCryptoAction }: FaqProps) => {
  const handleBuyWithCrypto = () => {
    // Pass the colors
    onBuyWithCryptoAction({
      discount: 0,
      fixedTokenAmount: "0",
      packageTitle: "Regular Purchase",
      packagePrice: 0,
    });
  };

  return (
    <section
      id="faq"
      className="bg-grey-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min"
    >
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-primrose-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(138 138 239)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-of-contents"><path d="M16 12H3"/><path d="M16 18H3"/><path d="M16 6H3"/><path d="M21 12h.01"/><path d="M21 18h.01"/><path d="M21 6h.01"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader>
            <CardTitle className="flex flex-row flexCenter pb-2">
              <TableOfContents color="#8a8aef" size={36} />
              <h2 className="mx-6 mb-1 tracking-wider uppercase text-3xl text-portage-400 font-[family-name:var(--font-tribeca)] text-center">
                Faq
              </h2>
              <TableOfContents color="#8a8aef" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Your Questions Answered
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Image
              src={faq}
              alt="An ape dressed in safari clothes holding a calendar"
              width={256}
              height={256}
              className="rounded-full border-4 border-portage-400"
            />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq">
                <AccordionTrigger className="text-xl text-gray-400 text-center justify-center py-6">
                  Frequently Asked Questions
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 flex flex-col items-center text-center">
                    <div className="space-y-2 max-w-sm">
                      <h4 className="font-semibold">
                        What is ApeSafari Token?
                      </h4>
                      <p>
                        ApeSafari is a meme-inspired cryptocurrency aiming to
                        reach the moon!
                      </p>
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <h4 className="font-semibold">
                        How does the bonding curve work?
                      </h4>
                      <p>
                        The bonding curve determines the token price based on
                        the number of tokens sold. As more tokens are sold, the
                        price increases.
                      </p>
                    </div>
                    <div className="space-y-2 max-w-sm">
                      <h4 className="font-semibold">
                        When does the presale end?
                      </h4>
                      <p>
                        The presale lasts for 90 days or until all tokens are
                        sold, whichever comes first.
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
