"use client";
import { useState } from "react";
import GuideView from "./GuideView";

type Tab = "負荷試験" | "基礎知識・鑑別";

export default function PageTabs({ testList }: { testList: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>("負荷試験");

  return (
    <>
      {/* タブ */}
      <div className="flex gap-2 px-4 pb-3">
        {(["負荷試験", "基礎知識・鑑別"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
              tab === t
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-700 text-gray-400 hover:border-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* コンテンツ */}
      <div className="px-4 pb-16">
        {tab === "負荷試験" ? testList : <GuideView />}
      </div>
    </>
  );
}
