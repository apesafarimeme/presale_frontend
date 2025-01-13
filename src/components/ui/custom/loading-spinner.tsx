// src/components/ui/custome/loading-spinner.tsx
import { Loader2 } from "lucide-react";

export const LoadingSpinner = ({
  size = "default",
}: {
  size?: "small" | "default" | "large";
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-6 h-6",
    large: "w-8 h-8",
  };

  return <Loader2 className={`${sizeClasses[size]} animate-spin`} />;
};
