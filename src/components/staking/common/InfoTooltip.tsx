import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface InfoTooltipProps {
  content: React.ReactNode;
  className?: string;
  title?: string;
}

export const tooltipAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2 },
};

export const InfoTooltip = ({
  content,
  className,
  title,
}: InfoTooltipProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild className={`ml-1.5 cursor-help ${className}`}>
        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-500 transition-colors duration-200" />
      </TooltipTrigger>
      <TooltipContent
        className="max-w-[280px] text-sm bg-white dark:bg-gray-800
                   text-gray-700 dark:text-gray-300 shadow-lg
                   border border-gray-200 dark:border-gray-700"
      >
        <motion.div className="p-2 space-y-2" {...tooltipAnimation}>
          {title && (
            <div className="font-medium border-b border-gray-200 dark:border-gray-700 pb-1">
              {title}
            </div>
          )}
          <div className="space-y-1">{content}</div>
        </motion.div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
