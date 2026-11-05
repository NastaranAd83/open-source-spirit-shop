import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PotionInfo } from "@/components/potions/potion-info";
import { fetchRandomTrendingPotion } from "@/lib/github";

// SSR: a new random potion on every request
export async function generateMetadata(): Promise<Metadata> {
  const potion = await fetchRandomTrendingPotion();

  return {
    title: potion ? `Mystery Potion: ${potion.name}` : "Mystery Potion",
    description: potion?.description ?? "A mystery potion awaits.",
    alternates: {
      canonical: "/mystery-potion",
    },
  };
}

export default async function MysteryPotionPage() {
  const potion = await fetchRandomTrendingPotion();

  if (!potion) {
    notFound();
  }

  return (
    <PotionInfo
      potion={potion}
      title="Mystery Potion"
      subtitle="A random trending brew, freshly summoned on every visit"
    />
  );
}
