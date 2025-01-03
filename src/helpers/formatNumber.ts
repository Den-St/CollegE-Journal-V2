export function formatNumber(num:number) {
  return Number.isInteger(num) ? num.toString() : num.toFixed(1);
}