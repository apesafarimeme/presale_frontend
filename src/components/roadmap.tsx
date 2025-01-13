// src/components/Roadmap.tsx

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { Map } from "lucide-react";

import idea from "../../public/assets/images/planning.png";
import development from "../../public/assets/images/developing.png";
import presale from "../../public/assets/images/waiting.png";
import community from "../../public/assets/images/waiting.png";
import dex from "../../public/assets/images/waiting.png";
import ewia from "../../public/assets/images/waiting.png";

const points = [
  {
    title: "Planning",
    image: idea,
    alt: "Five chimpanzees dressed in safari cloths studying a construction plan laying on the gound.",
    tag: "Completed",
    points: ["Idea", "Features", "Design"],
  },
  {
    title: "Development",
    image: development,
    alt: "Four chimpanzees dressed in safari cloths standing around a rocket.",
    tag: "Completed",
    points: ["Graphics", "Frontend", "Backend"],
  },
  {
    title: "Presale",
    image: presale,
    alt: "",
    tag: "Ongoing",
    points: ["Buying open", "Staking open", "Self Custody"],
  },
  {
    title: "Community",
    image: community,
    alt: "",
    tag: "Soon",
    points: ["CEX launch", "NFTs", "Airdrop"],
  },
  {
    title: "DEX",
    image: dex,
    alt: "",
    tag: "Soon",
    points: ["DEX launch", "Trading enabled", "Transfer enabled"],
  },
  {
    title: "ƐWIA",
    image: ewia,
    alt: "",
    tag: "Soon",
    points: ["Testnet Migration", "Mainnet Migration", "Swap enabled"],
  },
];

export const Roadmap = () => {
  return (
    <section className="bg-wax-flower-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-wax-flower-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(238 151 123)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader className="">
            <CardTitle className="flex flex-row flexCenter pb-2">
              <Map color="#ee977b" size={36} />
              <h2 className="mx-6 mb-1 tracking-wider uppercase text-3xl text-wax-flower-400 font-[family-name:var(--font-tribeca)] text-center">
                Roadmap
              </h2>
              <Map color="#ee977b" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Charting Our Path to Success
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-xs"
            >
              <CarouselContent>
                {points.map((point, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/1 lg:basis-1/1"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex flex-row justify-center items-center text-xl md:text-lg text-center text-wax-flower-400 ">
                          {point.title}
                        </CardTitle>
                        {/* <CardDescription></CardDescription> */}
                      </CardHeader>
                      <CardContent className="flex justify-center px-6 mb-4">
                        <div className="relative">
                          <Image
                            src={point.image}
                            alt=""
                            width={256}
                            height={256}
                            className="rounded-full border-4 border-wax-flower-400"
                          />
                          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 bg-white text-wax-flower-800 px-4 py-1 rounded-full border-wax-flower-300 border-2 whitespace-nowrap">
                            {point.tag}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col justify-center gap-5">
                        {point.points.map((point, index) => (
                          <div
                            key={index}
                            className="w-full text-center bg-wax-flower-100 border-2 border-wax-flower-300 p-3 rounded-lg"
                          >
                            <span className="font-medium text-gray-800">
                              {point}
                            </span>
                          </div>
                        ))}
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
          <CardFooter className="justify-center max-w-md w-full"></CardFooter>
        </Card>
      </div>
    </section>
  );
};
