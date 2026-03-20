"use client";

import Link from "next/link";
import { useRef } from "react";
import { EndocrineTest } from "@/data/endocrineTests";
import HormoneFlow from "./HormoneFlow";

// ─── カラーマップ ─────────────────────────────────────
const C: Record<string, { header: string; tag: string; tagText: string }> = {
  blue:    { header: "bg-blue-600",    tag: "bg-blue-100",    tagText: "text-blue-800" },
  violet:  { header: "bg-violet-600",  tag: "bg-violet-100",  tagText: "text-violet-800" },
  teal:    { header: "bg-teal-600",    tag: "bg-teal-100",    tagText: "text-teal-800" },
  red:     { header: "bg-red-600",     tag: "bg-red-100",     tagText: "text-red-800" },
  emerald: { header: "bg-emerald-600", tag: "bg-emerald-100", tagText: "text-emerald-800" },
  indigo:  { header: "bg-indigo-600",  tag: "bg-indigo-100",  tagText: "text-indigo-800" },
};

// ─── セクション定義 ───────────────────────────────────
const SECTIONS = [
  { id: "sec-what",      label: "概要" },
  { id: "sec-timeline",  label: "手順" },
  { id: "sec-judgment",  label: "判定" },
  { id: "sec-interpret", label: "解釈" },
  { id: "sec-caution",   label: "注意" },
  { id: "sec-report",    label: "報告" },
];

function SectionTitle({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-lg">{emoji}</span>
      <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">{title}</h2>
    </div>
  );
}

function Card({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <div id={id} className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 scroll-mt-24 ${className}`}>
      {children}
    </div>
  );
}

export default function TestDetail({ test }: { test: EndocrineTest }) {
  const c = C[test.color] ?? C.blue;
  const navRef = useRef<HTMLDivElement>(null);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── ヘッダー ── */}
      <div className={`${c.header} px-4 pt-12 pb-5`}>
        <Link href="/endocrine" className="flex items-center gap-1 text-white/70 text-sm mb-3">
          ‹ 一覧
        </Link>
        <h1 className="text-xl font-bold text-white leading-tight">{test.name}</h1>
        <p className="text-white/75 text-sm mt-0.5">{test.tagline}</p>
        {/* essence バッジ */}
        <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-lg px-2.5 py-1 mt-2">
          <span className="text-white/70 text-xs">みているもの:</span>
          <span className="text-white text-xs font-bold">{test.essence}</span>
        </div>
      </div>

      {/* ── セクションジャンプナビ（sticky）── */}
      <div
        ref={navRef}
        className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm"
      >
        <div className="flex overflow-x-auto gap-1 px-3 py-2 no-scrollbar">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border
                ${c.tag} ${c.tagText} border-transparent active:opacity-70 transition-opacity`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── コンテンツ ── */}
      <div className="px-4 py-4 space-y-3 max-w-lg mx-auto pb-16">

        {/* ① 概要 + ホルモン流れ図 */}
        <Card id="sec-what">
          <SectionTitle emoji="🧬" title="この検査は何を見ている？" />
          <HormoneFlow
            axisKey={test.hormoneFlow.axisKey}
            highlightTarget={test.hormoneFlow.highlightTarget}
            mechanismLabel={test.hormoneFlow.mechanismLabel}
          />
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">{test.what}</p>

          {/* 適応（概要カード内に収める） */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-500 mb-2">どんなときにやる？</p>
            <ul className="space-y-1.5">
              {test.indications.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">●</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* ② 手順 */}
        <Card id="sec-timeline">
          <SectionTitle emoji="⏱️" title="手順" />

          {test.preparations.length > 0 && (
            <div className="bg-gray-50 rounded-xl px-3 py-2.5 mb-3">
              <p className="text-xs font-bold text-gray-500 mb-1.5">準備</p>
              <ul className="space-y-1">
                {test.preparations.map((p, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <span className="text-gray-400 flex-shrink-0 mt-0.5">›</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-0">
            {test.timeline.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 ${step.isKey ? "bg-blue-500" : "bg-gray-300"}`} />
                  {i < test.timeline.length - 1 && (
                    <div className="w-0.5 bg-gray-200 flex-1 my-1 min-h-3" />
                  )}
                </div>
                <div className="pb-3 flex-1">
                  <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-0.5
                    ${step.isKey ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                    {step.time}
                  </span>
                  <p className={`text-sm ${step.isKey ? "font-semibold text-gray-800" : "text-gray-600"}`}>
                    {step.action}
                  </p>
                  {step.note && <p className="text-xs text-gray-400 mt-0.5">{step.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ③ 判定 */}
        <Card id="sec-judgment">
          <SectionTitle emoji="⚖️" title="判定" />
          {test.judgments.map((j, i) => (
            <div key={i}>
              <p className="text-xs font-bold text-gray-500 mb-2">{j.parameter}</p>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 text-center">
                  <p className="text-xs text-emerald-600 font-bold mb-1">
                    {j.isNormalAbove ? `≥ ${j.threshold}` : `< ${j.threshold}`}
                    <span className="font-normal ml-0.5">{j.unit}</span>
                  </p>
                  <p className="text-2xl mb-1">✅</p>
                  <p className="text-xs font-bold text-emerald-700 leading-tight">{j.normalLabel}</p>
                </div>
                <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-3 text-center">
                  <p className="text-xs text-red-600 font-bold mb-1">
                    {j.isNormalAbove ? `< ${j.threshold}` : `≥ ${j.threshold}`}
                    <span className="font-normal ml-0.5">{j.unit}</span>
                  </p>
                  <p className="text-2xl mb-1">⚠️</p>
                  <p className="text-xs font-bold text-red-700 leading-tight">{j.abnormalLabel}</p>
                </div>
              </div>
              {j.note && (
                <p className="mt-2 text-xs text-gray-500 bg-gray-50 rounded-xl px-3 py-2">
                  ※ {j.note}
                </p>
              )}
            </div>
          ))}
        </Card>

        {/* ④ 解釈 */}
        <Card id="sec-interpret">
          <SectionTitle emoji="💡" title="この結果は何を意味する？" />
          <div className="space-y-2.5">
            <div className="bg-emerald-50 rounded-xl p-3">
              <p className="text-xs font-bold text-emerald-600 mb-1">正常のとき</p>
              <p className="text-sm text-gray-700 leading-relaxed">{test.normalInterpretation}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3">
              <p className="text-xs font-bold text-red-600 mb-1">異常のとき</p>
              <p className="text-sm text-gray-700 leading-relaxed">{test.abnormalInterpretation}</p>
            </div>
          </div>
        </Card>

        {/* ⑤ 注意・禁忌・pitfalls */}
        <Card id="sec-caution" className="border-amber-100">
          <SectionTitle emoji="⚠️" title="注意点・禁忌" />

          {test.contraindications.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
              <p className="text-xs font-bold text-red-700 mb-1.5">🚫 禁忌</p>
              {test.contraindications.map((item, i) => (
                <p key={i} className="text-sm text-red-700">{item}</p>
              ))}
            </div>
          )}

          {test.stopCriteria && test.stopCriteria.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-3">
              <p className="text-xs font-bold text-orange-700 mb-1.5">🛑 中止基準</p>
              {test.stopCriteria.map((item, i) => (
                <p key={i} className="text-sm text-orange-700 mt-0.5">{item}</p>
              ))}
            </div>
          )}

          <ul className="space-y-1.5 mb-3">
            {test.cautions.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-amber-500 font-bold flex-shrink-0">!</span>
                {item}
              </li>
            ))}
          </ul>

          {/* 誤りやすいポイント */}
          {test.pitfalls.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-1">
              <p className="text-xs font-bold text-amber-700 mb-1.5">🎯 誤りやすいポイント</p>
              <ul className="space-y-1.5">
                {test.pitfalls.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-amber-800">
                    <span className="flex-shrink-0 mt-0.5">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>

        {/* ⑥ 上級医報告 */}
        <Card id="sec-report" className="bg-blue-50 border-blue-100">
          <SectionTitle emoji="📞" title="上級医への報告テンプレ" />
          <div className="bg-white rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              &ldquo;{test.reportPhrase}&rdquo;
            </p>
          </div>
        </Card>

        <p className="text-xs text-gray-400 text-center px-4">
          判定基準は施設により異なります。必ず自施設のプロトコルに従ってください。
        </p>
      </div>
    </div>
  );
}
