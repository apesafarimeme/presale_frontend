// src/components/ui/custom/crypto-button.tsx

import { cn } from "@/lib/utils";

import { PRESALE_CONFIG } from "@/config/presale";

interface StakeButtonProps {
  onStakeAction: () => void;
  children: React.ReactNode;
  className?: string;
}

const StakeButton: React.FC<StakeButtonProps> = ({
  children,
  className,
  onStakeAction,
}) => {
  const now = Math.floor(Date.now() / 1000);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (now >= PRESALE_CONFIG.START_TIME && now <= PRESALE_CONFIG.END_TIME) {
      e.preventDefault();
      onStakeAction();
    } else {
      console.log("presale not started or ended");
    }
  };
  return (
    <div className="flex flex-col items-center">
      <button
        className={cn(
          "relative px-8 py-4 font-bold text-white rounded-full group",
          "transition-all duration-150 ease-in-out",
          "shadow-lg hover:shadow-xl",
          className,
        )}
        onClick={handleClick}
      >
        <span className="relative flex items-center justify-center">
          {children}
        </span>
      </button>
    </div>
  );
};

export default StakeButton;
