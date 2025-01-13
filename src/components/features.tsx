// src/components/features.tsx

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
import { Star } from "lucide-react";

import bestPrice from "../../public/assets/images/presale.png";
import selfCustody from "../../public/assets/images/custody.png";
import realTokenomics from "../../public/assets/images/tokenomics.png";
import buyEarnSave from "../../public/assets/images/buy.png";

const features = [
  {
    title: "Best price now",
    image: bestPrice,
    alt: "",
    tag: "Presale",
    points: ["Auto price increase", "Presale Staking 500% APR", "Fair sale"],
  },
  {
    title: "Instant custody",
    image: selfCustody,
    alt: "",
    tag: "All Yours",
    points: ["Self custody", "No hidden fees", "Rug pull save"],
  },
  {
    title: "Real tokenomics",
    image: realTokenomics,
    alt: "",
    tag: "Fun",
    points: ["Decentralized protocol", "Fun staking mechanics", "Easy to use"],
  },
  {
    title: "Buy, earn & save",
    image: buyEarnSave,
    alt: "",
    tag: "Easy",
    points: ["Instant Transfer", "Instant Staking", "NFT Discount"],
  },
];

export const Features = () => {
  return (
    <section className="bg-madang-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-madang-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(48 215 133)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader className="">
            <CardTitle className="flex flex-row flexCenter pb-2">
              <Star color="#30d785" size={36} />
              <h2 className="mx-6 mb-1 tracking-wider text-3xl text-madang-400 font-[family-name:var(--font-tribeca)] text-center">
                Features
              </h2>
              <Star color="#30d785" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Unveiling the Power of ApeSafari
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
                {features.map((feature, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/1 lg:basis-1/1"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex flex-row justify-center items-center text-xl md:text-lg text-center text-madang-400 ">
                          {feature.title}
                        </CardTitle>
                        {/* <CardDescription></CardDescription> */}
                      </CardHeader>
                      <CardContent className="flex justify-center px-6 mb-4">
                        <div className="relative">
                          <Image
                            src={feature.image}
                            alt=""
                            width={256}
                            height={256}
                            className="rounded-full border-4 border-madang-400"
                          />
                          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 bg-white text-madang-800 px-4 py-1 rounded-full border-madang-300 border-2 whitespace-nowrap">
                            {feature.tag}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col justify-center gap-5">
                        {feature.points.map((point, index) => (
                          <div
                            key={index}
                            className="w-full text-center bg-madang-100 border-2 border-madang-300 p-3 rounded-lg"
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
          <CardFooter className="justify-center max-w-md w-full">
            {/* <BuyWithCrypto baseColor="btn_green" /> */}
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
