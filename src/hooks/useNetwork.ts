// src/hooks/useNetwork.ts

import { useEffect, useCallback } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { toast } from "sonner";
import { getNetworkConfig } from "@/config/network";

export function useNetwork() {
  const chainId = useChainId();
  const { isConnected } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  const networkConfig = getNetworkConfig();

  const switchToCorrectNetwork = useCallback(async () => {
    try {
      await switchChainAsync({ chainId: chainId });
      toast.success(`Successfully switched to ${networkConfig.networkName}`);
    } catch (error) {
      console.error("Failed to switch network:", error);
      toast.error("Failed to switch network", {
        description: `Please switch to ${networkConfig.networkName} manually in your wallet`,
      });
    }
  }, [switchChainAsync, chainId, networkConfig.networkName]);

  // Check and handle network mismatch
  useEffect(() => {
    if (isConnected && chainId !== networkConfig.chainId) {
      toast.error("Wrong network detected", {
        description: `Please switch to ${networkConfig.networkName}`,
        action: {
          label: "Switch Network",
          onClick: switchToCorrectNetwork,
        },
      });
    }
  }, [
    chainId,
    isConnected,
    networkConfig.chainId,
    networkConfig.networkName,
    switchToCorrectNetwork,
  ]);

  return {
    isCorrectNetwork: !isConnected || chainId === networkConfig.chainId,
    currentChainId: chainId,
    targetNetwork: networkConfig,
    switchNetwork: switchToCorrectNetwork,
  };
}
