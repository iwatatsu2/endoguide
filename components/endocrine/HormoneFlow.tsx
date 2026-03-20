"use client";

import { AXES, AxisKey } from "@/data/endocrineTests";

interface HormoneFlowProps {
  axisKey: AxisKey;
  highlightTarget: string;
  mechanismLabel: string;
}

const NODE  = { fill: "#3B82F6", stroke: "#2563EB", text: "#fff" };
const HI    = { fill: "#F59E0B", stroke: "#D97706", text: "#fff" };
const ARROW = "#9CA3AF";
const ARROW_HI = "#F59E0B";
const FB_NORMAL = "#9CA3AF";
const FB_HI     = "#F59E0B";

const VB_W = 320;
const VB_H = 130;
const NODE_W = 82;
const NODE_H = 40;
const NODE_Y = 12;
const NY = NODE_Y + NODE_H / 2; // vertical center of nodes

function nodeX(index: number, total: number): number {
  if (total === 1) return VB_W / 2;
  if (total === 2) return index === 0 ? 76 : 244;
  // 3 nodes
  return [44, 160, 276][index];
}

export default function HormoneFlow({ axisKey, highlightTarget, mechanismLabel }: HormoneFlowProps) {
  const nodes = AXES[axisKey];
  const isFeedback = highlightTarget === "feedback";

  const fbColor    = isFeedback ? FB_HI   : FB_NORMAL;
  const fbDash     = isFeedback ? "none"   : "5,4";
  const fbWidth    = isFeedback ? 2.5      : 1.8;
  const fbMarkerId = isFeedback ? "fb-amber" : "fb-gray";

  return (
    <div className="bg-gray-50 rounded-2xl p-3">
      <p className="text-xs font-semibold text-gray-400 mb-2 text-center tracking-widest uppercase">
        Hormone Axis
      </p>

      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} width="100%" aria-label="ホルモン軸図" className="overflow-visible">
        <defs>
          <marker id="arr-gray"  markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={ARROW} />
          </marker>
          <marker id="arr-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={ARROW_HI} />
          </marker>
          <marker id="fb-gray"  markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
            <path d="M8,0 L8,6 L0,3 z" fill={FB_NORMAL} />
          </marker>
          <marker id="fb-amber" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
            <path d="M8,0 L8,6 L0,3 z" fill={FB_HI} />
          </marker>
        </defs>

        {/* ── ノードボックス ── */}
        {nodes.map((node, i) => {
          const cx = nodeX(i, nodes.length);
          const isHi = !isFeedback && node.id === highlightTarget;
          const col = isHi ? HI : NODE;

          return (
            <g key={node.id}>
              <rect
                x={cx - NODE_W / 2} y={NODE_Y}
                width={NODE_W} height={NODE_H}
                rx={10}
                fill={col.fill} stroke={col.stroke} strokeWidth={2}
              />
              {/* ノード名（2行対応） */}
              {node.label.includes("\n") ? (
                <>
                  <text x={cx} y={NODE_Y + 14} textAnchor="middle" fontSize={10} fontWeight="700" fill={col.text}>
                    {node.label.split("\n")[0]}
                  </text>
                  <text x={cx} y={NODE_Y + 28} textAnchor="middle" fontSize={10} fontWeight="700" fill={col.text}>
                    {node.label.split("\n")[1]}
                  </text>
                </>
              ) : (
                <>
                  <text x={cx} y={NODE_Y + 15} textAnchor="middle" fontSize={12} fontWeight="700" fill={col.text}>
                    {node.label}
                  </text>
                  <text x={cx} y={NODE_Y + 30} textAnchor="middle" fontSize={9} fill={col.text} opacity={0.8}>
                    ↓{node.hormone}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* ── 前向き矢印 ── */}
        {nodes.slice(0, -1).map((_, i) => {
          const x1 = nodeX(i, nodes.length) + NODE_W / 2 + 2;
          const x2 = nodeX(i + 1, nodes.length) - NODE_W / 2 - 2;
          const isHi = !isFeedback && (
            nodes[i + 1].id === highlightTarget ||
            nodes[i].id === highlightTarget
          );
          const markerId = isHi ? "arr-amber" : "arr-gray";
          const stroke = isHi ? ARROW_HI : ARROW;
          return (
            <line key={i} x1={x1} y1={NY} x2={x2} y2={NY}
              stroke={stroke} strokeWidth={2.5}
              markerEnd={`url(#${markerId})`}
            />
          );
        })}

        {/* ── フィードバック弧（3ノード以上のみ）── */}
        {nodes.length >= 3 && (
          <>
            <path
              d={`M ${nodeX(nodes.length - 1, nodes.length) - 4} ${NODE_Y + NODE_H}
                  C ${nodeX(nodes.length - 1, nodes.length)} 120,
                    ${nodeX(0, nodes.length)} 120,
                    ${nodeX(0, nodes.length) + 4} ${NODE_Y + NODE_H}`}
              fill="none"
              stroke={fbColor}
              strokeWidth={fbWidth}
              strokeDasharray={fbDash}
              markerEnd={`url(#${fbMarkerId})`}
            />
            <text x={VB_W / 2} y={128} textAnchor="middle" fontSize={9}
              fill={isFeedback ? FB_HI : "#9CA3AF"}
              fontWeight={isFeedback ? "700" : "400"}
            >
              フィードバック
            </text>
          </>
        )}
      </svg>

      {/* ── 評価ポイント ── */}
      <div className="mt-2 mx-1 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
        <p className="text-xs font-bold text-amber-700 text-center whitespace-pre-line leading-relaxed">
          🎯 {mechanismLabel}
        </p>
      </div>
    </div>
  );
}
