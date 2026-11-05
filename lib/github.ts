import { cache } from "react";

import type { GitHubRepo, MagicalType, Potion } from "@/types/github";
import { POTION_EFFECTS } from "@/utils/constants";

const GITHUB_API_URL = "https://api.github.com";

const ELEMENT_TYPES: MagicalType[] = ["fire", "ice", "electric"];

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

function isDynamicServerError(error: unknown) {
  return (
    error instanceof Error &&
    "digest" in error &&
    (error as { digest?: string }).digest === "DYNAMIC_SERVER_USAGE"
  );
}

export function transformRepoToPotion(repo: GitHubRepo, index: number): Potion {
  return {
    ...repo,
    topics: repo.topics.slice(0, 3),
    potionEffect: POTION_EFFECTS[index % POTION_EFFECTS.length],
    magicalType: ELEMENT_TYPES[repo.id % ELEMENT_TYPES.length],
  };
}

export async function fetchPotions(): Promise<Potion[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/search/repositories?q=topic:javascript+stars:>5000&sort=stars&order=desc`,
      {
        headers: getHeaders(),
        cache: "force-cache",
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: { items: GitHubRepo[] } = await response.json();

    return data.items.map((repo, index) => transformRepoToPotion(repo, index));
  } catch (error) {
    console.error("Failed to fetch potions:", error);
    return [];
  }
}

export async function fetchPotion(
  owner: string,
  repo: string,
): Promise<Potion | null> {
  try {
    console.log("Fetching potion:", owner, repo);

    const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubRepo = await response.json();

    return transformRepoToPotion(data, 0);
  } catch (error) {
    console.error("Failed to fetch potion:", error);
    return null;
  }
}

export const fetchRandomTrendingPotion = cache(
  async (): Promise<Potion | null> => {
    try {
      const response = await fetch(
        `${GITHUB_API_URL}/search/repositories?q=topic:javascript+stars:>7000&sort=stars&order=desc`,
        {
          headers: getHeaders(),
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data: { items: GitHubRepo[] } = await response.json();

      const randomIndex = Math.floor(Math.random() * data.items.length);

      return transformRepoToPotion(data.items[randomIndex], randomIndex);
    } catch (error) {
      if (isDynamicServerError(error)) {
        throw error;
      }

      console.error("Failed to fetch random potion:", error);
      return null;
    }
  },
);
