import type { MagicalType } from "@/types/github";
import { MAGICAL_TYPES } from "@/utils/constants";

// Replace the production URL with your real Vercel domain before deploying.
export const ORIGIN_URL = process.env.DEVELOPMENT
  ? "http://localhost:3000"
  : "https://open-source-spirit-shop.vercel.app";

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

// "facebook_react" -> { owner: "facebook", repo: "react" }
// Only the first "_" separates owner and repo (GitHub owners cannot contain "_").
export function parseSlug(slug: string) {
  const index = slug.indexOf("_");
  if (index === -1) return { owner: "", repo: "" };
  return { owner: slug.slice(0, index), repo: slug.slice(index + 1) };
}
