// components/staking/APRDisplay.tsx
import { TrendingUp } from "lucide-react";
import { InfoTooltip } from "./common/InfoTooltip";
import Spinner from "@/components/ui/spinner";

interface APRDisplayProps {
  currentAPR: number;
  isUpdatingAPR: boolean;
  aprUpdateTime: Date;
}

export const APRDisplay = ({
  currentAPR,
  isUpdatingAPR,
  aprUpdateTime,
}: APRDisplayProps) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg relative">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        <TrendingUp className="h-4 w-4" />
        <span className="flex items-center">
          Current APR
          <InfoTooltip
            content={
              <div className="space-y-2">
                <p>Annual Percentage Rate (APR):</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Updates every 30 seconds</li>
                  <li>Based on total staked amount</li>
                  <li>Includes bonus rewards</li>
                  <li>Last updated: {aprUpdateTime.toLocaleTimeString()}</li>
                </ul>
              </div>
            }
          />
        </span>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-base sm:text-lg font-bold mt-1 text-green-600">
          {currentAPR}
        </p>
        {isUpdatingAPR && <Spinner className="h-4 w-4 text-gray-400" />}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Last updated: {aprUpdateTime.toLocaleTimeString()}
      </div>
    </div>
  );
};
