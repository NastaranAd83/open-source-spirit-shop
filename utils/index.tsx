import type { MagicalType } from "@/types/github";
import { MAGICAL_TYPES } from "@/utils/constants";

export function getMagicalTypeIcon(magicalType: MagicalType) {
  return MAGICAL_TYPES.find((type) => type.id === magicalType)?.icon;
}

export function formatNumber(num: number) {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
}
