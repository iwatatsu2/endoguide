import Link from "next/link";
import { EndocrineTest } from "@/data/endocrineTests";

const COLOR_MAP: Record<string, { accent: string; glow: string; badge: string; badgeText: string }> = {
  blue:    { accent: "text-blue-400",    glow: "border-blue-500/40 hover:border-blue-400",    badge: "bg-blue-500/10 border-blue-500/20",    badgeText: "text-blue-400" },
  violet:  { accent: "text-violet-400",  glow: "border-violet-500/40 hover:border-violet-400",  badge: "bg-violet-500/10 border-violet-500/20",  badgeText: "text-violet-400" },
  teal:    { accent: "text-teal-400",    glow: "border-teal-500/40 hover:border-teal-400",    badge: "bg-teal-500/10 border-teal-500/20",    badgeText: "text-teal-400" },
  red:     { accent: "text-red-400",     glow: "border-red-500/40 hover:border-red-400",     badge: "bg-red-500/10 border-red-500/20",     badgeText: "text-red-400" },
  emerald: { accent: "text-emerald-400", glow: "border-emerald-500/40 hover:border-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/20", badgeText: "text-emerald-400" },
};

const AXIS_LABEL: Record<string, string> = {
  "rapid-acth":                "HPA axis",
  "dexamethasone-suppression": "HPA axis",
  "crh-test":                  "HPA axis",
  "insulin-hypoglycemia":      "HPA axis",
  "trh-test":                  "HPT axis",
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
      transition-all duration-200
      ${c.glow}
      ${isAvailable ? "active:scale-[0.98]" : "opacity-40"}
    `}>
      {/* 番号 */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 border ${c.badge} ${c.badgeText}`}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* テキスト */}
      <div className="flex-1 min-w-0">
        <p className={`text-base font-bold text-white leading-snug`}>{test.name}</p>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{test.tagline}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold border ${c.badge} ${c.badgeText}`}>
            {AXIS_LABEL[test.id]}
          </span>
          {!isAvailable && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-800 text-gray-500 border border-gray-700">
              Coming soon
            </span>
          )}
        </div>
      </div>

      {/* 矢印 */}
      {isAvailable && (
        <span className={`text-lg ${c.accent} flex-shrink-0`}>›</span>
      )}
    </div>
  );

  return isAvailable ? (
    <Link href={`/endocrine/${test.id}`} className="block">
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  );
}
