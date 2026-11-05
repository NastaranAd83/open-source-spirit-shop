import type { Potion } from "@/types/github";
import { PotionCard } from "@/components/potions/potion-card";

export function PotionGrid({ potions }: { potions: Potion[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {potions.map((potion) => (
        <PotionCard key={potion.id} potion={potion} />
      ))}
    </div>
  );
}
