import { notFound } from "next/navigation";

import { PotionInfo } from "@/components/potions/potion-info";
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

  return (
    <PotionInfo
      potion={potion}
      title="Potion Details"
      subtitle="Discover the magical properties of this enchanted brew"
    />
  );
}
