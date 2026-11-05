import { notFound } from "next/navigation";

import { fetchPotion } from "@/lib/github";
import { parseSlug } from "@/utils";

type PotionPageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-build only the popular repos (ISR). Every other slug is rendered on
// demand and then cached, because `dynamicParams` defaults to true.
export async function generateStaticParams() {
  const popularRepos = [
    "facebook/react",
    "tailwindlabs/tailwindcss",
    "nodejs/node",
    "vercel/next.js",
    "microsoft/TypeScript",
  ];

  return popularRepos.map((repo) => ({
    slug: repo.replace("/", "_"),
  }));
}

export default async function PotionPage({ params }: PotionPageProps) {
  const { slug } = await params;
  const { owner, repo } = parseSlug(slug);

  if (!owner || !repo) {
    notFound();
  }

  const potion = await fetchPotion(owner, repo);

  if (!potion) {
    notFound();
  }

  // temporary: just to see the data
  return <pre className="overflow-auto text-sm">{JSON.stringify(potion, null, 2)}</pre>;
}
