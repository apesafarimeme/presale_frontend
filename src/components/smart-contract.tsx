// src/components/smart-contract.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ReceiptText } from "lucide-react";

import CryptoButton from "@/components/ui/custom/crypto-button";

interface SmartContractProps {
  onBuyWithCryptoAction: (params: {
    discount: number;
    fixedTokenAmount: string;
    packageTitle: string;
    packagePrice: number;
  }) => void;
}

export const SmartContract = ({
  onBuyWithCryptoAction,
}: SmartContractProps) => {
  const handleBuyWithCrypto = () => {
    onBuyWithCryptoAction({
      discount: 0,
      fixedTokenAmount: "0",
      packageTitle: "Regular Purchase",
      packagePrice: 0,
    });
  };
  return (
    <section className="bg-illusion-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-illusion-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(238 120 187)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-receipt-text"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader className="">
            <CardTitle className="flex flex-row flexCenter pb-2">
              <ReceiptText color="#ee78bb" size={36} />
              <span className="mx-6 mb-1 tracking-wider uppercase text-3xl text-illusion-400 font-[family-name:var(--font-tribeca)] text-center">
                Smart Contract
              </span>
              <ReceiptText color="#ee78bb" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Built on Robust and Reliable Technology
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="font-bold">Blockchain</TableHead>
                  <TableCell>Binance Smart Chain (BSC)</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-bold">Contract Address</TableHead>
                  <TableCell className="break-all">
                    TOKEN ADDRESS
                    {/* TODO: Put token address here after deployment*/}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-bold">Token Symbol</TableHead>
                  <TableCell>AFA</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-bold">Token Decimals</TableHead>
                  <TableCell>18</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center w-full mt-6">
            <CryptoButton
              onBuyWithCryptoAction={handleBuyWithCrypto}
              className="btn-illusion"
            >
              Buy With Crypto
            </CryptoButton>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
