// components/staking/dialogs/UnstakeDialog.tsx
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
import { AlertTriangle, Lock } from "lucide-react";
import { InfoTooltip } from "@/components/staking/common/InfoTooltip";
// import Spinner from "@/components/ui/spinner";
import { formatNumber } from "@/utils/formatters";
// import { Stake } from "@/types/staking";
import type { UnstakeDialogProps } from "@/types/staking";
import { motion } from "framer-motion";

export const UnstakeDialog = ({
  isOpen,
  onClose,
  stakedAmount,
  rewards,
  onConfirm,
  isUnstaking,
  tokenSymbol,
}: UnstakeDialogProps) => {
  // real penalty calculation
  // const calculatePenalty = () => {
  //   const totalDays = 90; // Lockup period
  //   const maxPenalty = 50;
  //   const minPenalty = 5;

  //   const daysElapsed = Math.floor(
  //     (Date.now() - stakedAt.getTime()) / (24 * 60 * 60 * 1000)
  //   );
  //   const progress = daysElapsed / totalDays;

  //   // Logarithmic penalty reduction
  //   const penalty =
  //     maxPenalty -
  //     (Math.log(progress * 9 + 1) / Math.log(10)) * (maxPenalty - minPenalty);

  //   return Math.max(minPenalty, Math.min(maxPenalty, penalty));
  // };
  const calculatePenalty = () => {
    // This should be replaced with your actual penalty calculation logic
    const totalDays = 90;
    const maxPenalty = 50;
    const minPenalty = 5;
    const currentTime = Date.now();
    const progress = currentTime / (totalDays * 24 * 60 * 60 * 1000);

    // Logarithmic penalty reduction
    const penalty =
      maxPenalty -
      (Math.log(progress * 9 + 1) / Math.log(10)) * (maxPenalty - minPenalty);

    return Math.max(minPenalty, Math.min(maxPenalty, penalty));
  };

  const penalty = calculatePenalty();
  const penaltyAmount = (parseFloat(stakedAmount) * penalty) / 100;
  // Calculate final receive amount after penalty
  const receiveAmount = parseFloat(stakedAmount) - penaltyAmount;
  const totalReceiveAmount = receiveAmount + parseFloat(rewards);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
        <DialogHeader className="space-y-2 sm:space-y-4">
          <DialogTitle className="text-lg sm:text-xl flex items-center">
            Confirm Early Unstaking
            <InfoTooltip
              content={
                <div className="space-y-2">
                  <p>Early unstaking penalties protect the protocol by:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Preventing price manipulation</li>
                    <li>Encouraging longer staking periods</li>
                    <li>Redistributing penalties to loyal stakers</li>
                  </ul>
                </div>
              }
              title="Early Unstaking Info"
            />
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            You are about to unstake before the end of the presale period. This
            action will incur a penalty on your staked amount.
          </DialogDescription>
        </DialogHeader>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Warning Alert */}
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="flex items-center">
              Early Unstaking Penalty
              <InfoTooltip
                content="Penalty decreases over time until lock period ends"
                title="Penalty Information"
              />
            </AlertTitle>
            <AlertDescription>
              Unstaking now will result in a {penalty.toFixed(1)}% penalty on
              your staked amount.
            </AlertDescription>
          </Alert>

          {/* Calculation Details */}
          <div className="space-y-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm flex items-center">
                Staked Amount
                <InfoTooltip content="Your original staking amount" />
              </span>
              <span className="font-medium">
                {formatNumber(stakedAmount)} {tokenSymbol}
              </span>
            </div>

            <div className="flex justify-between items-center text-green-500">
              <span className="text-sm flex items-center">
                Earned Rewards
                <InfoTooltip content="Rewards earned from staking" />
              </span>
              <span className="font-medium">
                {formatNumber(rewards)} {tokenSymbol}
              </span>
            </div>

            <div className="flex justify-between items-center text-red-500">
              <span className="text-sm flex items-center">
                Penalty Amount ({penalty.toFixed(1)}%)
                <InfoTooltip
                  content={
                    <div>
                      <p>Penalty breakdown:</p>
                      <p>Rate: {penalty.toFixed(1)}%</p>
                      <p>
                        Amount: {formatNumber(penaltyAmount.toFixed(2))}{" "}
                        {tokenSymbol}
                      </p>
                    </div>
                  }
                  title="Penalty Details"
                />
              </span>
              <span className="font-medium">
                - {formatNumber(penaltyAmount.toFixed(2))} {tokenSymbol}
              </span>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 my-2" />

            <div className="flex justify-between items-center font-bold">
              <span className="text-sm flex items-center">
                Total You Will Receive
                <InfoTooltip
                  content={
                    <div>
                      <p>Calculation:</p>
                      <p>
                        Staked: {formatNumber(stakedAmount)} {tokenSymbol}
                      </p>
                      <p>
                        Rewards: +{formatNumber(rewards)} {tokenSymbol}
                      </p>
                      <p>
                        Penalty: -{formatNumber(penaltyAmount.toFixed(2))}{" "}
                        {tokenSymbol}
                      </p>
                    </div>
                  }
                  title="Total Breakdown"
                />
              </span>
              <span>
                {formatNumber(totalReceiveAmount.toFixed(2))} {tokenSymbol}
              </span>
            </div>
          </div>

          {/* Additional Information */}
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <p className="flex items-center gap-1">
              • Penalty helps maintain price stability
            </p>
            <p className="flex items-center gap-1">
              • Rewards are included in the total amount
            </p>
            <p className="flex items-center gap-1">
              • Action cannot be undone after confirmation
            </p>
          </div>
        </motion.div>

        <DialogFooter className="space-x-2 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isUnstaking}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isUnstaking}
            className="gap-2"
          >
            {isUnstaking ? (
              <motion.div
                className="flex items-center justify-center space-x-2"
                animate={{ opacity: [0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Lock className="h-4 w-4 animate-pulse" />
                <span>Unstaking...</span>
              </motion.div>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                Unstake with Penalty
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
