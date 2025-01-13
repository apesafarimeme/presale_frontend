// src/components/presale

"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  // useCallback
} from "react";
import {
  // useAccount,
  useReadContract,
  // useWriteContract,
  // useConfig,
} from "wagmi";

import { formatUnits } from "viem";

// import { Toast } from "./ui/toast";
import {
  Card,
  CardHeader,
  CardTitle,
  // CardDescription,
  CardContent,
  // CardFooter,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  // Tooltip as RechartsTooltip,
  // ResponsiveContainer,
  ReferenceLine,
  // Label,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  // ChartTooltip,
  // ChartTooltipContent,
} from "@/components/ui/chart";
import { HelpCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
// import { Separator } from "@/components/ui/separator";
import { Store } from "lucide-react";

import {
  ChartCard,
  ChartCardContent,
  ChartCardTitle,
  ChartCardFooter,
  ChartCardHeader,
} from "@/components/ui/custom/card-chart";

import CryptoButton from "@/components/ui/custom/crypto-button";

import { PRESALE_CONTRACT_ABI } from "@/backend/presaleABI";

import { PRESALE_CONTRACT_ADDRESS } from "@/backend/addresses";

import { PRICE_SCHEDULE } from "@/constants/price-schedule";
import { PRESALE_CONFIG } from "@/config/presale";
// import { priceCalculator } from "@/services/price-calculator";

interface PresaleState {
  data?: [bigint, bigint, bigint, bigint, string[], bigint[]];
  isError: boolean;
  isLoading: boolean;
}

// const dataPoints = 30; // One point per day
// const timePerPoint = 24 * 60 * 60; // One day in seconds

// const priceData = Array.from({ length: dataPoints }, (_, i) => {
//   const timepoint = PRICE_SCHEDULE.PRESALE_START + i * timePerPoint;
//   const price = PRICE_SCHEDULE.getPriceAtTime(timepoint);
//   return {
//     day: i.toString(), // or format as needed
//     price: price,
//   };
// });

const chartConfig = {
  desktop: {
    label: "Price",
    color: "hsl(50.27, 77.41%, 53.14%)",
  },
} satisfies ChartConfig;

interface PresaleProps {
  onBuyWithCryptoAction: (params: {
    discount: number;
    fixedTokenAmount: string;
    packageTitle: string;
    packagePrice: number;
  }) => void;
}

export const Presale = ({ onBuyWithCryptoAction }: PresaleProps) => {
  const handleBuyWithCrypto = () => {
    onBuyWithCryptoAction({
      discount: 0,
      fixedTokenAmount: "0",
      packageTitle: "Regular Purchase",
      packagePrice: 0,
    });
  };
  // Add presale end time state
  const [timeRemaining, setTimeRemaining] = useState<string>("Loading...");

  // Only fetch tokens sold from contract
  const { data: presaleState } = useReadContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: PRESALE_CONTRACT_ABI,
    functionName: "getPresaleState",
    // watch: true,
    // watchInterval: 30000, // Update every 30 seconds
  }) as PresaleState;

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Math.floor(Date.now() / 1000);

      if (now >= PRESALE_CONFIG.END_TIME) {
        setTimeRemaining("Presale ended");
        return;
      } else if (now < PRESALE_CONFIG.START_TIME) {
        setTimeRemaining("Presale has not started yet");
        return;
      }

      const remaining = PRESALE_CONFIG.END_TIME - now;
      const days = Math.floor(remaining / 86400);
      const hours = Math.floor((remaining % 86400) / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);

      setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 60000);
    return () => clearInterval(timer);
  }, []);

  // Generate bonding curve data
  const bondingCurveData = useMemo(() => {
    const dataPoints = 30; // One point per day for smoother curve
    return Array.from({ length: dataPoints }, (_, i) => {
      const timepoint = PRICE_SCHEDULE.PRESALE_START + i * 86400; // 86400 seconds per day
      console.log("bonding curve data - timepoint: ", timepoint);
      console.log(
        "bonding curve data - price: ",
        PRICE_SCHEDULE.getPriceAtTime(timepoint),
      );
      return {
        day: i.toString(),
        price: PRICE_SCHEDULE.getPriceAtTime(timepoint),
      };
    });
  }, []);

  // Get current values
  const currentPrice = PRICE_SCHEDULE.getCurrentPrice(); // Use getCurrentPrice from PRICE_SCHEDULE
  const formattedCurrentPrice = `$${currentPrice.toFixed(6)}`;

  const totalSold = presaleState
    ? Number(formatUnits(presaleState[0], PRESALE_CONFIG.TOKEN_DECIMALS))
    : 0;
  const usdRaised = presaleState ? Number(formatUnits(presaleState[1], 6)) : 0;
  const presaleCap = PRESALE_CONFIG.PRESALE_CAP as number;
  const progressPercentage = (totalSold / presaleCap) * 100;

  // Add this temporarily to check the prices
  useEffect(() => {
    console.log("Price Schedule:", PRICE_SCHEDULE.getAllPrices());
    console.log("First day price:", PRICE_SCHEDULE.DAILY_PRICES[0].priceUSD);
    console.log("Last day price:", PRICE_SCHEDULE.DAILY_PRICES[29].priceUSD);
    console.log("Current price:", PRICE_SCHEDULE.getCurrentPrice());
  }, []);

  return (
    <section className="bg-primrose-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-primrose-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(228 198 43)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader className="">
            <CardTitle className="flex flex-row flexCenter pb-2">
              <Store color="#e4c62b" size={36} />
              <h2 className="mx-6 mb-1 tracking-wider text-3xl uppercase text-primrose-400 font-[family-name:var(--font-tribeca)] text-center">
                Presale
              </h2>
              <Store color="#e4c62b" size={36} />
            </CardTitle>
            <div className="pt-3 font-normal text-center text-lg px-2">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Current Price</p>
                {/* Current Price */}
                <p className="text-2xl font-bold">{formattedCurrentPrice}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Presale Progress</span>
                <span className="text-sm font-medium"></span>
              </div>
              {/* Progress bar */}
              <Progress value={progressPercentage} className="h-4" />
              <div className="flex flex-row flexBetween mt-1 text-xs text-muted-foreground">
                {/* Tokens sold / total supply */}
                <span className="flexStart">
                  Tokens sold&nbsp;:&nbsp;{totalSold.toLocaleString()}
                  &nbsp;/&nbsp;{PRESALE_CONFIG.PRESALE_CAP.toLocaleString()}
                </span>
                <span className="flexEnd">
                  {usdRaised.toLocaleString()}&nbsp;USD raised
                </span>
              </div>
            </div>

            <div className="text-center my-4">
              <p className="text-sm text-muted-foreground mb-1">
                Presale ends in
              </p>
              {/* Time remaining */}
              <p className="text-3xl font-bold">{timeRemaining}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Total presale duration: 30 days
              </p>
            </div>

            <ChartCard>
              <ChartCardHeader>
                <ChartCardTitle className="text-lg text-center">
                  Price Curve
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 inline-block ml-2" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-center">
                          The price curve shows how the token price increases{" "}
                          <br /> every 24 hours. <br /> The red line the current
                          price.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </ChartCardTitle>
              </ChartCardHeader>
              <ChartCardContent>
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    width={500}
                    height={300}
                    data={bondingCurveData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="day"
                      label={{ value: "Days", position: "bottom" }}
                      domain={[0, PRESALE_CONFIG.DURATION_DAYS]}
                    />
                    <YAxis
                      domain={[
                        PRESALE_CONFIG.INITIAL_PRICE_USD,
                        PRESALE_CONFIG.FINAL_PRICE_USD,
                      ]}
                      tickFormatter={(value) => value.toFixed(4)}
                      scale="linear"
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={chartConfig.desktop.color}
                      fill={chartConfig.desktop.color}
                      fillOpacity={0.1}
                      isAnimationActive={false}
                    />
                    <ReferenceLine
                      y={currentPrice}
                      stroke="red"
                      strokeDasharray="3 3"
                      label={{
                        value: `$${currentPrice.toFixed(4)}`,
                        position: "right",
                      }}
                    />
                  </AreaChart>
                </ChartContainer>
              </ChartCardContent>
            </ChartCard>
          </CardContent>
          <ChartCardFooter className="flex-col w-full mt-6">
            <CryptoButton
              onBuyWithCryptoAction={handleBuyWithCrypto}
              className="btn-primrose"
            >
              Buy with Crypto
            </CryptoButton>
          </ChartCardFooter>
        </Card>
      </div>
    </section>
  );
};
