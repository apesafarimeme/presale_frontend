// types/staking.ts
import type { Address } from "viem";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface PresaleStatsResponse {
  totalParticipants: bigint;
  totalStaked: bigint;
  avgStakeAmount: bigint;
  currentAPR: bigint;
  timeRemaining: bigint;
  minAPR: bigint;
  maxAPR: bigint;
}

export interface Stake {
  id: number;
  amount: string;
  stakedAt: Date;
  lockupPeriod: number;
  rewards: string;
}

export interface StatCardProps {
  cardTitle: string; // Changed from 'title' to 'cardTitle' for the stat card title
  value: string;
  tooltip: ReactNode; // Changed from string to ReactNode
  tooltipTitle?: string; // Keep this as tooltipTitle for the tooltip's title
  icon: LucideIcon;
  symbol?: string;
  highlightChange?: boolean;
  isLoading?: boolean;
  trend?: "up" | "down" | null; // Add this
  className?: string; // Add this
}

// Stake Response from Contract
export interface StakeResponse {
  id: bigint;
  amount: bigint;
  stakedAt: bigint;
  lockupPeriod: bigint;
  rewards: bigint;
}

export interface StakingStats {
  // Create a separate interface for stats data
  totalStaked: string; // Use this instead of tvl
  totalParticipants: string;
  avgStakeAmount: string;
  timeRemaining: string;
  totalRewardsEarned: string;
  currentAPR: number;
  previousTotalStaked?: string; // Renamed from previousTVL
  previousAPR?: number;
}

export interface StakingData {
  stakedAmount: string;
  currentReward: string;
  stakingDuration: number;
  totalStaked: string;
  totalParticipants: string;
  avgStakeAmount: string;
  timeRemaining: string;
  totalRewardsEarned: string;
  minAPR: number;
  maxAPR: number;
  // currentAPR: number; // Add this
  // previousTotalStaked?: string; // Renamed from previousTVL
  // previousAPR?: number; // Add this
}

// APR Data
export interface APRChartData {
  day: number;
  apr: number;
}
// export interface APRData {
//   currentAPR: number;
//   aprUpdateTime: Date;
//   isUpdatingAPR: boolean;
//   minAPR: number;
//   maxAPR: number;
// }

// Penalty Configuration
export interface PenaltyConfig {
  maxPenalty: number;
  minPenalty: number;
  lockupPeriod: number;
}

// Chart Data Types
export interface APRDataPoint {
  day: number;
  apr: number;
}

export interface HistoricalChartData {
  day: number;
  totalStaked: number;
  userStaked: number;
  apr: number;
}

export interface HistoricalDataPoint {
  day: number;
  totalStaked: number;
  userStaked: number;
  rewards: string;
}

export interface StakingChartsProps {
  selectedChart: "apr" | "history";
  setSelectedChart: (chart: "apr" | "history") => void;
  aprData: APRChartData[];
  historicalData: HistoricalChartData[];
  isLoading: boolean;
}

// Component Props Types
export interface StakingOverlayProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export interface StakeDisplayProps {
  stakedAmount: string;
  rewards: string;
  stakingDuration: number;
  tokenSymbol: string;
  onUnstake: () => void;
  isLoading?: boolean;
}

export interface NewStakeFormProps {
  availableBalance: string;
  tokenSymbol: string;
  stakeAmount: string;
  setStakeAmount: (value: string) => void;
  onStake: () => Promise<void>;
  isStaking: boolean;
  minStakeAmount?: string;
  maxStakeAmount?: string;
  currentAPR: number;
}

export interface UnstakeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stakedAmount: string; // Change this from stake: Stake
  rewards: string; // Add this if needed
  onConfirm: () => Promise<void>;
  isUnstaking: boolean;
  tokenSymbol: string;
}

export interface ClaimRewardsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stake: Stake | null;
  onConfirm: (stake: Stake) => Promise<void>;
  isClaimingRewards: boolean;
  tokenSymbol: string;
}

export interface StakingStatsProps {
  stakingData: StakingStats;
  tokenSymbol: string;
  isLoading: boolean;
}

export interface APRDisplayProps {
  currentAPR: number;
  isUpdatingAPR: boolean;
  aprUpdateTime: Date;
}

// Contract Event Types
export interface StakedEvent {
  user: Address;
  amount: bigint;
  stakeId: bigint;
}

export interface UnstakedEvent {
  user: Address;
  amount: bigint;
  penalty: bigint;
  stakeId: bigint;
}

export interface RewardsClaimedEvent {
  user: Address;
  amount: bigint;
  stakeId: bigint;
}

export interface PresaleStats {
  totalStaked: bigint;
  totalParticipants: bigint;
  avgStakeAmount: bigint;
  timeRemaining: bigint;
  // minAPR: bigint;
  // maxAPR: bigint;
}

export interface DetailedStakeInfo {
  stakedAmount: bigint;
  currentReward: bigint;
  stakingDuration: bigint;
  aprAtStakeTime: bigint;
  isAutoCompounding: boolean;
  nextCompoundTime: bigint;
}

// Error Types
export interface StakingError extends Error {
  code?: string;
  details?: unknown;
}

// State Types
export interface StakingState {
  isStaking: boolean;
  isUnstaking: boolean;
  isClaimingRewards: boolean;
  stakeAmount: string;
  selectedStakeForUnstake: Stake | null;
  selectedStakeForClaim: Stake | null;
  unstakeDialogOpen: boolean;
  claimDialogOpen: boolean;
}

// Constants Type
export interface StakingConstants {
  MIN_STAKE: number;
  MAX_STAKE: number;
  BASE_APR: number;
  MIN_APR: number;
  MIN_STAKE_DURATION: number;
  UPDATE_INTERVAL: number;
  PENALTIES: {
    MAX: number;
    MIN: number;
  };
  ERROR_MESSAGES: {
    INSUFFICIENT_BALANCE: string;
    INVALID_AMOUNT: string;
    MINIMUM_STAKE: string;
    MAXIMUM_STAKE: string;
    STAKE_DURATION: string;
  };
}

// Hook Return Types
export interface UseStakingReturn {
  stakingData: {
    stakedAmount: string;
    currentReward: string;
    stakingDuration: number;
    totalStaked: string;
    totalParticipants: string;
    avgStakeAmount: string;
    timeRemaining: string;
  } | null;
  tokenBalance: {
    formatted: string;
    symbol: string;
  } | null;
  isStaking: boolean;
  isUnstaking: boolean;
  isClaimingRewards: boolean;
  stakeAmount: string;
  setStakeAmount: (amount: string) => void;
  selectedStakeForUnstake: Stake | null;
  selectedStakeForClaim: Stake | null;
  unstakeDialogOpen: boolean;
  claimDialogOpen: boolean;
  setUnstakeDialogOpen: (open: boolean) => void;
  setClaimDialogOpen: (open: boolean) => void;
  handleStake: () => Promise<void>;
  handleUnstake: (stake: Stake) => Promise<void>;
  handleClaimRewards: (stake: Stake) => Promise<void>;
  initiateUnstake: (stake: Stake) => void;
  initiateClaimRewards: (stake: Stake) => void;
  selectedChart: "apr" | "history";
  setSelectedChart: (chart: "apr" | "history") => void;
  currentAPR: number;
  isUpdatingAPR: boolean;
  aprUpdateTime: Date;
}

export interface UseAPRReturn {
  currentAPR: number;
  aprUpdateTime: Date;
  isUpdatingAPR: boolean;
  updateAPR: () => Promise<void>;
}
