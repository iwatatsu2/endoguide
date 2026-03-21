"use client";
import { useState } from "react";

type GuideTab = "ホルモン軸" | "副腎腫瘤" | "クッシング" | "PA";

export default function GuideView() {
  const [tab, setTab] = useState<GuideTab>("ホルモン軸");

  return (
    <div className="space-y-4">
      {/* サブタブ */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["ホルモン軸", "副腎腫瘤", "クッシング", "PA"] as GuideTab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              tab === t
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-700 text-gray-400 hover:border-gray-500"
            }`}
          >
            {t === "PA" ? "原発性アルドステロン症" : t}
          </button>
        ))}
      </div>

      {/* ── ホルモン軸 ── */}
      {tab === "ホルモン軸" && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 px-1">視床下部→下垂体→末梢臓器のフィードバック軸</p>

          {[
            {
              axis: "HPA軸（副腎皮質）",
              color: "border-orange-700 bg-orange-950/20",
              badge: "bg-orange-500/20 text-orange-300",
              items: [
                { label: "視床下部", val: "CRH（副腎皮質刺激ホルモン放出ホルモン）" },
                { label: "下垂体前葉", val: "ACTH（副腎皮質刺激ホルモン）" },
                { label: "副腎皮質", val: "コルチゾール・アルドステロン・DHEA" },
                { label: "日内変動", val: "早朝高値（6〜8時）→ 深夜最低値" },
                { label: "負荷試験", val: "迅速ACTH試験・CRH試験・デキサメタゾン抑制試験" },
              ],
            },
            {
              axis: "HPT軸（甲状腺）",
              color: "border-teal-700 bg-teal-950/20",
              badge: "bg-teal-500/20 text-teal-300",
              items: [
                { label: "視床下部", val: "TRH（甲状腺刺激ホルモン放出ホルモン）" },
                { label: "下垂体前葉", val: "TSH（甲状腺刺激ホルモン）" },
                { label: "甲状腺", val: "T4（サイロキシン）・T3（トリヨードサイロニン）" },
                { label: "フィードバック", val: "T3/T4高値→TSH抑制（negative feedback）" },
                { label: "負荷試験", val: "TRH試験（TRH静注→TSH・PRL反応を見る）" },
              ],
            },
            {
              axis: "GH軸（成長ホルモン）",
              color: "border-blue-700 bg-blue-950/20",
              badge: "bg-blue-500/20 text-blue-300",
              items: [
                { label: "視床下部", val: "GHRH（放出）/ ソマトスタチン（抑制）" },
                { label: "下垂体前葉", val: "GH（成長ホルモン）" },
                { label: "肝臓", val: "IGF-1（ソマトメジンC）を産生→フィードバック" },
                { label: "分泌パターン", val: "睡眠中・空腹・運動で上昇・パルス状分泌" },
                { label: "負荷試験", val: "アルギニン試験・GHRP-2試験（分泌不全）/ ブドウ糖負荷（先端巨大症）" },
              ],
            },
            {
              axis: "HPG軸（性腺）",
              color: "border-pink-700 bg-pink-950/20",
              badge: "bg-pink-500/20 text-pink-300",
              items: [
                { label: "視床下部", val: "GnRH（性腺刺激ホルモン放出ホルモン）" },
                { label: "下垂体前葉", val: "LH・FSH（性腺刺激ホルモン）" },
                { label: "性腺", val: "テストステロン（精巣）／エストロゲン・プロゲステロン（卵巣）" },
                { label: "負荷試験", val: "GnRH試験（LH・FSH反応確認）" },
              ],
            },
            {
              axis: "ADH軸（水代謝）",
              color: "border-cyan-700 bg-cyan-950/20",
              badge: "bg-cyan-500/20 text-cyan-300",
              items: [
                { label: "視床下部産生", val: "ADH（バソプレシン）→下垂体後葉から分泌" },
                { label: "刺激", val: "血漿浸透圧↑・循環血液量↓で分泌促進" },
                { label: "作用", val: "腎集合管での水再吸収促進→尿濃縮" },
                { label: "異常", val: "分泌過剰：SIADH（低Na血症）/ 分泌不足：尿崩症（多尿・低比重尿）" },
                { label: "負荷試験", val: "水制限試験・高張食塩水試験" },
              ],
            },
            {
              axis: "カテコールアミン（副腎髄質）",
              color: "border-red-700 bg-red-950/20",
              badge: "bg-red-500/20 text-red-300",
              items: [
                { label: "産生部位", val: "副腎髄質（交感神経系）" },
                { label: "主なホルモン", val: "アドレナリン・ノルアドレナリン" },
                { label: "測定", val: "血中・尿中カテコールアミン、酸性蓄尿メタネフリン・ノルメタネフリン" },
                { label: "褐色細胞腫", val: "発作性高血圧・頭痛・動悸・発汗の三徴" },
                { label: "診断", val: "随時尿メタネフリン測定→確定にクロニジン試験・MIBG" },
              ],
            },
          ].map(axis => (
            <div key={axis.axis} className={`rounded-xl border ${axis.color} p-4`}>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${axis.badge} mb-3 inline-block`}>
                {axis.axis}
              </span>
              <div className="space-y-1.5">
                {axis.items.map(item => (
                  <div key={item.label} className="flex gap-2 text-xs">
                    <span className="text-gray-500 shrink-0 w-20">{item.label}</span>
                    <span className="text-gray-300">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 副腎腫瘤 鑑別フロー ── */}
      {tab === "副腎腫瘤" && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 px-1">副腎腫瘤・高血圧の鑑別アプローチ</p>

          {/* 起点 */}
          <FlowBox color="gray">副腎腫瘤 / 高血圧</FlowBox>
          <FlowArrow />
          <FlowBox color="gray">各種副腎ホルモン測定 + CT検査</FlowBox>
          <FlowArrow />

          {/* 3分岐 */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <FlowBox color="yellow" small>レニン/アルドステロン比高値</FlowBox>
              <FlowArrow />
              <FlowBox color="yellow" small>原発性アルドステロン症疑い</FlowBox>
              <FlowArrow />
              <FlowBox color="blue" small>カプトプリル試験<br/>生理食塩水負荷試験</FlowBox>
              <FlowArrow />
              <FlowBox color="green" small>PAの診断→副腎静脈サンプリング</FlowBox>
            </div>
            <div className="space-y-2">
              <FlowBox color="orange" small>血中/尿中コルチゾール高値</FlowBox>
              <FlowArrow />
              <FlowBox color="orange" small>クッシング症候群疑い</FlowBox>
              <FlowArrow />
              <FlowBox color="blue" small>デキサメタゾン抑制試験</FlowBox>
              <FlowArrow />
              <FlowBox color="orange" small>ACTH測定→依存性/非依存性鑑別</FlowBox>
            </div>
            <div className="space-y-2">
              <FlowBox color="red" small>随時尿メタネフリン高値<br/>or 発作性高血圧</FlowBox>
              <FlowArrow />
              <FlowBox color="red" small>褐色細胞腫疑い</FlowBox>
              <FlowArrow />
              <FlowBox color="blue" small>クロニジン試験<br/>MIBGシンチ</FlowBox>
              <FlowArrow />
              <FlowBox color="red" small>褐色細胞腫の診断</FlowBox>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-gray-800/50 border border-gray-700 p-3">
            <p className="text-xs font-bold text-gray-300 mb-2">⚠️ 腫瘍が4cm以上の場合</p>
            <p className="text-xs text-gray-400">ホルモン活性の有無に関わらず悪性腫瘍を疑い外科的切除を検討する</p>
          </div>
        </div>
      )}

      {/* ── クッシング症候群 ── */}
      {tab === "クッシング" && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 px-1">クッシング症候群の診断フローチャート</p>

          <div className="rounded-xl bg-gray-800/50 border border-gray-700 p-3 text-xs text-gray-300 space-y-1">
            <p className="font-bold text-white">クッシング徴候</p>
            <p>中心性肥満・満月様顔貌・野牛肩・皮膚線条・筋力低下・骨粗鬆症・高血糖・高血圧</p>
          </div>

          <FlowArrow />
          <FlowBox color="gray">問診：外因性ステロイド使用を除外</FlowBox>
          <FlowArrow />

          <div className="rounded-xl border border-blue-700/50 bg-blue-950/20 p-3 space-y-2">
            <p className="text-xs font-bold text-blue-300">スクリーニング（いずれか陽性）</p>
            <div className="space-y-1 text-xs text-gray-300">
              <p>① 尿中遊離コルチゾール（UFC）高値</p>
              <p>② 1mg DST：翌朝8時コルチゾール &gt;5 μg/dL</p>
              <p>③ 深夜血中コルチゾール &gt;5 μg/dL（23時採血）</p>
            </div>
          </div>

          <FlowArrow label="スクリーニング陽性" />
          <FlowBox color="orange">クッシング症候群の診断確定</FlowBox>
          <FlowArrow />

          <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-3">
            <p className="text-xs font-bold text-white mb-2">血漿ACTH測定</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-gray-900 p-2 text-xs space-y-1">
                <p className="font-bold text-red-300">&lt;5 pg/mL（抑制あり）</p>
                <p className="text-gray-400">ACTH非依存性</p>
                <p className="text-gray-300">→ 副腎CT</p>
                <p className="text-gray-400 text-xs">副腎腺腫 / 副腎癌 / AIMAH・PPNAD</p>
              </div>
              <div className="rounded-lg bg-gray-900 p-2 text-xs space-y-1">
                <p className="font-bold text-orange-300">≥5 pg/mL（抑制なし）</p>
                <p className="text-gray-400">ACTH依存性</p>
                <div className="space-y-0.5 text-gray-300 text-xs">
                  <p>→ 下垂体MRI（≥6mm腫瘍）</p>
                  <p>→ 8mg DST（前値の50%未満に抑制）</p>
                  <p>→ CRH試験（ACTH 1.5倍以上上昇）</p>
                </div>
              </div>
            </div>
          </div>

          <FlowArrow label="ACTH依存性で画像・試験不一致時" />

          <div className="rounded-xl border border-purple-700/50 bg-purple-950/20 p-3 text-xs space-y-1">
            <p className="font-bold text-purple-300">両側下錐体静脈洞サンプリング（IPSS）</p>
            <p className="text-gray-400">中枢/末梢比 ≥2（基礎値）or ≥3（CRH後）→ クッシング病</p>
            <p className="text-gray-400">中枢/末梢比 &lt;2（基礎値）or &lt;3（CRH後）→ 異所性ACTH症候群</p>
          </div>

          <div className="rounded-xl bg-gray-800/50 border border-gray-700 p-3">
            <p className="text-xs font-bold text-yellow-400 mb-1">⚠️ サブクリニカルクッシング</p>
            <p className="text-xs text-gray-400">症状は乏しいが1mg DSTで抑制不良（コルチゾール &gt;1.8 μg/dL）。副腎偶発腫瘍精査時に発見されることが多い。</p>
          </div>
        </div>
      )}

      {/* ── 原発性アルドステロン症 ── */}
      {tab === "PA" && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 px-1">日本内分泌学会ガイドライン 2021（CLEIA法）</p>

          <div className="rounded-xl border border-yellow-700/50 bg-yellow-950/20 p-3 text-xs space-y-1">
            <p className="font-bold text-yellow-300">スクリーニング対象（高血圧患者）</p>
            <p className="text-gray-300">降圧薬使用中でもスクリーニング可（ただしMRA・β遮断薬は偽陽性/陰性に注意）</p>
          </div>

          <FlowArrow />

          <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-3 text-xs space-y-2">
            <p className="font-bold text-white">ARR（アルドステロン/レニン比）スクリーニング</p>
            <p className="text-gray-400 text-xs">※ PAC単位はpg/mL（CLEIA法）、レニン活性（ng/mL/h）</p>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className="rounded-lg bg-green-950/30 border border-green-700/40 p-2 text-center">
                <p className="font-bold text-green-300 text-xs">ARR ≥200<br/>+ PAC ≥60</p>
                <p className="text-gray-400 text-xs mt-1">陽性</p>
                <p className="text-gray-300 text-xs">機能確認検査へ</p>
              </div>
              <div className="rounded-lg bg-yellow-950/30 border border-yellow-700/40 p-2 text-center">
                <p className="font-bold text-yellow-300 text-xs">ARR 100-200<br/>+ PAC ≥60</p>
                <p className="text-gray-400 text-xs mt-1">境界域</p>
                <p className="text-gray-300 text-xs">暫定的に陽性</p>
              </div>
              <div className="rounded-lg bg-gray-900 border border-gray-700 p-2 text-center">
                <p className="font-bold text-gray-400 text-xs">ARR &lt;100<br/>or PAC &lt;60</p>
                <p className="text-gray-400 text-xs mt-1">陰性</p>
              </div>
            </div>
          </div>

          <FlowArrow label="陽性 / 暫定陽性" />

          <div className="rounded-xl border border-blue-700/50 bg-blue-950/20 p-3 text-xs space-y-2">
            <p className="font-bold text-blue-300">機能確認検査（CCT or SIT）</p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <p className="text-gray-400 font-bold mb-1">CCT（カプトプリル試験）</p>
                <div className="space-y-0.5 text-gray-300">
                  <p>ARR ≥200 → 陽性</p>
                  <p>ARR 100-200 → 境界域</p>
                  <p>ARR &lt;100 → 陰性</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 font-bold mb-1">SIT（生理食塩水負荷）</p>
                <div className="space-y-0.5 text-gray-300">
                  <p>PAC ≥60 pg/mL → 陽性</p>
                  <p>PAC 12-60 → 境界域</p>
                  <p>PAC &lt;12 → 陰性</p>
                </div>
              </div>
            </div>
          </div>

          <FlowArrow label="機能確認検査 陽性" />
          <FlowBox color="green">PA確定診断</FlowBox>
          <FlowArrow />

          <div className="rounded-xl border border-purple-700/50 bg-purple-950/20 p-3 text-xs space-y-1">
            <p className="font-bold text-purple-300">局在・病型診断</p>
            <p className="text-gray-300">副腎CT → 腺腫の有無確認</p>
            <p className="text-gray-300">副腎静脈サンプリング（AVS）→ 一側性 or 両側性の鑑別</p>
            <p className="text-gray-400 text-xs mt-1">※ 低K血症や副腎腫瘤があればAVSを考慮</p>
          </div>

          <div className="rounded-xl bg-gray-800/50 border border-gray-700 p-3 text-xs space-y-1">
            <p className="font-bold text-white mb-1">治療方針</p>
            <p className="text-gray-300">一側性（腺腫）→ 腹腔鏡下副腎摘除術</p>
            <p className="text-gray-300">両側性 → ミネラルコルチコイド受容体拮抗薬（MRA：スピロノラクトン等）</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FlowBox({ children, color, small }: { children: React.ReactNode; color: string; small?: boolean }) {
  const colors: Record<string, string> = {
    gray: "border-gray-600 bg-gray-800/60 text-gray-200",
    blue: "border-blue-700/60 bg-blue-950/30 text-blue-200",
    orange: "border-orange-700/60 bg-orange-950/30 text-orange-200",
    yellow: "border-yellow-700/60 bg-yellow-950/30 text-yellow-200",
    green: "border-green-700/60 bg-green-950/30 text-green-200",
    red: "border-red-700/60 bg-red-950/30 text-red-200",
  };
  return (
    <div className={`rounded-xl border px-3 py-2 text-center font-medium ${small ? "text-xs" : "text-sm"} ${colors[color]}`}>
      {children}
    </div>
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {label && <p className="text-xs text-gray-500">{label}</p>}
      <span className="text-gray-600 text-lg leading-none">↓</span>
    </div>
  );
}
