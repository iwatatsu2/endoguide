"use client";

import { AxisType, HighlightTarget } from "@/data/endocrineTests";

interface HormoneFlowProps {
  axis: AxisType;
  highlightTarget: HighlightTarget;
  mechanismLabel: string;
}

// ─── カラー定義 ───────────────────────────────────────
const C = {
  node: { fill: "#3B82F6", text: "#fff", stroke: "#2563EB" },       // blue
  highlight: { fill: "#F59E0B", text: "#fff", stroke: "#D97706" },  // amber
  dim: { fill: "#E5E7EB", text: "#6B7280", stroke: "#D1D5DB" },     // gray
  arrow: "#9CA3AF",
  arrowHighlight: "#F59E0B",
  feedbackDash: "#9CA3AF",
  feedbackHighlight: "#F59E0B",
  labelBg: "#FEF3C7",
};

// ─── HPA軸ノード定義 ───────────────────────────────────
const HPA_NODES = [
  { id: "hypothalamus", label: "視床下部", sublabel: "CRH" },
  { id: "pituitary",   label: "下垂体",   sublabel: "ACTH" },
  { id: "adrenal",     label: "副　腎",   sublabel: "コルチゾール" },
];

// ─── HPT軸ノード定義 ───────────────────────────────────
const HPT_NODES = [
  { id: "hypothalamus", label: "視床下部", sublabel: "TRH" },
  { id: "pituitary",   label: "下垂体",   sublabel: "TSH" },
  { id: "thyroid",     label: "甲状腺",   sublabel: "T3/T4" },
];

const FORWARD_ARROWS = [
  { from: 0, to: 1, label: "" },
  { from: 1, to: 2, label: "" },
];

// ─── SVG寸法 ───────────────────────────────────────────
const VB_W = 320;
const VB_H = 140;
const NODE_W = 82;
const NODE_H = 44;
const NODE_Y = 18;
// Node centers X
const NX = [44, 160, 276];
const NY = NODE_Y + NODE_H / 2; // 40

export default function HormoneFlow({ axis, highlightTarget, mechanismLabel }: HormoneFlowProps) {
  const nodes = axis === "HPA" ? HPA_NODES : HPT_NODES;
  const isFeedbackHighlight = highlightTarget === "feedback";

  function nodeColor(nodeId: string) {
    if (isFeedbackHighlight) return C.node;
    return nodeId === highlightTarget ? C.highlight : C.node;
  }

  function arrowColor(idx: number) {
    if (idx === 0 && highlightTarget === "hypothalamus") return C.arrowHighlight;
    if (idx === 1 && (highlightTarget === "pituitary" || highlightTarget === "adrenal" || highlightTarget === "thyroid")) return C.arrowHighlight;
    return C.arrow;
  }

  const feedbackColor = isFeedbackHighlight ? C.feedbackHighlight : C.feedbackDash;
  const feedbackStrokeDash = isFeedbackHighlight ? "none" : "5,4";

  return (
    <div className="bg-gray-50 rounded-2xl p-3">
      <p className="text-xs font-semibold text-gray-500 mb-2 text-center tracking-wide uppercase">
        ホルモン軸
      </p>

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        width="100%"
        aria-label="ホルモン流れ図"
        className="overflow-visible"
      >
        <defs>
          {/* ノーマル矢印 */}
          <marker id="arrow-gray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={C.arrow} />
          </marker>
          {/* ハイライト矢印 */}
          <marker id="arrow-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={C.arrowHighlight} />
          </marker>
          {/* フィードバック矢印（上向き） */}
          <marker id="arrow-fb-gray" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
            <path d="M8,0 L8,6 L0,3 z" fill={C.feedbackDash} />
          </marker>
          <marker id="arrow-fb-amber" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
            <path d="M8,0 L8,6 L0,3 z" fill={C.feedbackHighlight} />
          </marker>
        </defs>

        {/* ── ノードボックス ── */}
        {nodes.map((node, i) => {
          const col = nodeColor(node.id);
          const cx = NX[i];
          return (
            <g key={node.id}>
              <rect
                x={cx - NODE_W / 2}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx={10}
                fill={col.fill}
                stroke={col.stroke}
                strokeWidth={2}
              />
              <text x={cx} y={NODE_Y + 17} textAnchor="middle" fontSize={12} fontWeight="700" fill={col.text}>
                {node.label}
              </text>
              <text x={cx} y={NODE_Y + 32} textAnchor="middle" fontSize={10} fill={col.text} opacity={0.85}>
                ↓{node.sublabel}
              </text>
            </g>
          );
        })}

        {/* ── 前向き矢印 ── */}
        {FORWARD_ARROWS.map((arr, i) => {
          const x1 = NX[arr.from] + NODE_W / 2 + 2;
          const x2 = NX[arr.to] - NODE_W / 2 - 2;
          const col = arrowColor(i);
          const markerId = col === C.arrowHighlight ? "arrow-amber" : "arrow-gray";
          return (
            <line
              key={i}
              x1={x1} y1={NY}
              x2={x2} y2={NY}
              stroke={col}
              strokeWidth={2.5}
              markerEnd={`url(#${markerId})`}
            />
          );
        })}

        {/* ── フィードバック弧 ── */}
        <path
          d={`M ${NX[2] - 4} ${NODE_Y + NODE_H} C ${NX[2]} 130, ${NX[0]} 130, ${NX[0] + 4} ${NODE_Y + NODE_H}`}
          fill="none"
          stroke={feedbackColor}
          strokeWidth={isFeedbackHighlight ? 2.5 : 1.8}
          strokeDasharray={feedbackStrokeDash}
          markerEnd={isFeedbackHighlight ? "url(#arrow-fb-amber)" : "url(#arrow-fb-gray)"}
        />

        {/* フィードバックラベル */}
        <text
          x={VB_W / 2} y={132}
          textAnchor="middle"
          fontSize={9}
          fill={isFeedbackHighlight ? C.feedbackHighlight : "#9CA3AF"}
          fontWeight={isFeedbackHighlight ? "700" : "400"}
        >
          フィードバック
        </text>
      </svg>

      {/* ── 「ここを評価」ラベル ── */}
      <div className="mt-2 mx-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
        <p className="text-xs font-bold text-amber-700 text-center whitespace-pre-line leading-relaxed">
          🎯 {mechanismLabel}
        </p>
      </div>
    </div>
  );
}
