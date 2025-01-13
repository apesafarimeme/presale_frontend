// src/components/disclaimer.tsx

"use client";

// import Image from "next/image";
import Link from "next/link";

// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// import CryptoButton from "./ui/custom/crypto-button";

//     fixedTokenAmount: string;
//     packageTitle: string;
//     packagePrice: number;
//   }) => void;
// }

export const Disclaimer = () => {
  // const auditReady = false;

  return (
    <footer className="bg-gray-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-gray-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e04a41' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-center space-x-2">
              {/* <Image
                  src={leftPalmTree}
                  alt="Palm Tree"
                  className="relative"
                  style={{
                    width: "30px",
                    height: "auto",
                  }}
                /> */}
              <h2 className="mx-3 tracking-wider uppercase text-3xl font-bold text-gray-950 font-[family-name:var(--font-tribeca)] text-center">
                ApeSafari
              </h2>
              {/* <Image
                  src={rightPalmTree}
                  alt="Palm Tree"
                  className="relative"
                  style={{
                    width: "30px",
                    height: "auto",
                  }}
                /> */}
            </div>

            {/* <Button className="w-full bg-cyan-100 hover:bg-cyan-200 text-cyan-600 font-semibold py-6">
              Buy with Crypto
            </Button> */}

            <div className="space-y-2">
              {/* <Button
                className="w-full bg-gray-100 text-gray-400 cursor-not-allowed py-6"
                disabled
              >
                Sell ApeMax
              </Button>
              <div className="text-gray-400 text-center text-sm">
                Coming Soon
              </div> */}
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <h3 className="font-bold mb-2 text-gray-600 uppercase">
                  about
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="#tokenomics"
                      className="text-gray-400 hover:underline"
                    >
                      Tokenomics
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:underline">
                      Guides
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 uppercase text-gray-600">docs</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="#" className="text-gray-400 hover:underline">
                      Whitepaper
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/audit"}
                      scroll={false}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="text-gray-400 hover:underline"
                    >
                      Audit Report
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-600 uppercase">
                  terms
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="#" className="text-gray-400 hover:underline">
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:underline">
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-gray-600 uppercase">
                  social
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="#" className="text-gray-400 hover:underline">
                      Twitter
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:underline">
                      Discord
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:underline">
                      Telegram
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* <CryptoButton
              onBuyWithCryptoAction={handleBuyWithCrypto}
              className="btn-gray"
            >
              Buy with Crypto
            </CryptoButton> */}

            <div className="text-xs text-gray-500 space-y-4">
              <h4 className="font-bold">DISCLAIMER</h4>
              <p>
                By purchasing ApeSafari, you agree to our Terms of Service and
                Privacy Policy. You affirm that you have fully read and
                understand the ApeSafari Disclaimer regarding the risks of
                purchasing cryptocurrencies such as ApeSafari. By completing a
                purchase, you confirm that you are not a citizen or resident of
                the United States, Canada, any prohibited country, or any other
                country where purchasing ApeSafari may be illegal. A complete
                list of restricted countries is available here. Please note that
                our list of blocked countries and terms of service may change,
                so always check the latest version.
              </p>
              <p>
                While you can stake your ApeSafari coins to potentially earn
                more, ApeSafari is intended as a fun way to support NGOs, IDOs,
                educational institution and other projects and is not an
                investment. We do not guarantee or claim that ApeSafari holds
                any intrinsic value. We do not promise that ApeSafari will
                increase in price after the presale or that it will retain any
                value thereafter. We make no representations or warranties about
                ApeSafari and are not liable for any losses or errors that may
                occur during its use. Users should proceed with caution and use
                ApeSafari entirely at their own risk.
              </p>
              <p>
                By using the ApeSafari platform and product, you accept it
                &quot;as is,&quot; acknowledging that we may not update,
                enhance, or maintain it regularly. The services and interface
                may become unavailable or be discontinued at any time. However,
                the underlying smart contract remains directly accessible on the
                blockchain, independent of our provided service or interface.
              </p>
              <p className="text-center mt-6">
                © 2024 ApeSafari. All Rights Reserved.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
};
