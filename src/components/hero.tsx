"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

import { useConnect } from "wagmi";

// import BuyButton from "./BuyButton";
import savanna from "../../public/assets/images/savanna.png";
import apeSafari from "../../public/assets/images/apesafari_logo.svg";
import rightPalmTree from "../../public/assets/images/palmTree_r.png";
import leftPalmTree from "../../public/assets/images/palmTree_l.png";

const imageStyle = {
  border: "1px solid #fff",
  width: "100%",
  height: "auto",
};

export const Hero = () => {
  const { connectors, connect } = useConnect();
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [
    isBuyOpen,
    // setIsBuyOpen
  ] = useState(false);
  const toggleConnectOpen = () => {
    console.log("connect button clicked");
    setIsConnectOpen(!isConnectOpen);
  };
  // const toggleBuyOpen = () => {
  //   console.log("buy button clicked");
  //   setIsBuyOpen(!isBuyOpen);
  // };
  // const buyWithCrypto = () => {
  //   console.log("buy with crypto");
  // };

  return (
    <section className="bg-flesh-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      {/* enclosing container */}
      <div className="pt-2 md:max-w-[768px] w-full">
        <div className="hidden">
          <Image
            src={leftPalmTree}
            alt="Palm Tree"
            priority={true}
            className="relative"
            style={{
              width: "48px",
              height: "60px",
            }}
          />
          <Image
            src={apeSafari}
            alt="ApeSafari Logo"
            className="rounded-full mx-4 mt-6"
            style={{
              width: "242px",
              height: "50px",
            }}
          />
          <Image
            src={rightPalmTree}
            alt="Palm Tree"
            priority={true}
            className="relative"
            style={{
              width: "48px",
              height: "60px",
            }}
          />
        </div>
        {/* button section */}
        <div className="flex flex-col w-full">
          <div className="flex flex-col md:h-[80px] md:flex-row md:flexEnd md:gap-4">
            {/* <BuyButton
              type="button"
              title="Buy with crypto"
              icon=""
              // py-3 px-6 rounded-full text-xl font-semibold mb-6 transition-colors duration-100 cursor-pointer
              variant="btn-flesh text-white"
              callback={toggleBuyOpen} // Corrected line
            /> */}
            {/* <button
              className="py-3 px-6 bg-tree-poppy-500 text-tree-poppy-950 rounded-full text-xl font-semibold mb-6 cursor-pointer"
              // onClick={toggleConnectOpen}
            >
              Connect Wallet
            </button> */}
            {isBuyOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black">
                  <div className="absolute inset-10 bg-white rounded-3xl shadow-xl">
                    <div className="p-6 pb-0">
                      <button
                        // onClick={toggleBuyOpen}
                        className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-100"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>

                      <h2 className="text-2xl font-bold text-center mb-6">
                        Choose Currency
                      </h2>
                      <h3 className="text-center text-2xl font-bold mb-4">
                        Select the crypto currency you want to pay with.
                      </h3>
                    </div>
                    <div className="p-6 pt-2 space-y-3">
                      {/* {currencies.map((currency, index) => (
                        <button
                          key={index}
                          className="w-full flex items-center gap-3 p-4 bg-sky-50 rounded-xl hover:bg-sky-500 transition-colors duration-100 hover:cursor-pointer"
                          onClick={() => {
                            buyWithCrypto();
                          }}
                        >
                          <span className="text-lg">{currency.name}</span>
                        </button>
                      ))} */}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isConnectOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black">
                  <div className="absolute inset-10 bg-white rounded-3xl shadow-xl">
                    <div className="p-6 pb-0">
                      <button
                        onClick={toggleConnectOpen}
                        className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-100"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>

                      <h2 className="text-2xl font-bold text-center mb-6">
                        Connect Wallet
                      </h2>
                      <h3 className="text-2xl font-bold mb-4">
                        Select Wallet Provider
                      </h3>
                    </div>
                    <div className="p-6 pt-2 space-y-3">
                      {connectors.map((connector) => (
                        <button
                          key={connector.uid}
                          className="w-full flex items-center gap-3 p-4 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors"
                          onClick={() => {
                            connect({ connector });
                          }}
                        >
                          {/* <span className="flex-shrink-0">{wallet.icon}</span> */}
                          <span className="text-lg">{connector.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* </div> */}

        {/* hero section */}
        <div className="bg-white rounded-xl p-2 shadow-lg">
          <Image
            src={savanna}
            alt=""
            style={imageStyle}
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};
