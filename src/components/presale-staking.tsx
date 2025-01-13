// src/components/presale-staking.tsx

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
// import { Button } from "./ui/button";
import { Coins } from "lucide-react";
import StakeButton from "./ui/custom/stake-button";

// import CryptoButton from "@/components/ui/custom/crypto-button";
import staking from "../../public/assets/images/staking.png";

interface PresaleStakingProps {
  onPresaleStakingAction: () => void;
}

export const PresaleStaking = ({
  onPresaleStakingAction,
}: PresaleStakingProps) => {
  const handleClick = () => {
    console.log("Stake button clicked"); // Add debug log
    onPresaleStakingAction();
  };

  return (
    <section className="bg-water-leaf-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-water-leaf-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(49 208 206)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coins"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader className="">
            <CardTitle className="flex flex-row flexCenter pb-2">
              <Coins color="#31d0ce" size={36} />
              <h2 className="mx-6 mb-1 tracking-wider uppercase text-3xl text-water-leaf-400 font-[family-name:var(--font-tribeca)] text-center">
                Presale-Staking Fun
              </h2>
              <Coins color="#31d0ce" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Engage and Earn with Every Stake
              </span>
              <br />
              <br /> Get ready to dive into the fun world of ApeSafari Staking.
              As a staker, you can earn more ApeSafari coins by boosting the
              countries you like. And it&apos;s worry-free! Your ApeSafari coins
              are safe and cannot be lost via staking. Start your ApeSafari
              journey today - it&apos;s game-changing, rewarding, and heaps of
              fun!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image
              src={staking}
              alt="An ape dressed in safari clothes holding a calendar and pointing at it with his other hand."
              width={256}
              height={256}
              className="mt-4 rounded-full border-4 border-water-leaf-400"
            />
          </CardContent>
          <CardFooter className="justify-center w-full mt-6">
            {/* <Button
              onClick={handleClick} // Use the new handler
              className="btn-water-leaf"
            >
              Stake during Presale
            </Button> */}
            <StakeButton
              onStakeAction={handleClick} // Use the new handler
              className="btn-water-leaf"
            >
              Stake during Presale
            </StakeButton>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
