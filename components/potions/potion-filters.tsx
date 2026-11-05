import Link from "next/link";

import { cn } from "@/lib/utils";
import { MAGICAL_TYPES } from "@/utils/constants";

// Full class names (not `from-element-${id}/20`) so Tailwind can detect them.
function getFilterPillColor(id: string) {
  if (id === "fire") return "from-element-fire/20";
  if (id === "ice") return "from-element-ice/20";
  if (id === "electric") return "from-element-electric/20";
  return "from-magic-purple/20";
}

export function PotionFilters() {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-4">
      {MAGICAL_TYPES.map(({ id, icon, label }) => (
        <Link
          key={id}
          href={id === "all" ? "/" : `?type=${id}`}
          className={cn(
            "filter-pill flex items-center gap-2 bg-linear-to-br to-transparent",
            getFilterPillColor(id)
          )}
        >
          {icon}
          {label}
        </Link>
      ))}
    </div>
  );
}
