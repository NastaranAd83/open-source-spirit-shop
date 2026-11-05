import { PotionGrid } from "@/components/potions/potion-grid";
import { fetchPotions } from "@/lib/github";

export default async function Home() {
  const potions = await fetchPotions();

  return (
    <div className="container">
      <section className="mb-12 text-center">
        <h1 className="mb-4 bg-linear-to-r from-magic-light-purple via-magic-purple to-magic-pink bg-clip-text text-5xl font-bold text-transparent">
          Open Source Spirit Shop
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover magical potions, brewed from the powers of popular open
          source tools.
        </p>
      </section>

      <PotionGrid potions={potions} />
    </div>
  );
}
