// utils/aprCalculations.ts

export interface AprDataPoint {
  day: number;
  apr: number;
}

const STAKING_DAYS = 30;
const START_APR = 500;
const END_APR = 100;

export const generateAprData = (): AprDataPoint[] => {
  const data: AprDataPoint[] = [];

  for (let day = 0; day <= STAKING_DAYS; day++) {
    const progress = day / STAKING_DAYS;
    const apr =
      START_APR -
      (Math.log(progress * 9 + 1) / Math.log(10)) * (START_APR - END_APR);
    const roundedApr = Math.round(apr * 100) / 100;
    data.push({
      day: day,
      apr: Math.max(END_APR, roundedApr),
    });
  }
  return data;
};

export const getCurrentAPR = (currentDay: number): number => {
  const progress = currentDay / STAKING_DAYS;
  const apr =
    START_APR -
    (Math.log(progress * 9 + 1) / Math.log(10)) * (START_APR - END_APR);
  return Math.max(END_APR, Math.round(apr * 100) / 100);
};

export const calculateRewards = (
  amount: string,
  days: number,
  currentAPR: number,
): number => {
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum)) return 0;

  const dailyRate = currentAPR / 365 / 100;
  return amountNum * dailyRate * days;
};

export const calculateCompoundRewards = (
  amount: string,
  days: number,
  currentAPR: number,
): number => {
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum)) return 0;

  const dailyRate = currentAPR / 365 / 100;
  return amountNum * Math.pow(1 + dailyRate, days) - amountNum;
};
