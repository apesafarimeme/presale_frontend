// hooks/useStaking.ts
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { parseEther, formatEther } from "viem";
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useWatchContractEvent,
  // useBalance,
} from "wagmi";
// import {
//   stakingContract,
//   // tokenContract
// } from "@/config/contracts";
import { usePersistentState, isChartSelection } from "./usePersistentState";
import type { Stake } from "@/types/staking";
// import { triggerCelebration } from "@/utils/celebration";
import { getCurrentPresaleDay } from "@/utils/presaleTime";
import { generateAprData, getCurrentAPR } from "@/utils/aprCalculations";
// import { getCurrentAPR } from "@/utils/aprCalculations";
import type { PresaleStats, DetailedStakeInfo } from "@/types/staking";
import { PRESALE_STAKING_CONTRACT_ADDRESS } from "@/backend/presale_contract";
import { PRESALE_STAKING_CONTRACT_ABI } from "@/backend/presale_contract";

export const useStaking = () => {
  // State declarations
  const { address } = useAccount();
  // const [stakingData, setStakingData] = useState<StakingData | null>(null);
  const [
    // isLoading,
    // setIsLoading,
  ] = useState(false);
  // const [isStaking, setIsStaking] = useState(false);
  // const [isUnstaking, setIsUnstaking] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [
    selectedStakeForUnstake,
    // setSelectedStakeForUnstake
  ] = useState<Stake | null>(null);
  const [unstakeDialogOpen, setUnstakeDialogOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState(getCurrentPresaleDay());
  const [aprData] = useState(generateAprData());

  // Get presale stats
  const { data: presaleStats, isLoading: isLoadingStats } = useReadContract({
    address: PRESALE_STAKING_CONTRACT_ADDRESS,
    abi: PRESALE_STAKING_CONTRACT_ABI,
    functionName: "getPresaleStats",
    // watch: true,
  });

  // Get user's detailed stake info
  const { data: userStakeInfo, isLoading: isLoadingUserStake } =
    useReadContract({
      address: PRESALE_STAKING_CONTRACT_ADDRESS,
      abi: PRESALE_STAKING_CONTRACT_ABI,
      functionName: "getDetailedStakeInfo",
      args: [address!],
      // watch: true,
      // enabled: !!address,
    });

  // Contract writes
  const { writeContract, isPending } = useWriteContract();

  // Handlers
  const handleStake = async () => {
    if (!stakeAmount) return null;

    return writeContract({
      address: PRESALE_STAKING_CONTRACT_ADDRESS,
      abi: PRESALE_STAKING_CONTRACT_ABI,
      functionName: "stake",
      args: [parseEther(stakeAmount)],
    });
  };

  const handleUnstake = async () => {
    return writeContract({
      address: PRESALE_STAKING_CONTRACT_ADDRESS,
      abi: PRESALE_STAKING_CONTRACT_ABI,
      functionName: "unstake",
    });
  };

  // Process contract data
  const stakingData = useMemo(() => {
    if (!presaleStats || !userStakeInfo) return null;

    const stats = presaleStats as PresaleStats;
    const userInfo = userStakeInfo as DetailedStakeInfo;

    return {
      totalStaked: formatEther(stats.totalStaked),
      totalParticipants: stats.totalParticipants.toString(),
      avgStakeAmount: formatEther(stats.avgStakeAmount),
      timeRemaining: stats.timeRemaining.toString(),
      // minAPR: Number(stats.minAPR),
      // maxAPR: Number(stats.maxAPR),
      currentAPR: getCurrentAPR(currentDay), // Or use your APR calculation
      stakedAmount: formatEther(userInfo.stakedAmount),
      currentReward: formatEther(userInfo.currentReward),
      stakingDuration: Number(userInfo.stakingDuration),
      aprAtStakeTime: Number(userInfo.aprAtStakeTime),
      isAutoCompounding: userInfo.isAutoCompounding,
      nextCompoundTime: userInfo.nextCompoundTime,
    };
  }, [presaleStats, userStakeInfo, currentDay]);

  // Loading state
  // const isLoading = isLoadingStats || isLoadingUserStake || isWritePending;

  // Initialize historical data
  const [historicalData] = useState([
    { day: 0, totalStaked: 1000, userStaked: 100, apr: 500 },
    { day: 30, totalStaked: 2000, userStaked: 200, apr: 400 },
    { day: 60, totalStaked: 3000, userStaked: 300, apr: 300 },
    { day: 90, totalStaked: 4000, userStaked: 400, apr: 200 },
  ]);

  // Previous values for trend tracking
  const [previousValues, setPreviousValues] = useState<{
    totalStaked: string;
    apr: number;
  } | null>(null);

  // Chart selection persistence
  const [selectedChart, setSelectedChart] = usePersistentState<
    "apr" | "history"
  >("staking-chart-selection", "apr", isChartSelection);

  useEffect(() => {
    // Update current day every hour
    const interval = setInterval(() => {
      setCurrentDay(getCurrentPresaleDay());
    }, 60 * 60 * 1000); // Update every hour

    return () => clearInterval(interval);
  }, []);

  // Mock data
  // const mockStakeInfo = useMemo(
  //   () => ({
  //     stakedAmount: parseEther("100"),
  //     currentReward: parseEther("5"),
  //     stakingDuration: BigInt(86400 * 30),
  //     // aprAtStakeTime: BigInt(35000),
  //   }),
  //   []
  // );

  // const mockPresaleStats = useMemo(
  //   () => ({
  //     totalStaked: parseEther("10000"),
  //     totalParticipants: BigInt(100),
  //     avgStakeAmount: parseEther("100"),
  //     timeRemaining: BigInt(7776000),
  //     minAPR: BigInt(20000),
  //     maxAPR: BigInt(50000),
  //   }),
  //   []
  // );

  // Initialize staking data with mock data
  // useEffect(() => {
  //   const newStakingData: StakingData = {
  //     stakedAmount: formatEther(mockStakeInfo.stakedAmount),
  //     currentReward: formatEther(mockStakeInfo.currentReward),
  //     stakingDuration: Number(mockStakeInfo.stakingDuration),
  //     totalStaked: formatEther(mockPresaleStats.totalStaked),
  //     totalParticipants: mockPresaleStats.totalParticipants.toString(),
  //     avgStakeAmount: formatEther(mockPresaleStats.avgStakeAmount),
  //     timeRemaining: (
  //       Number(mockPresaleStats.timeRemaining) / 86400
  //     ).toString(),
  //     totalRewardsEarned: formatEther(mockStakeInfo.currentReward),
  //     minAPR: Number(mockPresaleStats.minAPR) / 100,
  //     maxAPR: Number(mockPresaleStats.maxAPR) / 100,
  //   };

  //   setStakingData(newStakingData);
  //   setIsLoading(false);
  // }, [mockStakeInfo, mockPresaleStats]);

  // Track trends
  useEffect(() => {
    if (stakingData) {
      const currentAPR = getCurrentAPR(currentDay);
      setPreviousValues((prev) => {
        if (!prev) {
          return {
            totalStaked: stakingData.totalStaked,
            apr: currentAPR,
          };
        }
        return {
          totalStaked: stakingData.totalStaked,
          apr: currentAPR,
        };
      });
    }
  }, [stakingData, currentDay, setPreviousValues]);

  // Combine current and historical data
  // const combinedStakingData = useMemo(() => {
  //   if (!stakingData) return null;

  //   return {
  //     ...stakingData,
  //     currentAPR: (stakingData.minAPR + stakingData.maxAPR) / 2,
  //     previousTotalStaked: previousValues?.totalStaked,
  //     previousAPR: previousValues?.apr,
  //   };
  // }, [stakingData, previousValues]);

  // Contract event listeners
  useWatchContractEvent({
    address: PRESALE_STAKING_CONTRACT_ADDRESS,
    eventName: "Staked",
    onLogs() {
      toast.success("Successfully staked tokens");
    },
  });

  useWatchContractEvent({
    address: PRESALE_STAKING_CONTRACT_ADDRESS,
    eventName: "Unstaked",
    onLogs() {
      setUnstakeDialogOpen(false);
      toast.success("Successfully unstaked tokens");
    },
  });

  // Add effect to monitor historical data changes
  useEffect(() => {
    console.log("Historical data updated:", {
      length: historicalData.length,
      lastEntry: historicalData[historicalData.length - 1],
    });
  }, [historicalData]);

  // Add effect to monitor staking data changes
  useEffect(() => {
    if (stakingData) {
      console.log("Staking data updated:", {
        stakedAmount: stakingData.stakedAmount,
        totalStaked: stakingData.totalStaked,
        rewards: stakingData.currentReward,
      });
    }
  }, [stakingData]);

  const initiateUnstake = () => {
    setUnstakeDialogOpen(true);
  };

  // Single return statement with all required values
  return {
    stakingData,
    // historicalData,
    // tokenBalance: {
    //   value: parseEther("1000000"),
    //   formatted: "1000000",
    //   symbol: "TKN",
    // },
    isStaking: isPending,
    isUnstaking: isPending,
    stakeAmount,
    setStakeAmount,
    selectedStakeForUnstake,
    unstakeDialogOpen,
    setUnstakeDialogOpen,
    handleStake,
    handleUnstake,
    initiateUnstake,
    selectedChart,
    setSelectedChart,
    isLoading: isLoadingStats || isLoadingUserStake,
    currentAPR: getCurrentAPR(currentDay),
    aprData,
    currentDay,
  };
};
