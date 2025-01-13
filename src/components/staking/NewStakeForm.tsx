// components/staking/NewStakeForm.tsx

"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { soundManager } from "@/utils/sound";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoTooltip } from "@/components/staking/common/InfoTooltip";
import { Calculator, CalendarDays, TrendingUp, Coins } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Card } from "@/components/ui/card";
import {
  Wallet,
  // Calculator,
  Clock,
  AlertTriangle,
  AlertCircle,
  Check,
} from "lucide-react";
import { formatNumber } from "@/utils/formatters";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

import { NewStakeFormProps } from "@/types/staking";
import { toast } from "sonner";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  calculateRewards,
  calculateCompoundRewards,
  // getCurrentAPR,
} from "@/utils/aprCalculations";

import { getCurrentPresaleDay } from "@/utils/presaleTime";

// Add type for validation state
type ValidationStateType = {
  isValid: boolean;
  message: string;
  type: "success" | "warning" | "error" | null;
};

export const NewStakeForm = ({
  availableBalance,
  tokenSymbol,
  stakeAmount,
  setStakeAmount,
  onStake,
  isStaking,
  minStakeAmount = "100",
  maxStakeAmount,
  currentAPR,
}: NewStakeFormProps) => {
  // Reward calculation functions
  // const calculateRewards = (amount: string, days: number, apr: number) => {
  //   const amountNum = parseFloat(amount);
  //   if (isNaN(amountNum)) return 0;

  //   const dailyRate = apr / 365 / 100;
  //   return amountNum * dailyRate * days;
  // };

  // const calculateCompoundRewards = (
  //   amount: string,
  //   days: number,
  //   apr: number
  // ) => {
  //   const amountNum = parseFloat(amount);
  //   if (isNaN(amountNum)) return 0;

  //   const dailyRate = apr / 365 / 100;
  //   return amountNum * Math.pow(1 + dailyRate, days) - amountNum;
  // };

  // Generate reward projections when stake amount changes
  const rewardProjections = useMemo(() => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return null;

    return {
      daily: calculateRewards(stakeAmount, 1, currentAPR),
      weekly: calculateRewards(stakeAmount, 7, currentAPR),
      monthly: calculateRewards(stakeAmount, 30, currentAPR),
      quarterly: calculateRewards(stakeAmount, 90, currentAPR),
      compounded: {
        monthly: calculateCompoundRewards(stakeAmount, 30, currentAPR),
        quarterly: calculateCompoundRewards(stakeAmount, 90, currentAPR),
      },
    };
  }, [stakeAmount, currentAPR]);

  // Add debug logging
  useEffect(() => {
    if (stakeAmount && parseFloat(stakeAmount) > 0) {
      console.log("Reward Projections:", {
        stakeAmount,
        currentAPR,
        projections: rewardProjections,
      });
    }
  }, [stakeAmount, currentAPR, rewardProjections]);

  // Add state for hover preview
  const [previewAmount, setPreviewAmount] = useState<string | null>(null);
  // Add ref for the range bar
  const rangeRef = useRef<HTMLDivElement>(null);

  // Helper function to calculate amount from position
  const calculateAmountFromPosition = (clientX: number) => {
    if (!rangeRef.current) return null;

    const rect = rangeRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = x / rect.width;

    const minAmount = parseFloat(minStakeAmount);
    const maxAmount = parseFloat(maxStakeAmount ?? availableBalance);
    const range = maxAmount - minAmount;
    let amount = minAmount + range * percentage;

    // Clamp the amount
    amount = Math.max(minAmount, Math.min(maxAmount, amount));

    return amount.toFixed(6);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const amount = calculateAmountFromPosition(e.clientX);
    if (amount) {
      setPreviewAmount(amount);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const amount = calculateAmountFromPosition(e.clientX);
    if (amount) {
      setStakeAmount(amount);
      setPreviewAmount(null);
      soundManager.playClick().catch(console.error);
    }
  };

  // Add function to handle range bar clicks
  // const handleRangeClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const rect = event.currentTarget.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const percentage = x / rect.width;

  //   // Calculate amount based on percentage, considering min and max bounds
  //   const minAmount = parseFloat(minStakeAmount);
  //   const maxAmount = parseFloat(maxStakeAmount ?? availableBalance);
  //   const range = maxAmount - minAmount;
  //   let amount = minAmount + range * percentage;

  //   // Clamp the amount between min and max
  //   amount = Math.max(minAmount, Math.min(maxAmount, amount));

  //   // Format to avoid too many decimal places
  //   const formattedAmount = amount.toFixed(6);

  //   // Play click sound and set amount
  //   soundManager.playClick().catch(console.error);
  //   setStakeAmount(formattedAmount);
  // };

  // Add state for validation messages
  // Update state with proper type
  const [validationState, setValidationState] = useState<ValidationStateType>({
    isValid: false,
    message: "",
    type: null,
  });

  // Validation function
  const validateAmount = useCallback(
    (amount: string): ValidationStateType => {
      if (!amount) {
        return { isValid: false, message: "", type: null };
      }

      const value = parseFloat(amount);
      const minAmount = parseFloat(minStakeAmount);
      const maxAmount = maxStakeAmount ? parseFloat(maxStakeAmount) : Infinity;
      const available = parseFloat(availableBalance);

      if (isNaN(value)) {
        return {
          isValid: false,
          message: "Please enter a valid number",
          type: "error" as const,
        };
      }

      if (value <= 0) {
        return {
          isValid: false,
          message: "Amount must be greater than 0",
          type: "error" as const,
        };
      }

      if (value < minAmount) {
        return {
          isValid: false,
          message: `Minimum stake amount is ${formatNumber(
            minStakeAmount,
          )} ${tokenSymbol}`,
          type: "error" as const,
        };
      }

      if (value > maxAmount) {
        return {
          isValid: false,
          message: `Maximum stake amount is ${formatNumber(
            maxStakeAmount!,
          )} ${tokenSymbol}`,
          type: "error" as const,
        };
      }

      if (value > available) {
        return {
          isValid: false,
          message: "Amount exceeds available balance",
          type: "error" as const,
        };
      }

      if (value > available * 0.9) {
        return {
          isValid: true,
          message: "Consider keeping some tokens for transaction fees",
          type: "warning" as const,
        };
      }

      return {
        isValid: true,
        message: "Valid amount",
        type: "success" as const,
      };
    },
    [minStakeAmount, maxStakeAmount, availableBalance, tokenSymbol],
  );

  // Update validation on amount change
  useEffect(() => {
    setValidationState(validateAmount(stakeAmount));
  }, [stakeAmount, validateAmount]);

  // Initialize sound
  useEffect(() => {
    soundManager.init();
  }, []);

  // Calculate percentage of available balance
  const calculatePercentage = () => {
    if (!stakeAmount || !availableBalance) return 0;
    const percentage =
      (parseFloat(stakeAmount) / parseFloat(availableBalance)) * 100;
    return Math.min(100, Math.max(0, percentage)); // Clamp between 0 and 100
  };

  // Get progress bar color based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage > 90) return "bg-red-500";
    if (percentage > 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  // const percentage = calculatePercentage();

  const calculateAmountForPercentage = (percentage: number) => {
    const amount = parseFloat(availableBalance) * (percentage / 100);
    return formatNumber(amount.toString());
  };

  // Add handler for quick select
  const handleQuickSelect = async (percentage: number) => {
    const amount = (
      parseFloat(availableBalance) *
      (percentage / 100)
    ).toString();
    setStakeAmount(amount);
    try {
      await soundManager.playClick();
    } catch (error) {
      console.error("Failed to play click sound:", error);
    }
  };

  const handleInputChange = (value: string) => {
    // Remove any non-numeric characters except decimal point
    const sanitizedValue = value.replace(/[^0-9.]/g, "");
    // Prevent multiple decimal points
    const decimalPoints = sanitizedValue.match(/\./g)?.length ?? 0;
    if (decimalPoints > 1) return;

    // Prevent negative values
    if (parseFloat(sanitizedValue) < 0) return;

    console.log("Input changed:", {
      value: sanitizedValue,
      min: minStakeAmount,
      max: maxStakeAmount,
      available: availableBalance,
    });

    // Check if exceeds available balance
    if (
      maxStakeAmount &&
      parseFloat(sanitizedValue) > parseFloat(maxStakeAmount)
    ) {
      toast.warning("Amount exceeds available balance");
      setStakeAmount(maxStakeAmount);
      return;
    }

    setStakeAmount(sanitizedValue);
  };

  const handleMaxAmount = () => {
    // Only set max and show notification if the current amount isn't already max
    if (stakeAmount !== availableBalance) {
      console.log("Setting max amount:", availableBalance);
      setStakeAmount(availableBalance);
      toast.info(
        `Set maximum available amount: ${availableBalance} ${tokenSymbol}`,
      );
    }
  };

  const isValidAmount = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) return false;
    if (amount < parseFloat(minStakeAmount)) return false;
    if (maxStakeAmount && amount > parseFloat(maxStakeAmount)) return false;
    return true;
  };

  // Calculate estimated rewards
  // const calculateEstimatedRewards = () => {
  //   const amount = parseFloat(stakeAmount || "0");
  //   const apr = 350.5; // Current APR
  //   const days = 90; // Lock period
  //   return ((amount * apr) / 100) * (days / 365);
  // };

  const handleStakeSubmit = async () => {
    try {
      const hash = await onStake();
      if (!hash) return;

      toast.success("Transaction submitted");
      // The component's existing UI will show the staking state
    } catch (error) {
      console.error("Staking error:", error);
      toast.error("Failed to stake tokens");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Input Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Wallet className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Amount to Stake
            </label>

            <InfoTooltip
              content={
                <div className="space-y-2">
                  <p>
                    Minimum stake: {formatNumber(minStakeAmount)} {tokenSymbol}
                  </p>
                  {maxStakeAmount && (
                    <p>
                      Maximum stake: {formatNumber(maxStakeAmount)}{" "}
                      {tokenSymbol}
                    </p>
                  )}
                  <p>
                    Available: {formatNumber(availableBalance)} {tokenSymbol}
                  </p>
                </div>
              }
              title="Stake Limits"
            />
          </div>
          <span className="text-sm text-gray-500">
            Available: {formatNumber(availableBalance)} {tokenSymbol}
          </span>
        </div>

        <div className="flex flex-col xs:flex-row gap-2">
          <div className="flex-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter amount"
                value={stakeAmount}
                onChange={(e) => handleInputChange(e.target.value)}
                className="text-xs sm:text-sm"
                disabled={isStaking}
              />
              {/* Add min/max indicators */}
              <TooltipProvider>
                <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-1 px-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 cursor-help">
                        <span>Min:</span>
                        <span className="font-medium">
                          {formatNumber(minStakeAmount)} {tokenSymbol}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs">
                      Minimum required stake amount
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 cursor-help">
                        <span>Max:</span>
                        <span className="font-medium">
                          {formatNumber(maxStakeAmount ?? availableBalance)}{" "}
                          {tokenSymbol}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="text-xs">
                      Maximum allowed stake amount
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
              {/* Range bar with preview and drag support */}
              <div
                ref={rangeRef}
                className="h-1 bg-gray-200 dark:bg-gray-700 mt-1 rounded-full relative cursor-pointer"
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setPreviewAmount(null)}
              >
                {/* Valid range indicator */}
                <div
                  className="absolute h-full bg-gray-300 dark:bg-gray-600 rounded-full"
                  style={{
                    left: `${
                      (parseFloat(minStakeAmount) /
                        parseFloat(availableBalance)) *
                      100
                    }%`,
                    right: `${
                      100 -
                      (parseFloat(maxStakeAmount ?? availableBalance) /
                        parseFloat(availableBalance)) *
                        100
                    }%`,
                  }}
                />

                {/* Preview indicator */}
                {previewAmount && (
                  <motion.div
                    className="absolute w-1.5 h-3 -top-1 bg-primary/50 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      left: `${
                        (parseFloat(previewAmount) /
                          parseFloat(availableBalance)) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                )}

                {/* Current value indicator */}
                {stakeAmount && (
                  <motion.div
                    className="absolute w-1.5 h-3 -top-1 bg-primary rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      left: `${
                        (parseFloat(stakeAmount) /
                          parseFloat(availableBalance)) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                {/* Current value indicator */}
                {stakeAmount && (
                  <motion.div
                    className="absolute w-1.5 h-3 -top-1 bg-primary rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      left: `${
                        (parseFloat(stakeAmount) /
                          parseFloat(availableBalance)) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                {/* Preview tooltip */}
                {previewAmount && (
                  <div
                    className="absolute -top-8 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs"
                    style={{
                      left: `${
                        (parseFloat(previewAmount) /
                          parseFloat(availableBalance)) *
                        100
                      }%`,
                    }}
                  >
                    {formatNumber(previewAmount)} {tokenSymbol}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleMaxAmount}
            className="text-xs sm:text-sm whitespace-nowrap"
            disabled={isStaking || parseFloat(availableBalance) <= 0}
          >
            Max Amount
          </Button>
        </div>

        {/* Quick Select Buttons */}
        <TooltipProvider>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[25, 50, 75, 100].map((percentage) => {
              const isSelected =
                stakeAmount ===
                ((parseFloat(availableBalance) * percentage) / 100).toString();

              return (
                <Tooltip key={percentage} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickSelect(percentage)}
                        disabled={
                          isStaking || parseFloat(availableBalance) <= 0
                        }
                        className={cn(
                          "text-xs py-1 h-auto w-full transition-all duration-200",
                          isSelected
                            ? "bg-primary hover:bg-primary text-primary-foreground hover:text-primary-foreground ring-2 ring-primary/30"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800",
                        )}
                      >
                        <motion.span
                          initial={false}
                          animate={{
                            scale: isSelected ? 1.1 : 1,
                          }}
                          className={cn(
                            "flex items-center gap-1",
                            isSelected
                              ? "text-white dark:text-white" // Ensure text is visible when selected
                              : "text-gray-700 dark:text-gray-200",
                          )} // Default text color
                        >
                          {percentage}%
                        </motion.span>
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-white dark:bg-gray-800 text-xs px-2 py-1 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                  >
                    <p>
                      {calculateAmountForPercentage(percentage)} {tokenSymbol}
                    </p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
        {/* <div className="grid grid-cols-4 gap-2 mt-2">
          {[25, 50, 75, 100].map((percentage) => (
            <Button
              key={percentage}
              variant="outline"
              size="sm"
              onClick={() => handleQuickSelect(percentage)}
              disabled={isStaking || parseFloat(availableBalance) <= 0}
              className={cn(
                "text-xs py-1 h-auto",
                stakeAmount ===
                  ((parseFloat(availableBalance) * percentage) / 100).toString()
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              )}
            >
              {percentage}%
            </Button>
          ))}
        </div> */}

        {/* Real-time Validation Message */}
        {validationState.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "text-xs mt-1 flex items-center gap-1",
              validationState.type === "error" && "text-red-500",
              validationState.type === "warning" && "text-yellow-500",
              validationState.type === "success" && "text-green-500",
            )}
          >
            {validationState.type === "error" && (
              <AlertTriangle className="h-3 w-3" />
            )}
            {validationState.type === "warning" && (
              <AlertCircle className="h-3 w-3" />
            )}
            {validationState.type === "success" && (
              <Check className="h-3 w-3" />
            )}
            {validationState.message}
          </motion.div>
        )}

        {/* Add Progress Bar Here - Right after the input and max button */}
        <div className="space-y-1 mt-2">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>Amount Selected</span>
            <span>
              {calculatePercentage().toFixed(1)}% of available balance
            </span>
          </div>
          <Progress
            value={calculatePercentage()}
            className="h-2"
            indicatorClassName={getProgressColor(calculatePercentage())}
          />
          <div className="flex justify-between items-center text-xs">
            <span>
              {formatNumber(stakeAmount || "0")} {tokenSymbol}
            </span>
            <span>
              of {formatNumber(availableBalance)} {tokenSymbol}
            </span>
          </div>
        </div>

        {/* Validation Messages */}
        {stakeAmount && !isValidAmount() && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-xs text-red-500 mt-1"
          >
            {parseFloat(stakeAmount) < parseFloat(minStakeAmount)
              ? `Minimum stake amount is ${formatNumber(
                  minStakeAmount,
                )} ${tokenSymbol}`
              : parseFloat(stakeAmount) >
                  parseFloat(maxStakeAmount || "Infinity")
                ? `Maximum stake amount is ${formatNumber(
                    maxStakeAmount!,
                  )} ${tokenSymbol}`
                : "Please enter a valid amount"}
          </motion.p>
        )}
      </div>

      {/* Staking Information */}
      {stakeAmount && isValidAmount() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <Card className="p-4 space-y-4">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center">
              <Calculator className="w-4 h-4 mr-2" />
              Estimated Returns
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-500 flex items-center">
                  Estimated Rewards
                  <InfoTooltip
                    content="Projected rewards based on current APR"
                    title="Reward Calculation"
                  />
                </div>
                <div className="text-lg font-bold text-green-600">
                  {formatNumber(
                    calculateRewards(
                      stakeAmount,
                      90 - getCurrentPresaleDay(),
                      currentAPR,
                    ).toFixed(2),
                  )}{" "}
                  {tokenSymbol}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-gray-500 flex items-center">
                  Current APR
                  <InfoTooltip
                    content="Annual Percentage Rate for rewards"
                    title="APR Details"
                  />
                </div>
                <div className="text-lg font-bold">{currentAPR}%</div>
              </div>
            </div>
          </Card>

          {/* Lock Period Info */}
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Lock Duration
                </span>
              </div>
              <span className="text-sm font-medium">90 days</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Early Unstake Fee
                </span>
              </div>
              <span className="text-sm font-medium">5-50%</span>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Rewards Preview Section */}
      {stakeAmount && parseFloat(stakeAmount) > 0 && (
        <Card className="p-4 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Calculator className="h-4 w-4" />
            Rewards Preview
            <InfoTooltip
              content="Estimated rewards based on current APR. Actual rewards may vary."
              title="Rewards Calculation"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Simple Interest Projections */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CalendarDays className="h-3 w-3" />
                Projected Earnings
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead className="text-right">Rewards</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewardProjections && (
                    <>
                      <TableRow>
                        <TableCell>Daily</TableCell>
                        <TableCell className="text-right">
                          {formatNumber(rewardProjections.daily.toFixed(6))}{" "}
                          {tokenSymbol}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Weekly</TableCell>
                        <TableCell className="text-right">
                          {formatNumber(rewardProjections.weekly.toFixed(6))}{" "}
                          {tokenSymbol}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Monthly</TableCell>
                        <TableCell className="text-right">
                          {formatNumber(rewardProjections.monthly.toFixed(6))}{" "}
                          {tokenSymbol}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Quarterly</TableCell>
                        <TableCell className="text-right">
                          {formatNumber(rewardProjections.quarterly.toFixed(6))}{" "}
                          {tokenSymbol}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* APR and Compound Interest */}
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <TrendingUp className="h-3 w-3" />
                    Current APR
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {currentAPR}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <Coins className="h-3 w-3" />
                    Stake Amount
                  </div>
                  <span className="text-sm font-medium">
                    {formatNumber(stakeAmount)} {tokenSymbol}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calculator className="h-3 w-3" />
                  With Daily Compound
                  <InfoTooltip
                    content="Assumes rewards are automatically restaked daily"
                    title="Compound Interest"
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead className="text-right">
                        Total Rewards
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rewardProjections && (
                      <>
                        <TableRow>
                          <TableCell>Monthly</TableCell>
                          <TableCell className="text-right">
                            {formatNumber(
                              rewardProjections.compounded.monthly.toFixed(6),
                            )}{" "}
                            {tokenSymbol}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Quarterly</TableCell>
                          <TableCell className="text-right">
                            {formatNumber(
                              rewardProjections.compounded.quarterly.toFixed(6),
                            )}{" "}
                            {tokenSymbol}
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Stake Button */}
      <Button
        className="w-full"
        onClick={handleStakeSubmit}
        disabled={!isValidAmount() || isStaking}
      >
        {isStaking ? (
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-4 h-4" />
            </motion.div>
            <span>Staking...</span>
          </div>
        ) : (
          "Stake Tokens"
        )}
      </Button>

      {/* Additional Information */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p>• Staked tokens are locked for 90 days</p>
        <p>• Early unstaking is subject to a variable penalty</p>
        <p>• APR adjusts based on total staked amount</p>
        <p>• Rewards are automatically calculated and distributed</p>
      </div>
    </motion.div>
  );
};
