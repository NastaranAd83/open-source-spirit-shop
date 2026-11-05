import Image from "next/image";
import Link from "next/link";
import { PackageIcon, SparklesIcon, StarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Potion } from "@/types/github";
import { formatNumber, getMagicalTypeIcon } from "@/utils";

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
          <div className="flex items-center">
            <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={owner.avatar_url}
                alt={owner.login}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{owner.login}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="mb-4 line-clamp-3 h-[3.75rem] text-sm text-muted-foreground">
            {description}
          </p>

          <div className="mb-4 flex items-center gap-2 text-sm">
            <SparklesIcon className="h-4 w-4 text-magic-light-purple" />
            <span>{potionEffect}</span>
          </div>

          <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span>{formatNumber(stargazers_count)}</span>
            </div>
            <div className="flex items-center gap-1">
              <PackageIcon className="h-4 w-4 text-blue-400" />
              <span>{formatNumber(forks_count)}</span>
            </div>
          </div>

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
