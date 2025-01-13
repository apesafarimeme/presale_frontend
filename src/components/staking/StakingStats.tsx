// components/staking/StakingStats.tsx
import {
  Wallet,
  Users,
  TrendingUp,
  ChartBar,
  Clock,
  Lock,
  Coins,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

// import { InfoTooltip } from "@/components/staking/common/InfoTooltip";
// import { formatNumber } from "@/utils/formatters";
import type { StakingStatsProps } from "@/types/staking";
import { StatCard } from "./StatCard";

export const StakingStats = ({
  stakingData,
  tokenSymbol,
  isLoading,
}: StakingStatsProps) => {
  // Calculate trends if previous values are available
  const tvlTrend = stakingData?.previousTotalStaked
    ? parseFloat(stakingData.totalStaked) >
      parseFloat(stakingData.previousTotalStaked)
      ? "up"
      : "down"
    : null;

  const aprTrend = stakingData?.previousAPR
    ? stakingData.currentAPR > stakingData.previousAPR
      ? "up"
      : "down"
    : null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <StatCard
        cardTitle="Total Value Locked"
        value={stakingData?.totalStaked ?? "0"}
        symbol={tokenSymbol}
        tooltip={
          <div className="space-y-1">
            <p>Total value of all tokens currently locked in staking</p>
            <p className="text-sm text-gray-400">
              Includes all staked tokens and pending rewards
            </p>
          </div>
        }
        tooltipTitle="TVL Information"
        icon={Wallet}
        isLoading={isLoading}
        highlightChange
        trend={tvlTrend}
      />

      <StatCard
        cardTitle="Total Participants"
        value={stakingData?.totalParticipants ?? "0"}
        tooltip={
          <div className="space-y-1">
            <p>Number of unique addresses participating in staking</p>
            <p className="text-sm text-gray-400">
              Active stakers in the presale period
            </p>
          </div>
        }
        tooltipTitle="Participant Statistics"
        icon={Users}
        isLoading={isLoading}
      />

      <StatCard
        cardTitle="Current APR"
        value={
          stakingData?.currentAPR ? stakingData.currentAPR.toFixed(2) : "0"
        }
        symbol="%"
        tooltip={
          <div className="space-y-1">
            <p>Current Annual Percentage Rate</p>
            <p className="text-sm text-gray-400">
              Rate varies based on total staked amount
            </p>
          </div>
        }
        tooltipTitle="APR Details"
        icon={TrendingUp}
        isLoading={isLoading}
        highlightChange
        trend={aprTrend}
      />

      <StatCard
        cardTitle="Average Stake"
        value={stakingData?.avgStakeAmount ? stakingData?.avgStakeAmount : "0"}
        symbol={tokenSymbol}
        tooltip={
          <div className="space-y-1">
            <p>Average amount staked per participant</p>
            <p className="text-sm text-gray-400">
              Total TVL divided by number of participants
            </p>
          </div>
        }
        tooltipTitle="Average Stake Details"
        icon={ChartBar}
        isLoading={isLoading}
      />

      <StatCard
        cardTitle="Time Remaining"
        value={stakingData?.timeRemaining ?? "0"}
        symbol="Days"
        tooltip={
          <div className="space-y-1">
            <p>Time until presale staking period ends</p>
            <p className="text-sm text-gray-400">
              Remaining time in the current phase
            </p>
          </div>
        }
        tooltipTitle="Time Information"
        icon={Clock}
        isLoading={isLoading}
        highlightChange
      />

      <StatCard
        cardTitle="Lock Period"
        value="90"
        symbol="Days"
        tooltip={
          <div className="space-y-1">
            <p>Duration tokens must be staked</p>
            <p className="text-sm text-gray-400">
              Early unstaking subject to penalties
            </p>
          </div>
        }
        tooltipTitle="Lock Period Details"
        icon={Lock}
        isLoading={isLoading}
      />

      <StatCard
        cardTitle="Total Rewards"
        value={stakingData?.totalRewardsEarned ?? "0"}
        symbol={tokenSymbol}
        tooltip={
          <div className="space-y-1">
            <p>Total rewards distributed to stakers</p>
            <p className="text-sm text-gray-400">
              Accumulated rewards across all participants
            </p>
          </div>
        }
        tooltipTitle="Rewards Information"
        icon={Coins}
        isLoading={isLoading}
        highlightChange
      />

      <StatCard
        cardTitle="Early Unstake Fee"
        value="5-50"
        symbol="%"
        tooltip={
          <div className="space-y-1">
            <p>Penalty for unstaking before lock period ends</p>
            <p className="text-sm text-gray-400">
              Fee decreases over time until lock period ends
            </p>
          </div>
        }
        tooltipTitle="Penalty Information"
        icon={AlertTriangle}
        isLoading={isLoading}
      />
    </motion.div>
  );
};
