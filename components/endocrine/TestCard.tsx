import Link from "next/link";
import { EndocrineTest } from "@/data/endocrineTests";

export const COLOR_MAP: Record<string, {
  accent: string; border: string; badge: string; badgeText: string;
}> = {
  blue:    { accent: "text-blue-400",    border: "border-blue-500/30 hover:border-blue-400",    badge: "bg-blue-500/10 border-blue-500/20",    badgeText: "text-blue-400" },
  violet:  { accent: "text-violet-400",  border: "border-violet-500/30 hover:border-violet-400",  badge: "bg-violet-500/10 border-violet-500/20",  badgeText: "text-violet-400" },
  teal:    { accent: "text-teal-400",    border: "border-teal-500/30 hover:border-teal-400",    badge: "bg-teal-500/10 border-teal-500/20",    badgeText: "text-teal-400" },
  red:     { accent: "text-red-400",     border: "border-red-500/30 hover:border-red-400",     badge: "bg-red-500/10 border-red-500/20",     badgeText: "text-red-400" },
  emerald: { accent: "text-emerald-400", border: "border-emerald-500/30 hover:border-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/20", badgeText: "text-emerald-400" },
  amber:   { accent: "text-amber-400",   border: "border-amber-500/30 hover:border-amber-400",   badge: "bg-amber-500/10 border-amber-500/20",   badgeText: "text-amber-400" },
  rose:    { accent: "text-rose-400",    border: "border-rose-500/30 hover:border-rose-400",    badge: "bg-rose-500/10 border-rose-500/20",    badgeText: "text-rose-400" },
  sky:     { accent: "text-sky-400",     border: "border-sky-500/30 hover:border-sky-400",     badge: "bg-sky-500/10 border-sky-500/20",     badgeText: "text-sky-400" },
  orange:  { accent: "text-orange-400",  border: "border-orange-500/30 hover:border-orange-400",  badge: "bg-orange-500/10 border-orange-500/20",  badgeText: "text-orange-400" },
  lime:    { accent: "text-lime-400",    border: "border-lime-500/30 hover:border-lime-400",    badge: "bg-lime-500/10 border-lime-500/20",    badgeText: "text-lime-400" },
  indigo:  { accent: "text-indigo-400",  border: "border-indigo-500/30 hover:border-indigo-400",  badge: "bg-indigo-500/10 border-indigo-500/20",  badgeText: "text-indigo-400" },
};

interface TestCardProps {
  test: EndocrineTest;
  index: number;
}

export default function TestCard({ test, index }: TestCardProps) {
  const c = COLOR_MAP[test.color] ?? COLOR_MAP.blue;
  const isAvailable = test.status === "available";

  const inner = (
    <div className={`
      flex items-center gap-4 p-4 rounded-2xl border bg-gray-900
      transition-all duration-200 ${c.border}
      ${isAvailable ? "active:scale-[0.98]" : "opacity-40"}
    `}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 border ${c.badge} ${c.badgeText}`}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white leading-snug">{test.name}</p>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{test.tagline}</p>
        {!isAvailable && (
          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-500 border border-gray-700">
            Coming soon
          </span>
        )}
      </div>
      {isAvailable && <span className={`text-lg ${c.accent} flex-shrink-0`}>›</span>}
    </div>
  );

  return isAvailable ? (
    <Link href={`/endocrine/${test.id}`} className="block">{inner}</Link>
  ) : (
    <div>{inner}</div>
  );
}
