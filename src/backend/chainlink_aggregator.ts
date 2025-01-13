// src/backend/chainlink_agregator.ts
export const CHAINLINKV3_AGREGATOR_ABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

// TODO: uncomment these addresses
// mainnet addresses
export const CHAINLINKV3_AGREGATOR_BNB_ADDRESS =
  "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
export const CHAINLINKV3_AGREGATOR_ETH_ADDRESS = "handleTransaction";

// TODO: comment out these addresses
// testnet addresses
// export const CHAINLINKV3_AGREGATOR_BNB_ADDRESS =
//   "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526";
// export const CHAINLINKV3_AGREGATOR_ETH_ADDRESS =
//   "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7";
