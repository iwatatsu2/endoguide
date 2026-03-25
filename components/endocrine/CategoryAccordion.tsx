"use client";
import { useState } from "react";
import { EndocrineTest } from "@/data/endocrineTests";
import TestCard from "./TestCard";

interface Props {
  category: string;
  icon: string;
  axis: string;
  tests: EndocrineTest[];
  startIndex: number;
}

export default function CategoryAccordion({ category, icon, axis, tests, startIndex }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 mb-2 px-1 py-2 rounded-xl hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <div className="text-left">
            <p className="text-xs font-black text-white tracking-wide">{category}</p>
            <p className="text-xs font-bold text-gray-500">{axis}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-gray-500">{tests.length}件</span>
          <span className={`text-gray-400 text-sm transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>›</span>
        </div>
      </button>

      {open && (
        <div className="space-y-2.5 mb-2">
          {tests.map((test, i) => (
            <TestCard key={test.id} test={test} index={startIndex + i} />
          ))}
        </div>
      )}
    </div>
  );
}
