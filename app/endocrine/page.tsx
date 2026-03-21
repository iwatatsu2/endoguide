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

        {/* ── 制作者 ── */}
        <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-5 space-y-4">
          <div className="text-center">
            <p className="text-base font-black text-white">Dr.いわたつ</p>
            <p className="text-xs text-gray-400 mt-0.5">糖尿病・内分泌専門医</p>
          </div>

          <div className="space-y-3">
            {/* 公式HP */}
            <a
              href="https://driwatatsu.readdy.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-gray-800 px-4 py-3 hover:bg-gray-700 transition-colors"
            >
              <span className="text-lg">🌐</span>
              <div>
                <p className="text-xs font-semibold text-gray-300">公式サイト</p>
                <p className="text-xs text-gray-500">アプリ・研究・講演情報はこちら</p>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/dr.iwatatsu/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-gray-800 px-4 py-3 hover:bg-gray-700 transition-colors"
            >
              <span className="text-lg">📸</span>
              <div>
                <p className="text-xs font-semibold text-gray-300">Instagram</p>
                <p className="text-xs text-gray-500">@dr.iwatatsu</p>
              </div>
            </a>

            {/* 勉強会・研修依頼 */}
            <a
              href="https://driwatatsu.readdy.co/corporate#contact-form"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-blue-500/10 border border-blue-500/30 px-4 py-3 hover:bg-blue-500/20 transition-colors"
            >
              <span className="text-lg">📚</span>
              <div>
                <p className="text-xs font-semibold text-blue-300">勉強会・研修のご依頼</p>
                <p className="text-xs text-gray-500">このツールを用いた講義・研修はこちら</p>
              </div>
            </a>
          </div>

          {/* 免責事項 */}
          <div className="rounded-xl bg-yellow-950/30 border border-yellow-800/40 px-4 py-3">
            <p className="text-xs font-bold text-yellow-500 mb-1">【免責事項】</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              本アプリは医療従事者向けの教育・参考目的で作成されています。掲載内容は作成時点の情報に基づいており、最新のガイドラインと異なる場合があります。最終的な判断は担当医の責任のもとで行ってください。
            </p>
          </div>

          <p className="text-center text-xs text-gray-700">Endo Compass · 2026</p>
        </div>
      </div>
    </div>
  );
}
