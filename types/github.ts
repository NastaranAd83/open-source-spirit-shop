export type MagicalType = "fire" | "ice" | "electric" | "all";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  language: string | null;
  updated_at: string;
}

export interface Potion extends GitHubRepo {
  potionEffect: string;
  magicalType: MagicalType;
}
