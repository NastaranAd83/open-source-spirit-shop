import { CalendarIcon, CodeIcon } from "lucide-react";

import {
  PotionHeader,
  PotionInfoCard,
  PotionStats,
} from "@/components/potions/potion-common";
import type { Potion } from "@/types/github";

interface PotionInfoProps {
  potion: Potion;
  title: string;
  subtitle: string;
}

export function PotionInfo({ potion, title, subtitle }: PotionInfoProps) {
  const {
    name,
    owner,
    stargazers_count: stars,
    forks_count: forks,
    potionEffect,
    magicalType,
    language,
    updated_at,
  } = potion;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-purple-200">{title}</h1>
        <p className="text-purple-300/70">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* ---------- Left column ---------- */}
        <div
          className={`h-full space-y-4 rounded-2xl border border-magic-purple/20 p-6 md:col-span-1 potion-${magicalType}`}
        >
          <PotionHeader name={name} owner={owner} size="medium" />

          <PotionInfoCard title="Effect">{potionEffect}</PotionInfoCard>

          <PotionInfoCard title="GitHub Stats">
            <PotionStats stars={stars} forks={forks} />
          </PotionInfoCard>

          <PotionInfoCard title="Language">
            <div className="flex items-center gap-2">
              <CodeIcon className="mr-2 h-4 w-4 text-green-400" />
              <span>{language ?? "Unknown"}</span>
            </div>
          </PotionInfoCard>

          <PotionInfoCard title="Last Updated">
            <div className="flex items-center gap-2">
              <CalendarIcon className="mr-2 h-4 w-4 text-purple-400" />
              <span>
                {new Date(updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </PotionInfoCard>
        </div>

      </div>
    </div>
  );
}
