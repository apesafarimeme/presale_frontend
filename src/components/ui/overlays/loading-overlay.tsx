// components/ui/loading-overlay.tsx
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const LoadingOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 bg-white/50 dark:bg-black/50 
               flex items-center justify-center backdrop-blur-sm z-50"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="h-8 w-8 text-primary" />
    </motion.div>
  </motion.div>
);