// src/constants/price-schedule.ts

import { PRESALE_CONFIG } from "@/config/presale";

type DailyPrice = {
  day: number;
  priceUSD: number;
};

const calculateDailyPrices = (): DailyPrice[] => {
  const prices: DailyPrice[] = [];

  for (let day = 0; day < 30; day++) {
    const price = 10_000_000_000 / tokensPerDollar[day]; // * Math.pow(growthRate, day);
    prices.push({
      day: day,
      priceUSD: Number(price.toFixed(6)),
    });
  }

  return prices;
};

const tokensPerDollar = [
  1_000_000_000_000, 900_900_900_901, 819672131148, 740740740741, 675675675676,
  617283950617, 564971751412, 518134715026, 476190476190, 438596491228,
  404858299595, 373134328358, 344827586207, 318471337580, 294985250737,
  273224043716, 253164556962, 235294117647, 218340611354, 202839756592,
  188679245283, 175438596491, 163398692810, 152207001522, 141643059490,
  132100396301, 123152709360, 114810562572, 107181136120, 100000000000,
];

export const PRICE_SCHEDULE = {
  PRESALE_START: PRESALE_CONFIG.START_TIME, //  Math.floor(Date.now() / 1000), // Current timestamp for testing
  PRESALE_DURATION_DAYS: 30,
  INITIAL_PRICE_USD: 0.01,
  FINAL_PRICE_USD: 0.1,

  // Pre-calculated daily prices
  DAILY_PRICES: calculateDailyPrices(),

  getCurrentDay: () => {
    const now = Math.floor(Date.now() / 1000);
    const daysSinceStart = Math.floor(
      (now - PRICE_SCHEDULE.PRESALE_START) / 86400,
    );
    console.log("Current day calculation:", {
      now,
      startTime: PRICE_SCHEDULE.PRESALE_START,
      daysSinceStart,
      resultDay: Math.min(Math.max(1, daysSinceStart), 30),
    });
    return Math.min(Math.max(0, daysSinceStart), 30);
  },

  getCurrentPrice: () => {
    const currentDay = PRICE_SCHEDULE.getCurrentDay();
    const currentPrice = PRICE_SCHEDULE.DAILY_PRICES[currentDay].priceUSD;
    // Add console.log for debugging
    console.log("Current price calculation:", {
      currentDay,
      currentPrice,
    });
    return PRICE_SCHEDULE.DAILY_PRICES[currentDay].priceUSD;
  },

  getPriceAtTime: (timestamp: number) => {
    const daysSinceStart = Math.floor(
      (timestamp - PRICE_SCHEDULE.PRESALE_START) / 86400,
    );
    const day = Math.min(Math.max(0, daysSinceStart), 29);
    return PRICE_SCHEDULE.DAILY_PRICES[day].priceUSD;
  },

  // Helper function to get all prices
  getAllPrices: () => PRICE_SCHEDULE.DAILY_PRICES.map((day) => day.priceUSD),
} as const;

export type PriceSchedule = typeof PRICE_SCHEDULE;
