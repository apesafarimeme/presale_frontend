// src/components/Tokenomics.tsx

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { ChartPie } from "lucide-react";

import CryptoButton from "@/components/ui/custom/crypto-button";

interface TokenomicsProps {
  onBuyWithCryptoAction: (params: {
    discount: number;
    fixedTokenAmount: string;
    packageTitle: string;
    packagePrice: number;
  }) => void;
}

const chartData = [
  {
    name: "presale",
    value: 30,
    color: "hsl(var(--chart-1))",
  },
  {
    name: "rewards",
    value: 55,
    color: "hsl(var(--chart-2))",
  },
  {
    name: "liquidity",
    value: 10,
    color: "hsl(var(--chart-3))",
  },
  {
    name: "community",
    value: 2,
    color: "hsl(var(--chart-4))",
  },
  { name: "team", value: 1, color: "hsl(var(--chart-5))" },
  {
    name: "marketing",
    value: 1,
    amount: "20 bio.",
    color: "hsl(var(--chart-6))",
  },
  {
    name: "development",
    value: 1,
    amount: "20 bio.",
    color: "hsl(var(--chart-7))",
  },
];

const chartConfig = {
  presale: {
    label: "Presale",
    color: "hsl(var(--chart-1))",
  },
  rewards: {
    label: "Rewards",
    color: "hsl(var(--chart-2))",
  },
  liquidity: {
    label: "Liquidity",
    color: "hsl(var(--chart-3))",
  },
  community: {
    label: "Community",
    color: "hsl(var(--chart-4))",
  },
  team: {
    label: "Team",
    color: "hsl(var(--chart-5))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-6))",
  },
  development: {
    label: "Development",
    color: "hsl(var(--chart-7))",
  },
} satisfies ChartConfig;

export const Tokenomics = ({ onBuyWithCryptoAction }: TokenomicsProps) => {
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
      id="tokenomics"
      className="bg-lavender-rose-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min"
    >
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-lavender-rose-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(232 130 240)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-pie"><path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader className="">
            <CardTitle className="flex flex-row flexCenter pb-6">
              <ChartPie color="#e882f0" size={36} />
              <h2 className="mx-6 mb-1 tracking-wider uppercase text-3xl text-lavender-rose-400 font-[family-name:var(--font-tribeca)] text-center">
                Tokenomics
              </h2>
              <ChartPie color="#e882f0" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Explore the Economy of ApeSafari
              </span>
              <br />
              <br />
              Experience the thrill of the wild with ApeSafari, more than just
              your average cryptocurrency!
              <br />
              ApeSafari isn&apos;t just captiving with its charming mascot;
              it&apos;s a vibrant new player in the crypto arena, offering an
              engaging and playful experience combined with innovative
              tokenomics. With its exclusive, limited token supply, ApeSafari is
              set to be the next standout meme coin that captures the
              imagination of the market.
              <br />
              <br />
              Unleash the full potential of ApeSafari by diving into our
              detailed whitepaper, where adventure and opportunity await!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col pb-0">
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    // cx="50%"
                    // cy="50%"
                    innerRadius={50}
                    // outerRadius={80}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <ChartLegend
                    content={<ChartLegendContent nameKey="name" />}
                    className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="justify-center w-full mt-6">
            <CryptoButton
              onBuyWithCryptoAction={handleBuyWithCrypto}
              className="btn-lavender-rose"
            >
              Buy with Crypto
            </CryptoButton>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
