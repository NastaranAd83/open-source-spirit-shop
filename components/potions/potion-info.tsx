import Image from "next/image";
import { CalendarIcon, CodeIcon, StarIcon } from "lucide-react";

import { GithubIcon } from "@/components/icons/github-icon";
import {
  PotionHeader,
  PotionInfoCard,
  PotionStats,
} from "@/components/potions/potion-common";
import { Badge } from "@/components/ui/badge";
import type { Potion } from "@/types/github";

interface PotionInfoProps {
  potion: Potion;
  title: string;
  subtitle: string;
}

export function PotionInfo({ potion, title, subtitle }: PotionInfoProps) {
  const {
    name,
    full_name,
    owner,
    description,
    stargazers_count: stars,
    forks_count: forks,
    potionEffect,
    magicalType,
    topics,
    language,
    updated_at,
  } = potion;

  const brewingDifficulty = (forks / (stars || 1)) * 100;
  const potency = Math.min(5, 1 + Math.floor(stars / 10000));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-purple-200">{title}</h1>
        <p className="text-purple-300/70">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

        <div className="md:col-span-2">
          <div className="mb-6 rounded-2xl border border-magic-purple/20 p-6">
            <div className="flex items-center justify-between">
              <h2 className="mb-4 bg-linear-to-r from-magic-light-purple via-magic-purple to-magic-pink bg-clip-text text-2xl font-bold text-transparent">
                Repository Details
              </h2>

              <a
                href={`https://github.com/${full_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-magic-pink px-4 py-2 transition-colors hover:bg-magic-pink/80"
              >
                <GithubIcon className="h-4 w-4" />
                View on GitHub
              </a>
            </div>

            <p className="mb-6 text-foreground/80">{description}</p>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <PotionInfoCard title="Organization">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={owner.avatar_url}
                      alt={owner.login}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <span>{owner.login}</span>
                </div>
              </PotionInfoCard>

              <PotionInfoCard title="Repository Name">
                <span>{name}</span>
              </PotionInfoCard>
            </div>

            <PotionInfoCard title="Topics">
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </PotionInfoCard>
          </div>

          <div className="rounded-2xl border border-magic-purple/20 p-6">
            <h3 className="mb-4 bg-linear-to-r from-magic-light-purple via-magic-purple to-magic-pink bg-clip-text text-xl font-semibold text-transparent">
              Magical Properties
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <PotionInfoCard title="Brewing Difficulty">
                <div className="mb-2 text-sm">
                  {brewingDifficulty.toFixed(0)}%
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary/50">
                  <div
                    className="absolute h-full rounded-full bg-linear-to-r from-magic-purple to-magic-pink"
                    style={{ width: `${Math.min(100, brewingDifficulty)}%` }}
                  />
                </div>
              </PotionInfoCard>

              <PotionInfoCard title="Potency">
                <div className="flex">
                  {Array.from({ length: potency }).map((_, i) => (
                    <span key={i}>
                      <StarIcon
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                      />
                    </span>
                  ))}
                </div>
              </PotionInfoCard>

              <div className="md:col-span-2">
                <PotionInfoCard title="Notes from the Alchemist">
                  <p className="text-sm italic">
                    Brew with care: this potion is best enjoyed while shipping
                    to production. Side effects may include sudden bursts of
                    productivity and an unexplained love for open source.
                  </p>
                </PotionInfoCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
