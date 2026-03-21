import { endocrineTests, TestCategory } from "@/data/endocrineTests";
import TestCard from "@/components/endocrine/TestCard";

export const metadata = {
  title: "Endo Compass – Endocrine Stimulation Tests",
  description: "Quick reference for residents. Endocrine loading tests at a glance.",
};

const CATEGORY_META: Record<TestCategory, { icon: string; axis: string }> = {
  "副腎・HPA軸":       { icon: "🧠", axis: "HPA axis" },
  "副腎・褐色細胞腫":  { icon: "🔴", axis: "Catecholamine" },
  "副腎・アルドステロン": { icon: "🧂", axis: "RAAS axis" },
  "甲状腺・HPT軸":     { icon: "🦋", axis: "HPT axis" },
  "成長ホルモン軸":    { icon: "📈", axis: "GH axis" },
  "性腺軸":            { icon: "🔬", axis: "HPG axis" },
  "ADH・水代謝":       { icon: "💧", axis: "ADH axis" },
  "膵臓・血糖":        { icon: "🩸", axis: "Pancreas" },
};

const CATEGORY_ORDER: TestCategory[] = [
  "副腎・HPA軸",
  "副腎・褐色細胞腫",
  "副腎・アルドステロン",
  "甲状腺・HPT軸",
  "成長ホルモン軸",
  "性腺軸",
  "ADH・水代謝",
  "膵臓・血糖",
];

export default function EndocrinePage() {
  const grouped = CATEGORY_ORDER.reduce<Record<TestCategory, typeof endocrineTests[0][]>>(
    (acc, cat) => {
      acc[cat] = endocrineTests.filter((t) => t.category === cat);
      return acc;
    },
    {} as Record<TestCategory, typeof endocrineTests[0][]>
  );

  let globalIndex = 0;

  return (
    <div className="min-h-screen bg-gray-950">

      {/* ── ヘッダー ── */}
      <div className="sticky top-0 z-10 bg-gray-950 border-b border-gray-800 px-4 pt-10 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-1">
                Endocrine · Loading Tests
              </p>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Endo<span className="text-blue-400"> Compass</span>
              </h1>
            </div>
            <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              for Residents
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {endocrineTests.filter(t => t.status === "available").length} tests available · Tap to review
          </p>
        </div>
      </div>

      {/* ── カテゴリ別リスト ── */}
      <div className="px-4 py-5 max-w-lg mx-auto pb-16 space-y-6">
        {CATEGORY_ORDER.map((category) => {
          const tests = grouped[category];
          if (!tests || tests.length === 0) return null;
          const meta = CATEGORY_META[category];

          return (
            <div key={category}>
              {/* カテゴリヘッダー */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="text-base">{meta.icon}</span>
                <div>
                  <p className="text-xs font-black text-white tracking-wide">{category}</p>
                  <p className="text-xs text-gray-600">{meta.axis}</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {tests.map((test) => {
                  const idx = globalIndex++;
                  return <TestCard key={test.id} test={test} index={idx} />;
                })}
              </div>
            </div>
          );
        })}

        <p className="text-xs text-gray-600 text-center pt-4 px-4 leading-relaxed">
          Reference values may vary by institution.<br />
          Always follow your facility&apos;s protocol.
        </p>
      </div>
    </div>
  );
}
