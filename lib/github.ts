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

export function transformRepoToPotion(repo: GitHubRepo, index: number): Potion {
  return {
    ...repo,
    topics: repo.topics.slice(0, 3),
    potionEffect: POTION_EFFECTS[index % POTION_EFFECTS.length],
    magicalType: ELEMENT_TYPES[repo.id % ELEMENT_TYPES.length],
  };
}

// SSG: cached at build time
export async function fetchPotions(): Promise<Potion[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/search/repositories?q=topic:javascript+stars:>5000&sort=stars&order=desc`,
      {
        headers: getHeaders(),
        cache: "force-cache",
      }
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

// ISR: cached, then revalidated every hour
export async function fetchPotion(
  owner: string,
  repo: string
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

