// components/staking/dialogs/ClaimRewardsDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { InfoTooltip } from "../common/InfoTooltip";
import { LoadingSpinner } from "@/components/ui/custom/loading-spinner";
import { formatNumber } from "@/utils/formatters";
import { Stake } from "@/types/staking";

interface ClaimRewardsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stake: Stake | null;
  onConfirm: (stake: Stake) => Promise<void>;
  isClaimingRewards: boolean;
  tokenSymbol: string;
}

export const ClaimRewardsDialog = ({
  isOpen,
  onClose,
  stake,
  onConfirm,
  isClaimingRewards,
  tokenSymbol,
}: ClaimRewardsDialogProps) => {
  if (!stake) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
        <DialogHeader className="space-y-2 sm:space-y-4">
          <DialogTitle className="text-lg sm:text-xl flex items-center">
            Claim Staking Rewards
            <InfoTooltip
              content={
                <div className="space-y-2">
                  <p>Rewards include:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Base APR rewards</li>
                    <li>Early unstaking penalties redistribution</li>
                    <li>Special rewards and bonuses</li>
                  </ul>
                </div>
              }
            />
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            You are about to claim your accumulated staking rewards. Your stake
            will remain active and continue earning rewards.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Rewards Information */}
          <div className="space-y-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center">
                Staked Amount
                <InfoTooltip content="Your original staking amount for this position" />
              </span>
              <span className="font-medium">
                {formatNumber(stake.amount)} {tokenSymbol}
              </span>
            </div>

            <div className="flex justify-between items-center text-green-500">
              <span className="text-sm flex items-center">
                Available Rewards
                <InfoTooltip
                  content={
                    <div className="space-y-2">
                      <p>Rewards breakdown:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Base APR rewards</li>
                        <li>Bonus from penalties</li>
                        <li>Special rewards</li>
                      </ul>
                    </div>
                  }
                />
              </span>
              <span className="font-medium">
                {formatNumber(stake.rewards)} {tokenSymbol}
              </span>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 my-2" />

            <div className="flex justify-between items-center font-bold">
              <span className="text-sm">Total to Claim</span>
              <span className="text-green-500">
                {formatNumber(stake.rewards)} {tokenSymbol}
              </span>
            </div>
          </div>

          {/* Information Alert */}
          <Alert>
            <Coins className="h-4 w-4" />
            <AlertTitle>Claiming Information</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-4 space-y-1 text-sm mt-2">
                <li>Rewards will be transferred to your wallet immediately</li>
                <li>
                  Your stake will remain active and continue earning rewards
                </li>
                <li>There are no penalties or fees for claiming rewards</li>
                <li>
                  New rewards will start accumulating right after claiming
                </li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Staking Details */}
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg space-y-2">
            <div className="text-sm font-medium">Staking Position Details</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500 dark:text-gray-400">
                Staked Since:
              </div>
              <div>{stake.stakedAt.toLocaleDateString()}</div>
              <div className="text-gray-500 dark:text-gray-400">
                Lock Period:
              </div>
              <div>{stake.lockupPeriod} days</div>
            </div>
          </div>
        </div>

        <DialogFooter className="space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isClaimingRewards}
          >
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(stake)}
            disabled={isClaimingRewards || parseFloat(stake.rewards) <= 0}
            className="gap-2"
          >
            {isClaimingRewards ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner />
                <span>Claiming...</span>
              </div>
            ) : (
              <>
                <Coins className="h-4 w-4" />
                Claim Rewards
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
