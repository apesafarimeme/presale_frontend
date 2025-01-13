// hooks/useTransactionHandler.ts
import { useWriteContract, useConfig } from "wagmi";
// import { toast } from "sonner";
import { parseUnits, formatUnits } from "viem";
import { waitForTransactionReceipt, readContract } from "wagmi/actions";
import { erc20Abi } from "viem";
import { PRESALE_CONTRACT_ADDRESS } from "@/backend/addresses";
import { PRESALE_CONTRACT_ABI } from "@/backend/presaleABI";
// import { getTokenAddress, getTokenDecimals } from "@/config/token-addresses";
// import { getNetworkConfig } from "@/config/network-config";
import { TOKEN_ADDRESSES } from "@/config/addresses";
// import { getTokenDecimals } from "@/utils/token-utils";

export const useTransactionHandler = (
  currentCrypto: string,
  amount: string,
  tokenAmount: string,
  address: `0x${string}` | undefined,
) => {
  const config = useConfig();
  const { writeContractAsync } = useWriteContract();

  const handleTransaction = async () => {
    if (!address) throw new Error("No wallet connected");

    const purchaseAmount = parseFloat(amount);
    if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
      throw new Error("Invalid amount");
    }

    const handleEthPurchase = async (purchaseAmount: number) => {
      try {
        const tokenAddress = TOKEN_ADDRESSES["ETH"];
        const amountInWei = parseUnits(purchaseAmount.toString(), 18);

        console.log("ETH Purchase Details:", {
          amount: formatUnits(amountInWei, 18),
          tokenAddress,
          presaleAddress: PRESALE_CONTRACT_ADDRESS,
        });

        // Check and handle allowance first
        await handleAllowance(tokenAddress, amountInWei);

        console.log("Allowance confirmed, proceeding with purchase");
        console.log("Amount in wei: ", amountInWei);

        const hash = await writeContractAsync({
          address: PRESALE_CONTRACT_ADDRESS,
          abi: PRESALE_CONTRACT_ABI,
          functionName: "buyWithETH",
          args: [tokenAddress, amountInWei],
        });
        console.log("Purchase transaction submitted:", hash);
        return hash;
      } catch (error: any) {
        console.error("Purchase failed:", {
          error: error.message,
          code: error.code,
          data: error.data,
        });

        // More user-friendly error messages
        if (error.message.includes("insufficient funds")) {
          throw new Error("Insufficient ETH balance");
        } else if (error.message.includes("exceeds allowance")) {
          throw new Error("Please approve more tokens");
        } else if (error.message.includes("transfer amount exceeds balance")) {
          throw new Error("Insufficient token balance");
        } else {
          throw error;
        }
      }
    };

    switch (currentCrypto) {
      case "BNB":
        return handleNativeTokenPurchase(purchaseAmount);
      case "ETH": // Handle ETH separately because it needs price feed
        return handleEthPurchase(purchaseAmount);
      case "USDT":
      case "USDC":
      case "BUSD":
      case "DAI":
        return handleStablecoinPurchase(currentCrypto, purchaseAmount);
      default:
        throw new Error("Unsupported cryptocurrency");
    }

    // const purchaseAmount = parseFloat(amount);
    // if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
    //   throw new Error("Invalid amount");
    // }
    // console.log("handleTransaction", { purchaseAmount, tokenAmount });

    // if (currentCrypto === "BNB") {
    //   return handleBNBPurchase(purchaseAmount);
    // } else if (["USDT", "USDC", "BUSD", "DAI", "ETH"].includes(currentCrypto)) {
    //   return handleTokenPurchase(purchaseAmount);
    // } else {
    //   throw new Error("Invalid crypto");
    // }
  };

  const handleNativeTokenPurchase = async (purchaseAmount: number) => {
    console.log("handleNativeTokenPurchase");
    const amountInWei = parseUnits(purchaseAmount.toString(), 18);
    console.log("amount in wei: ", amountInWei);
    const hash = await writeContractAsync({
      address: PRESALE_CONTRACT_ADDRESS,
      abi: PRESALE_CONTRACT_ABI,
      functionName: "buyWithNative",
      args: [amountInWei], // Add the args parameter with the amount
      value: amountInWei,
    });
    return hash;
  };

  const handleStablecoinPurchase = async (
    stablecoin: keyof typeof TOKEN_ADDRESSES,
    purchaseAmount: number,
  ) => {
    const tokenAddress = TOKEN_ADDRESSES[stablecoin];

    console.log("Stablecoin purchase details:", {
      stablecoin,
      tokenAddress,
      purchaseAmount,
      purchaseAmountString: purchaseAmount.toString(),
    });

    // const decimals = getTokenDecimals(stablecoin); // Use the helper function
    const amountInSmallestUnit = parseUnits(purchaseAmount.toString(), 18);

    console.log("Amount calculations:", {
      stablecoin,
      original: purchaseAmount,
      inWei: amountInSmallestUnit.toString(),
      decimals: 18,
    });

    // Check current allowance before requesting
    const currentAllowance = await readContract(config, {
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address!, PRESALE_CONTRACT_ADDRESS],
    });

    console.log("Allowance check in currentAllowance:", {
      stablecoin,
      currentAllowance: currentAllowance.toString(),
      requestedAmount: amountInSmallestUnit.toString(),
    });

    // Check and handle allowance
    console.log("amountInSmallestUnit", amountInSmallestUnit);
    await handleAllowance(tokenAddress, amountInSmallestUnit);
    console.log("allowance okay");
    // Proceed with purchase
    const hash = await writeContractAsync({
      address: PRESALE_CONTRACT_ADDRESS,
      abi: PRESALE_CONTRACT_ABI,
      functionName: "buyWithStableCoins",
      args: [tokenAddress, amountInSmallestUnit],
    });
    console.log("hash: ", hash);
    return hash;
  };

  // const handleTokenPurchase = async (purchaseAmount: number) => {
  //   const chainId = getNetworkConfig().chainId;
  //   const tokenAddress = getTokenAddress(currentCrypto, chainId);
  //   if (!tokenAddress)
  //     throw new Error(`Token address not found for ${currentCrypto}`);

  //   const decimals = getTokenDecimals(currentCrypto);
  //   const amountInWei = parseUnits(purchaseAmount.toString(), decimals);

  //   // Check and handle allowance
  //   await handleAllowance(tokenAddress, amountInWei);

  //   // Proceed with purchase
  //   const hash = await writeContractAsync({
  //     address: PRESALE_CONTRACT_ADDRESS,
  //     abi: PRESALE_CONTRACT_ABI,
  //     functionName: "buyWithStableCoin",
  //     args: [amountInWei, tokenAddress],
  //   });
  //   return hash;
  // };

  // const handleAllowance = async (
  //   tokenAddress: `0x${string}`,
  //   amount: bigint
  // ) => {
  //   const allowance = await readContract(config, {
  //     address: tokenAddress,
  //     abi: erc20Abi,
  //     functionName: "allowance",
  //     args: [address!, PRESALE_CONTRACT_ADDRESS],
  //   });

  //   if (allowance < amount) {
  //     const approvalHash = await writeContractAsync({
  //       address: tokenAddress,
  //       abi: erc20Abi,
  //       functionName: "approve",
  //       args: [PRESALE_CONTRACT_ADDRESS, amount],
  //     });

  //     const receipt = await waitForTransactionReceipt(config, {
  //       hash: approvalHash,
  //     });

  //     if (receipt.status !== "success") {
  //       throw new Error("Token approval failed");
  //     }
  //   }
  // };

  const handleAllowance = async (
    tokenAddress: `0x${string}`,
    amount: bigint,
  ) => {
    console.log("Checking allowance:", {
      tokenAddress,
      requestedAmount: formatUnits(amount, 18),
      owner: address,
      spender: PRESALE_CONTRACT_ADDRESS,
    });

    const allowance = await readContract(config, {
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address!, PRESALE_CONTRACT_ADDRESS],
    });

    console.log("Current allowance:", {
      raw: allowance.toString(),
      formatted: formatUnits(allowance, 18),
      sufficientAllowance: allowance >= amount,
    });

    if (allowance < amount) {
      console.log("Insufficient allowance, requesting approval");

      try {
        const approvalHash = await writeContractAsync({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [PRESALE_CONTRACT_ADDRESS, amount],
        });

        console.log("Approval transaction submitted:", approvalHash);

        // Wait for the approval transaction to be mined
        const receipt = await waitForTransactionReceipt(config, {
          hash: approvalHash,
        });

        console.log("Approval transaction receipt:", receipt);

        if (receipt.status !== "success") {
          throw new Error("Token approval failed");
        }

        // Verify the new allowance
        const newAllowance = await readContract(config, {
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "allowance",
          args: [address!, PRESALE_CONTRACT_ADDRESS],
        });

        console.log("New allowance after approval:", {
          raw: newAllowance.toString(),
          formatted: formatUnits(newAllowance, 18),
        });

        if (newAllowance < amount) {
          throw new Error("Approval did not result in sufficient allowance");
        }
      } catch (error) {
        console.error("Approval error:", error);
        throw new Error("Failed to approve token transfer");
      }
    } else {
      console.log("Sufficient allowance exists, no approval needed");
    }
  };

  return {
    handleTransaction,
  };
};
