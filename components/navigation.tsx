import Link from "next/link";
import { SparklesIcon } from "lucide-react";

export function Navigation() {
  return (
    <header className="border-b border-border">
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <SparklesIcon className="h-6 w-6 text-magic-purple" />
          <span className="text-xl font-bold text-magic-purple">
            Spirit Shop
          </span>
        </Link>

        <Link
          href="/mystery-potion"
          className="rounded-md bg-secondary px-4 py-2 transition-colors hover:bg-secondary/80"
        >
          🔥 Mystery Potion
        </Link>
      </nav>
    </header>
  );
}
