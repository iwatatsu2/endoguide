import { endocrineTests } from "@/data/endocrineTests";
import TestCard from "@/components/endocrine/TestCard";

export const metadata = {
  title: "EndoCompass – Endocrine Stimulation Tests",
  description: "Quick reference for residents. Endocrine loading tests at a glance.",
};

export default function EndocrinePage() {
  return (
    <div className="min-h-screen bg-gray-950">

      {/* ── ヘッダー ── */}
      <div className="sticky top-0 z-10 bg-gray-950 border-b border-gray-800 px-4 pt-10 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-1">
                Endocrine · Loading Tests · v1.0
              </p>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Endo<span className="text-blue-400">Compass</span>
              </h1>
            </div>
            <div className="text-right">
              <span className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                for Residents
              </span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Bedside reference · Tap to review before the test
          </p>
        </div>
      </div>

      {/* ── 検査リスト ── */}
      <div className="px-4 py-5 space-y-3 max-w-lg mx-auto pb-16">

        <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest px-1 mb-4">
          Select a test
        </p>

        {endocrineTests.map((test, i) => (
          <TestCard key={test.id} test={test} index={i} />
        ))}

        <p className="text-xs text-gray-600 text-center pt-6 px-4 leading-relaxed">
          Reference values may vary by institution.<br />
          Always follow your facility's protocol.
        </p>
      </div>
    </div>
  );
}
