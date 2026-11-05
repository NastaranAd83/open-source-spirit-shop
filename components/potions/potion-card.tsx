import Link from "next/link";
import { SparklesIcon } from "lucide-react";

import {
  PotionHeader,
  PotionStats,
} from "@/components/potions/potion-common";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Potion } from "@/types/github";
import { getMagicalTypeIcon } from "@/utils";

export function PotionCard({ potion }: { potion: Potion }) {
  const {
    name,
    full_name,
    owner,
    description,
    stargazers_count,
    forks_count,
    topics,
    potionEffect,
    magicalType,
  } = potion;

  const slug = full_name.replace("/", "_");

  return (
    <Link href={`/potions/${slug}`}>
      <Card
        className={`potion-card potion-${magicalType} group relative h-full cursor-pointer transition-all duration-300`}
      >
        <div className="absolute right-4 top-4 z-10">
          {getMagicalTypeIcon(magicalType)}
        </div>

        <CardHeader>
          <PotionHeader name={name} owner={owner} />
        </CardHeader>

        <CardContent>
          <p className="mb-4 line-clamp-3 h-[3.75rem] text-sm text-muted-foreground">
            {description}
          </p>

          <div className="mb-4 flex items-center gap-2 text-sm">
            <SparklesIcon className="h-4 w-4 text-magic-light-purple" />
            <span>{potionEffect}</span>
          </div>

          <PotionStats
            stars={stargazers_count}
            forks={forks_count}
            className="mb-4 items-center text-xs text-muted-foreground"
          />

          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
