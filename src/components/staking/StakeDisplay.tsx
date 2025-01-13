// components/staking/StakesDisplay.tsx
// import { Stake } from "@/types/staking";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Coins, Clock, TrendingUp } from "lucide-react";
import { formatNumber } from "@/utils/formatters";
import { InfoTooltip } from "@/components/staking/common/InfoTooltip";
import { motion } from "framer-motion";
// import {
//   calculateRewards,
//   calculateCompoundRewards,
//   getCurrentAPR,
// } from "@/utils/aprCalculations";

interface StakeDisplayProps {
  stakedAmount: string;
  rewards: string;
  stakingDuration: number;
  tokenSymbol: string;
  onUnstake: () => void;
  isLoading?: boolean;
  currentAPR: number;
  // calculateLockupProgress: (stakedAt: Date, lockupPeriod: number) => number;
  // getDaysRemaining: (stakedAt: Date, lockupPeriod: number) => number;
}

export const StakeDisplay = ({
  stakedAmount,
  rewards,
  stakingDuration,
  tokenSymbol,
  onUnstake,
  isLoading = false,
  currentAPR,
}: StakeDisplayProps) => {
  const calculateProgress = () => {
    const totalDuration = 90 * 24 * 60 * 60; // 90 days in seconds
    const progress = (stakingDuration / totalDuration) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const getDaysRemaining = () => {
    const totalDays = 90;
    const daysElapsed = Math.floor(stakingDuration / (24 * 60 * 60));
    return Math.max(0, totalDays - daysElapsed);
  };

  if (parseFloat(stakedAmount) === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 space-y-4"
      >
        <div className="text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium">No Active Stake</p>
          <p className="text-sm mt-2">Start staking to earn rewards!</p>
        </div>
        <Button variant="outline" disabled className="mx-auto">
          <Lock className="w-4 h-4 mr-2" />
          Unstake
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 sm:p-6 space-y-6">
        {/* Stake Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Staked Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Staked Amount
                </span>
                <InfoTooltip
                  content="The total amount of tokens you have locked in staking"
                  title="Stake Details"
                />
              </div>
              <span className="text-lg font-bold">
                {formatNumber(stakedAmount)} {tokenSymbol}
              </span>
            </div>
          </div>

          {/* Rewards Earned */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Coins className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Rewards Earned
                </span>
                <InfoTooltip
                  content="Accumulated rewards from your stake"
                  title="Rewards Info"
                />
              </div>
              <span className="text-lg font-bold text-green-600">
                {formatNumber(rewards)} {tokenSymbol}
              </span>
            </div>
          </div>
        </div>

        {/* Staking Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Staking Progress
              </span>
              <InfoTooltip
                content={
                  <div className="space-y-2">
                    <p>Total lock period: 90 days</p>
                    <p>Days remaining: {getDaysRemaining()}</p>
                    <p>Progress: {calculateProgress().toFixed(1)}%</p>
                  </div>
                }
                title="Lock Period"
              />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {getDaysRemaining()} days remaining
            </span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>

        {/* APR Info */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Current APR
            </span>
            <InfoTooltip
              content="Your current Annual Percentage Rate"
              title="APR Details"
            />
          </div>
          <span className="text-lg font-bold text-green-600">
            {currentAPR}%
          </span>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          onClick={onUnstake}
          disabled={isLoading}
          className="w-full"
        >
          <Lock className="w-4 h-4 mr-2" />
          Unstake
        </Button>

        {/* Additional Info */}
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>• Early unstaking is subject to a penalty</p>
          <p>• Penalty decreases over time until lock period ends</p>
          <p>• Rewards are automatically calculated and accumulated</p>
        </div>
      </Card>
    </motion.div>
  );
};
