import type { ReactNode } from "react";
import { FlameIcon, SnowflakeIcon, SparklesIcon, ZapIcon } from "lucide-react";

import type { MagicalType } from "@/types/github";

export const POTION_EFFECTS = [
  "Grants the power of infinite scalability",
  "Heals bugs before they reach production",
  "Summons a swarm of helpful contributors",
  "Banishes merge conflicts for seven days",
  "Grants the vision to see through legacy code",
  "Boosts build speed beyond mortal limits",
  "Enchants your code with flawless type safety",
  "Calls forth a legion of green checkmarks",
];

export const MAGICAL_TYPES: { id: MagicalType; label: string; icon: ReactNode }[] =
  [
    {
      id: "fire",
      label: "Fire Type",
      icon: <FlameIcon className="h-5 w-5 text-element-fire" />,
    },
    {
      id: "ice",
      label: "Ice Type",
      icon: <SnowflakeIcon className="h-5 w-5 text-element-ice" />,
    },
    {
      id: "electric",
      label: "Electric Type",
      icon: <ZapIcon className="h-5 w-5 text-element-electric" />,
    },
    {
      id: "all",
      label: "All Types",
      icon: <SparklesIcon className="h-5 w-5 text-magic-purple" />,
    },
  ];
