// components/staking/StakingCharts.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LineChart, TrendingUp, History } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Alert } from "@/components/ui/alert";
import { InfoTooltip } from "@/components/staking/common/InfoTooltip";
import { Card } from "@/components/ui/card";

import type {
  StakingChartsProps,
  APRDataPoint,
  HistoricalDataPoint,
} from "@/types/staking";

type ChartData = APRDataPoint | HistoricalDataPoint;
type NameType = keyof ChartData;

interface TooltipEntry {
  value: number;
  name: string;
  color: string;
  type: string;
}

interface CustomTooltipProps
  extends Omit<TooltipProps<number, NameType>, "payload"> {
  payload?: TooltipEntry[];
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload) return null;

  return (
    <Card className="p-2 !bg-white dark:!bg-gray-800 border shadow-lg">
      <div className="text-sm font-medium mb-1">Day {label}</div>
      {payload.map((entry, index) => (
        <div key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toFixed(2)}
          {entry.name === "APR" ? "%" : " tokens"}
        </div>
      ))}
    </Card>
  );
};

export const StakingCharts = ({
  selectedChart,
  setSelectedChart,
  aprData,
  historicalData,
  isLoading = false,
}: StakingChartsProps) => {
  // Add useEffect to log data changes
  useEffect(() => {
    console.log("StakingCharts received new data:", {
      dataLength: historicalData.length,
      data: historicalData,
    });
  }, [historicalData]);
  // Add console logs to track data changes
  useEffect(() => {
    console.log("Historical data updated:", historicalData);
  }, [historicalData]);

  // State for update tooltips
  const [showUpdateTooltip, setShowUpdateTooltip] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{
    title: string;
    message: string;
  } | null>(null);
  // Track previous data for comparison
  const [prevHistoricalData, setPrevHistoricalData] = useState(historicalData);
  // Check for data updates
  useEffect(() => {
    if (historicalData.length > prevHistoricalData.length) {
      // New data point added
      const latest = historicalData[historicalData.length - 1];
      const previous = historicalData[historicalData.length - 2];

      const stakeDiff = latest.userStaked - previous.userStaked;
      const totalStakeDiff = latest.totalStaked - previous.totalStaked;

      setUpdateMessage({
        title: "Chart Updated",
        message: `Your stake increased by ${stakeDiff.toFixed(
          2
        )} tokens. Total staked increased by ${totalStakeDiff.toFixed(
          2
        )} tokens.`,
      });
      setShowUpdateTooltip(true);

      // Hide tooltip after 5 seconds
      const timer = setTimeout(() => {
        setShowUpdateTooltip(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
    setPrevHistoricalData(historicalData);
  }, [historicalData, prevHistoricalData]);
  useEffect(() => {
    if (historicalData.length > prevHistoricalData.length) {
      console.log("New data point detected:", {
        previous: prevHistoricalData,
        current: historicalData,
      });
    }
  }, [historicalData, prevHistoricalData]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <div className="space-y-4 relative">
      {/* Chart Type Selection */}
      <div className="flex flex-col xs:flex-row gap-2">
        <div className="flex items-center">
          {/* Wrapper div for button and tooltip */}
          <Button
            variant={selectedChart === "apr" ? "default" : "outline"}
            onClick={() => setSelectedChart("apr")}
            className="text-xs sm:text-sm w-full xs:w-auto"
          >
            <TrendingUp className="w-4 h-4 mr-2 hidden xs:inline-block" />
            APR Projection
          </Button>
          <InfoTooltip
            content="Projected APR changes over the presale period"
            title="APR Chart"
            className="ml-2" // Add some spacing between button and tooltip
          />
        </div>

        <div className="flex items-center">
          {" "}
          {/* Wrapper div for button and tooltip */}
          <Button
            variant={selectedChart === "history" ? "default" : "outline"}
            onClick={() => setSelectedChart("history")}
            className="text-xs sm:text-sm w-full xs:w-auto"
          >
            <History className="w-4 h-4 mr-2 hidden xs:inline-block" />
            Staking History
          </Button>
          <InfoTooltip
            content="Historical data of total and your staked amounts"
            title="History Chart"
            className="ml-2"
          />
        </div>
      </div>

      {/* Update Tooltip */}
      <AnimatePresence>
        {showUpdateTooltip && updateMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 right-0 z-10"
          >
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <h3 className="font-medium text-green-900 dark:text-green-100">
                    {updateMessage.title}
                  </h3>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    {updateMessage.message}
                  </p>
                </div>
                <InfoTooltip
                  content={
                    <div className="space-y-2">
                      <p>Chart updated with new staking data:</p>
                      <ul className="list-disc pl-4">
                        <li>New data point added</li>
                        <li>Lines animated to new values</li>
                        <li>Historical trend updated</li>
                      </ul>
                    </div>
                  }
                  title="Chart Update Info"
                />
              </div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chart Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedChart} // This ensures animation triggers on chart type change
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="h-[200px] xs:h-[250px] sm:h-[300px] w-full"
        >
          {selectedChart === "apr" ? (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={aprData}
                margin={{ top: 20, right: 60, left: 40, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="day"
                  label={{
                    value: "Days",
                    position: "insideBottom",
                    offset: 0,
                    dy: 5,
                  }}
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                />
                <YAxis
                  label={{
                    value: "APR (%)",
                    angle: -90,
                    position: "insideLeft",
                    offset: 0,
                    dx: 0,
                    dy: 20,
                  }}
                  domain={[0, 500]}
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="apr"
                  name="APR"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationBegin={300}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={historicalData}
                margin={{ top: 20, right: 60, left: 60, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="day"
                  label={{
                    value: "Days",
                    position: "insideBottom",
                    offset: 0,
                    dy: 5,
                  }}
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: "Staked Amount",
                    angle: -90,
                    position: "insideLeft",
                    offset: 0,
                    dx: -20,
                    dy: 50,
                  }}
                  tickFormatter={formatYAxis}
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                  domain={["auto", "auto"]} // This will auto-scale based on data
                  // Or set specific range:
                  // domain={[0, dataMax => Math.ceil(dataMax * 1.2)]} // 20% padding
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: "APR (%)",
                    angle: 90,
                    position: "insideRight",
                    offset: 0,
                    dx: 0,
                    dy: 30,
                  }}
                  domain={[0, 500]}
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36} // Increase legend height
                  wrapperStyle={{ paddingTop: "10px" }} // Add padding above legend
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="totalStaked"
                  name="Total Staked"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="userStaked"
                  name="Your Stake"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationBegin={300} // Slight delay after first line
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="apr"
                  name="APR"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  animationBegin={600} // More delay for last line
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </AnimatePresence>
      {/* Loading State */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity },
            }}
          >
            <LineChart className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
