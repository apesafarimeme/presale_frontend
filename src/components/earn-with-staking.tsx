// src/components/earn-with-staking.tsx

// "use client";

import Image from "next/image";
// import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { PiggyBankIcon } from "lucide-react";

import CryptoButton from "@/components/ui/custom/crypto-button";
import earn from "../../public/assets/images/earn.png";

interface EarnWithStakingProps {
  onBuyWithCryptoAction: (params: {
    discount: number;
    fixedTokenAmount: string;
    packageTitle: string;
    packagePrice: number;
  }) => void;
}

const countries = [
  { rank: 1, name: "South Africa", flag: "🇿🇦", totallyStaked: "467.3M" },
  { rank: 2, name: "Kenya", flag: "🇰🇪", totallyStaked: "391.2M" },
  { rank: 3, name: "Nigeria", flag: "🇳🇬", totallyStaked: "322.8M" },
  { rank: 4, name: "Ghana", flag: "🇬🇭", totallyStaked: "217.6M" },
  { rank: 5, name: "Ivory Coast", flag: "🇨🇮", totallyStaked: "146.1M" },
];

export const EarnWithStaking = ({
  onBuyWithCryptoAction,
}: EarnWithStakingProps) => {
  const handleBuyWithCrypto = () => {
    onBuyWithCryptoAction({
      discount: 0,
      fixedTokenAmount: "0",
      packageTitle: "Regular Purchase",
      packagePrice: 0,
    });
  };
  // const router = useRouter();
  return (
    <section
      id="earn"
      className="bg-cornflower-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min"
    >
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-cornflower-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(72 169 232)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-piggy-bank"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h.01"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader className="">
            <CardTitle className="flex flex-row flexCenter pb-2">
              <PiggyBankIcon color="#48a9e8" size={36} />
              <h2 className="mx-6 mb-1 tracking-wider uppercase text-3xl text-cornflower-400 font-[family-name:var(--font-tribeca)] text-center">
                Earn With Staking
              </h2>
              <PiggyBankIcon color="#48a9e8" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 flex-col flexCenter font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500 mb-7">
                Maximize Your Returns with Ease
              </span>
              {/* <br />
                <br /> */}
              <span>
                Start earning passively with ApeSafari staking! Just stake on
                the African country you&apos;re passionate about, and watch your
                earnings increase as these nations thrive. The more they grow,
                the more you earn. It&apos;s that simple!
                <br />
                <br />
              </span>
              <Image
                src={earn}
                alt="An ape dressed in safari clothes holding a calendar and pointing at it with his other hand."
                width={256}
                height={256}
                className="mt-4 rounded-full border-4 border-cornflower-400"
              />
            </CardDescription>
          </CardHeader>
          <CardContent id="earnwithstaking" className="flex-col flexCenter">
            <span className="text-gray-600 my-2">
              Check out the top 5 African countries below.
            </span>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Total Staked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {countries.map((country) => (
                  <TableRow
                    key={country.rank}
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                    // onClick={}
                  >
                    <TableCell className="font-bold">{country.rank}</TableCell>
                    <TableCell className="flex items-center">
                      <span className="mr-2 text-2xl">{country.flag}</span>
                      {country.name}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {country.totallyStaked}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center w-full mt-6">
            <CryptoButton
              onBuyWithCryptoAction={handleBuyWithCrypto}
              className="btn-cornflower"
            >
              Buy with Crypto
            </CryptoButton>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
