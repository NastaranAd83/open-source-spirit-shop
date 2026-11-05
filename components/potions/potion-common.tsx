import Image from "next/image";
import type { ReactNode } from "react";
import { PackageIcon, StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { GitHubRepo } from "@/types/github";
import { formatNumber } from "@/utils";

// ---------- PotionHeader ----------
interface PotionHeaderProps {
  name: string;
  owner: GitHubRepo["owner"];
  size?: "small" | "medium";
}

export function PotionHeader({
  name,
  owner,
  size = "small",
}: PotionHeaderProps) {
  const { login, avatar_url } = owner;
  const isMedium = size === "medium";

  return (
    <div className={cn("flex items-center", isMedium ? "mb-6" : "mb-2")}>
      <div
        className={cn(
          "relative mr-4 overflow-hidden rounded-full",
          isMedium ? "h-12 w-12" : "h-10 w-10",
        )}
      >
        <Image
          src={avatar_url}
          alt={login}
          fill
          sizes={isMedium ? "48px" : "40px"}
          className="object-cover"
        />
      </div>
      <div>
        <h3 className={cn("font-semibold", isMedium ? "text-xl" : "text-base")}>
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">{login}</p>
      </div>
    </div>
  );
}

// ---------- PotionInfoCard ----------
interface PotionInfoCardProps {
  title: string;
  children?: ReactNode;
}

export function PotionInfoCard({ title, children }: PotionInfoCardProps) {
  return (
    <div className="rounded-lg border border-magic-purple/10 bg-black/40 p-4">
      <h4 className="mb-2 text-sm font-medium text-magic-light-purple">
        {title}
      </h4>
      {children}
    </div>
  );
}

// ---------- PotionStats ----------
interface PotionStatsProps {
  stars: number;
  forks: number;
  className?: string;
}

export function PotionStats({ stars, forks, className }: PotionStatsProps) {
  return (
    <div className={cn("flex justify-between", className)}>
      <div className="flex items-center gap-1">
        <StarIcon className="h-4 w-4 text-yellow-400" />
        <span>{formatNumber(stars)}</span>
      </div>
      <div className="flex items-center gap-1">
        <PackageIcon className="h-4 w-4 text-blue-400" />
        <span>{formatNumber(forks)}</span>
      </div>
    </div>
  );
}
