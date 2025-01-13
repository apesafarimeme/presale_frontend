// utils/formatters.ts
export const formatAxisNumber = (number: number) => {
  const absNumber = Math.abs(number);
  if (absNumber >= 1000000000) {
    return `${(number / 1000000000).toFixed(1)}B`;
  } else if (absNumber >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  } else if (absNumber >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }
  return number.toString();
};

export const formatNumber = (num: string | number) => {
  return new Intl.NumberFormat().format(parseFloat(num.toString()));
};
