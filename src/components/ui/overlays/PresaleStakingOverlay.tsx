// components/ui/overlays/PresaleStakingOverlay.tsx
"use client";

import { useState, useEffect } from "react";
import { formatEther } from "viem";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { Toaster } from "sonner";

import { APRDisplay } from "@/components/staking/APRDisplay";
import { StakeDisplay } from "@/components/staking/StakeDisplay";
import { NewStakeForm } from "@/components/staking/NewStakeForm";
import { StakingStats } from "@/components/staking/StakingStats";
import { UnstakeDialog } from "@/components/staking/dialogs/UnstakeDialog";
// import { ClaimRewardsDialog } from "@/components/staking/dialogs/ClaimRewardsDialog";
import { StakingCharts } from "@/components/staking/StakingCharts";

import { useStaking } from "@/hooks/useStaking";
// import { useAPR } from "@/hooks/useAPR";
import { ErrorBoundary } from "@/components/error-boundary";
// import { InfoTooltip } from "@/components/staking/common/InfoTooltip";
// import { formatNumber } from "@/utils/formatters";
// import { StatCard } from "@/components/staking/StatCard";
import { LoadingOverlay } from "./loading-overlay";
// import { StakingChartsProps } from "@/types/staking";
// import type { StakingStatsProps } from "@/types/staking";
import { initializeAudio } from "@/utils/celebration";
// import { generateAprData } from "@/utils/aprCalculations";
// import { usePresaleStaking } from "@/hooks/usePresaleStaking";
// import { useTokenBalance } from "@/hooks/useTokenBalance";
// import { PRESALE_TOKEN_ADDRESS } from "@/constants/addresses";

// const InteractiveFeatures = () => {
//   return (
//     <div className="space-y-4">
//       {/* Real-time Updates Toggle */}
//       <div className="flex items-center justify-end space-x-2">
//         <span className="text-sm">Real-time Updates</span>
//         <Switch
//           checked={isRealTimeEnabled}
//           onCheckedChange={setIsRealTimeEnabled}
//         />
//       </div>

//       {/* Time Range Selector */}
//       <div className="flex items-center space-x-2">
//         <Select
//           value={timeRange}
//           onValueChange={setTimeRange}
//           options={[
//             { value: "24h", label: "24 Hours" },
//             { value: "7d", label: "7 Days" },
//             { value: "30d", label: "30 Days" },
//           ]}
//         />
//       </div>

//       {/* Quick Actions */}
//       <div className="flex space-x-2">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setShowAnalytics(true)}
//         >
//           <BarChart2 className="h-4 w-4 mr-2" />
//           Analytics
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setShowHistory(true)}
//         >
//           <History className="h-4 w-4 mr-2" />
//           History
//         </Button>
//       </div>

//       {/* Notifications */}
//       <div className="flex items-center space-x-2">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => setShowNotifications(!showNotifications)}
//         >
//           <Bell className="h-4 w-4" />
//         </Button>
//         {hasNewNotifications && (
//           <span className="relative flex h-3 w-3">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

interface PresaleStakingOverlayProps {
  isOpen: boolean;
  onCloseAction: () => void;
}

export const PresaleStakingOverlay = ({
  isOpen,
  onCloseAction,
}: PresaleStakingOverlayProps) => {
  const {
    stakingData,
    historicalData,
    // presaleStats,
    tokenBalance,
    isStaking,
    isUnstaking,
    stakeAmount,
    setStakeAmount,
    unstakeDialogOpen,
    setUnstakeDialogOpen,
    handleStake,
    handleUnstake,
    initiateUnstake,
    selectedChart, // Add these
    setSelectedChart,
    isLoading, // Make sure this is returned from useStaking
    currentAPR,
    aprData,
  } = useStaking();

  const [activeTab, setActiveTab] = useState<"current-stakes" | "new-stake">(
    "current-stakes",
  );

  // Initialize audio when component mounts
  useEffect(() => {
    initializeAudio().catch(console.error);
  }, []);

  // const historicalData = [
  //   { day: 0, totalStaked: 0, userStaked: 0, apr: 500 },
  //   { day: 30, totalStaked: 100000, userStaked: 1000, apr: 400 },
  //   { day: 60, totalStaked: 200000, userStaked: 2000, apr: 300 },
  //   { day: 90, totalStaked: 300000, userStaked: 3000, apr: 200 },
  // ];

  if (!isOpen) return null;

  return (
    <ErrorBoundary>
      <div
        className="fixed inset-0 bg-black/50 flex items-start justify-center p-2 sm:p-4 overflow-y-auto"
        onClick={(e) => {
          // Close only if clicking the backdrop
          if (e.target === e.currentTarget) {
            onCloseAction();
          }
        }}
      >
        <div className="relative w-full max-w-4xl">
          {" "}
          {/* Add wrapper div */}
          <Card className="bg-white dark:bg-gray-800 my-2 sm:my-4 mx-2 sm:mx-4">
            <button
              onClick={onCloseAction}
              className="absolute -top-2 -right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-2xl font-bold text-center">
                Token Staking Dashboard
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-center">
                Stake your tokens to earn rewards during the presale period
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6 relative">
              {/* Loading Overlay */}
              {isLoading && <LoadingOverlay />}
              <StakingStats
                stakingData={{
                  totalStaked: stakingData?.totalStaked ?? "0",
                  totalParticipants: stakingData?.totalParticipants ?? "0",
                  avgStakeAmount: stakingData?.avgStakeAmount ?? "0",
                  timeRemaining: stakingData?.timeRemaining ?? "0",
                  totalRewardsEarned: stakingData?.totalRewardsEarned ?? "0",
                  currentAPR: currentAPR,
                  // Optional trend data
                  // previousTotalStaked: stakingData?.previousTotalStaked,
                  // previousAPR: stakingData?.previousAPR,
                }}
                tokenSymbol={tokenBalance?.symbol ?? ""}
                isLoading={isLoading}
              />

              {/* Available Balance, APR display... */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
                  <div className="text-xs sm:text-sm">Available Balance</div>
                  <p className="text-base sm:text-lg font-bold mt-1">
                    {tokenBalance?.formatted ?? "0"} {tokenBalance?.symbol}
                  </p>
                </div>

                <APRDisplay
                  currentAPR={currentAPR}
                  isUpdatingAPR={false}
                  aprUpdateTime={new Date()}
                />
              </div>

              <Tabs
                value={activeTab}
                defaultValue="current-stakes"
                className="w-full"
                onValueChange={(value) =>
                  setActiveTab(value as typeof activeTab)
                }
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="current-stakes">
                    Current Stakes
                  </TabsTrigger>
                  <TabsTrigger value="new-stake">New Stake</TabsTrigger>
                </TabsList>

                <TabsContent value="current-stakes">
                  {stakingData && (
                    <StakeDisplay
                      stakedAmount={stakingData.stakedAmount}
                      rewards={stakingData.currentReward}
                      stakingDuration={stakingData.stakingDuration}
                      tokenSymbol={tokenBalance?.symbol ?? ""}
                      onUnstake={initiateUnstake}
                      currentAPR={currentAPR}
                    />
                  )}
                </TabsContent>

                <TabsContent value="new-stake" className="space-y-6">
                  {/* Add StakingCharts here */}
                  <StakingCharts
                    selectedChart={selectedChart}
                    setSelectedChart={setSelectedChart}
                    aprData={aprData}
                    historicalData={historicalData}
                    isLoading={false}
                  />
                  <NewStakeForm
                    availableBalance={
                      tokenBalance ? formatEther(tokenBalance.value) : "0"
                    }
                    tokenSymbol={tokenBalance?.symbol ?? ""}
                    stakeAmount={stakeAmount}
                    setStakeAmount={setStakeAmount}
                    onStake={handleStake}
                    isStaking={isStaking}
                    minStakeAmount="100"
                    maxStakeAmount={tokenBalance?.formatted}
                    currentAPR={currentAPR}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        {/* Dialogs */}
        <UnstakeDialog
          isOpen={unstakeDialogOpen}
          onClose={() => setUnstakeDialogOpen(false)}
          stakedAmount={stakingData?.stakedAmount ?? "0"}
          rewards={stakingData?.currentReward ?? "0"}
          onConfirm={handleUnstake}
          isUnstaking={isUnstaking}
          tokenSymbol={tokenBalance?.symbol ?? ""}
        />

        <Toaster position="bottom-center" />
      </div>
    </ErrorBoundary>
  );
};
