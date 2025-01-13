// src/components/ui/wallet-selection-overlay.tsx

// "use client";

// import Image from "next/image";
import { useState } from "react";
import {
  // useAccount,
  useConnect,
  type Connector,
  // useConfig,
  // useChainId,
} from "wagmi";
// import { bsc, bscTestnet } from "wagmi/chains"; // Import the chain you need
// import { switchChain } from "wagmi/actions";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlertCircle, Wallet } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
// import { getNetworkConfig } from "@/config/network-config";
import { useNetwork } from "@/hooks/useNetwork";

interface WalletSelectionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// const walletIcons: Record<string, string> = {
//   MetaMask: "/icons/metamask.svg",
//   WalletConnect: "/icons/walletconnect.svg",
//   // Add more wallet icons
// };

const WalletSelectionOverlay = ({
  isOpen,
  onClose,
}: WalletSelectionOverlayProps) => {
  const { connectors, connectAsync, status, error } = useConnect();
  const [connectingConnectorId, setConnectingConnectorId] = useState<
    string | null
  >(null);
  const { isCorrectNetwork } = useNetwork();

  const handleConnect = async (connector: Connector) => {
    setConnectingConnectorId(connector.uid);
    try {
      await connectAsync({ connector });

      if (!isCorrectNetwork) {
        // switchChainAsync(requiredChain);
        //   const loadingToast = toast.loading("Switching network...");
        //   try {
        //     await switchChainAsync(requiredChain);
        //     toast.dismiss(loadingToast);
        //     toast.success("Successfully switched network");
        //   } catch (switchError) {
        //     toast.dismiss(loadingToast);
        //     toast.error(
        //       `Failed to switch network. Please switch to ${
        //         networkConfig.isTestnet ? "BSC Testnet" : "BSC Mainnet"
        //       } manually.`
        //     );
        //     console.error("Failed to switch chain:", switchError);
        //   }
      }
    } catch (err) {
      console.log("Connection failed:", err);
      toast.error("Failed to connect wallet");
      setConnectingConnectorId(null);
    } finally {
      setConnectingConnectorId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Connect Wallet
            </DialogTitle>
            <DialogDescription className="text-center">
              Choose your preferred wallet to connect to the application
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {!isCorrectNetwork && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {/* Wrong network detected. Please switch to {requiredChain.name}. */}
                </AlertDescription>
              </Alert>
            )}
            {/* Wallet Options */}
            <div className="grid gap-3">
              {connectors.map((connector, index) => (
                <motion.div
                  key={connector.uid}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    // className="w-full h-14 px-6 flex items-center justify-between"
                    className={cn(
                      "w-full h-14 px-6 flex items-center justify-between",
                      "hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
                      "hover:scale-[1.02]", // Subtle hover scaling
                      status === "pending" &&
                        connectingConnectorId === connector.uid
                        ? "opacity-50"
                        : ""
                    )}
                    onClick={() => handleConnect(connector)}
                    // disabled={status === "pending"}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5" />
                      <span className="font-medium">{connector.name}</span>
                      {/* <div className="relative w-6 h-6"> */}
                      {/* {walletIcons[connector.name] ? (
                          <Image
                            src={
                              walletIcons[connector.name] ||
                              "/icons/wallet-default.svg"
                            }
                            alt=""
                            fill
                            sizes="24px"
                            className="object-contain"
                          /> */}
                      {/* ) : ( */}
                      {/* <Wallet className="h-5 w-5" /> */}
                      {/* )} */}
                      {/* </div> */}
                      {/* <span className="font-medium">{connector.name}</span> */}
                    </div>

                    {status === "pending" &&
                      connectingConnectorId === connector.uid && (
                        <motion.span
                          className="text-sm text-gray-500"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          Connecting...
                        </motion.span>
                      )}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Error Message with Animation */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {error.message || "Failed to connect wallet"}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info Alert with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  By connecting your wallet, you agree to our Terms of Service
                  and Privacy Policy
                </AlertDescription>
              </Alert>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletSelectionOverlay;
