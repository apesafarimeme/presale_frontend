import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
// import { LucideIcon } from "lucide-react";
import { InfoTooltip } from "@/components/staking/common/InfoTooltip";
import CountUp from "react-countup";
import { Skeleton } from "@/components/ui/skeleton";

import type { StatCardProps } from "@/types/staking";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
};

const valueVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const StatCard = ({
  cardTitle, // Changed from 'title',
  value,
  tooltip,
  tooltipTitle, // Keep as tooltipTitle
  icon: Icon,
  symbol,
  highlightChange,
  isLoading = false,
  trend,
  className,
}: StatCardProps) => {
  // Format the value for CountUp
  const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""));

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={cn(
        "relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700",
        "bg-white dark:bg-gray-800 p-4 shadow-sm transition-shadow duration-200",
        "hover:shadow-md",
        className,
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent" />
      </div>

      {/* Content */}
      <div className="relative space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700
                            transition-colors duration-200"
            >
              <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {cardTitle} {/* Changed from title */}
            </span>
            <InfoTooltip content={tooltip} title={tooltipTitle} />
          </div>

          <AnimatePresence>
            {trend && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium",
                  trend === "up" ? "text-green-500" : "text-red-500",
                )}
              >
                {trend === "up" ? "↑" : "↓"}
                <span className="hidden sm:inline">
                  {trend === "up" ? "Increase" : "Decrease"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          variants={valueVariants}
          className="text-lg font-bold text-gray-900 dark:text-gray-100"
        >
          {isLoading ? (
            <Skeleton className="h-7 w-24" />
          ) : highlightChange && !isNaN(numericValue) ? (
            <CountUp
              start={0}
              end={numericValue}
              duration={2}
              separator=","
              decimals={2}
              suffix={symbol ? ` ${symbol}` : ""}
              className="tabular-nums"
            />
          ) : (
            <span className="tabular-nums">
              {value} {symbol}
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  // Animation for numbers
  // const CountUpAnimation = ({
  //   value,
  //   duration,
  // }: {
  //   value: string;
  //   duration: number;
  // }) => {
  //   const numericValue = parseFloat(value);

  //   return (
  //     <motion.span
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       <CountUp
  //         start={0}
  //         end={numericValue}
  //         duration={duration}
  //         separator=","
  //         decimals={2}
  //         suffix={value.replace(/[\d.]/g, "")} // Preserve any non-numeric suffix
  //       />
  //     </motion.span>
  //   );
  // };
};
