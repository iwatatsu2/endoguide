"use client";
import { useState } from "react";

type Disease = "先端巨大症" | "プロラクチノーマ" | "クッシング病" | "前葉機能低下症" | "AVP欠乏症" | "TSH産生腫瘍" | "偶発腫・卒中";

const DISEASES: Disease[] = ["先端巨大症", "プロラクチノーマ", "クッシング病", "前葉機能低下症", "AVP欠乏症", "TSH産生腫瘍", "偶発腫・卒中"];

export default function PituitaryGuide() {
  const [d, setD] = useState<Disease>("先端巨大症");

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 px-1">下垂体疾患の診断基準（厚労省 間脳下垂体機能障害調査研究班 診療ガイドライン2023年版 準拠・要点）</p>

      <div className="flex flex-wrap gap-1.5">
        {DISEASES.map(x => (
          <button
            key={x}
            onClick={() => setD(x)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
              d === x ? "bg-gray-100 border-gray-100 text-gray-900" : "border-gray-700 text-gray-400 hover:border-gray-500"
            }`}
          >
            {x}
          </button>
        ))}
      </div>

      {/* ── 先端巨大症 ── */}
      {d === "先端巨大症" && (
        <div className="space-y-3">
          <Block tone="sky" title="Ⅰ 主症候">
            <p>① 手足の容積の増大（指輪・靴のサイズが変わる）</p>
            <p>② 先端巨大症様顔貌（眉弓部の膨隆・鼻や口唇の肥大・下顎の突出）</p>
            <p>③ 巨大舌</p>
          </Block>
          <Block tone="blue" title="Ⅱ 検査所見">
            <p>① GH分泌の過剰：<Em>75gOGTTでGH底値が0.4 ng/mL未満に抑制されない</Em></p>
            <p>② 血中IGF-1高値（年齢・性別基準値で判定／SDスコア &gt;+2.0）</p>
            <p>③ MRI（またはCT）で下垂体腺腫を認める</p>
          </Block>
          <Block tone="gray" title="Ⅲ 副症候・参考所見">
            <p>発汗過多・頭痛・視野障害・月経異常・睡眠時無呼吸・耐糖能異常・高血圧・咬合不全・頭蓋骨/手足X線の異常</p>
          </Block>
          <Verdict>
            <p><Em>確実例</Em>：Ⅰのいずれか ＋ Ⅱの①〜③をすべて満たす</p>
          </Verdict>
          <Point title="実臨床のポイント">
            <p>一次検査はIGF-1（GHは拍動性分泌で単回測定は当てにならない）</p>
            <p>2024年国際コンセンサス：典型徴候＋IGF-1が基準上限の約1.3倍超ならOGTTは必須でない。境界域で確認に使う</p>
            <p>IGF-1が動く状況：コントロール不良の糖尿病・肝/腎不全・低栄養・甲状腺機能低下・経口エストロゲン・妊娠・思春期</p>
            <p>OGTTでGHが奇異性に上昇する例あり</p>
          </Point>
          <Block tone="green" title="治療と寛解の目安">
            <p>第一選択：経蝶形骨洞手術 → 残存時はソマトスタチンアナログ・ペグビソマント等</p>
            <p>術後の寛解：OGTTでGH底値 &lt;0.4 ng/mL ＋ IGF-1が年齢・性別基準内 ＋ 臨床的活動性なし</p>
            <p>薬物治療中は治療法ごとに判定：ソマトスタチンアナログ中はOGTTを使わない／<Em>ペグビソマント中はGHで効果判定しない</Em>（IGF-1で判定）</p>
          </Block>
        </div>
      )}

      {/* ── プロラクチノーマ ── */}
      {d === "プロラクチノーマ" && (
        <div className="space-y-3">
          <Block tone="pink" title="Ⅰ 主症候">
            <p><span className="text-pink-300 font-semibold">女性</span>：月経異常（無月経・希発月経）・乳汁漏出・不妊</p>
            <p><span className="text-pink-300 font-semibold">男性</span>：性欲低下・勃起障害・女性化乳房・乳汁漏出</p>
            <p><span className="text-pink-300 font-semibold">共通</span>：頭痛・視野障害（マクロ腺腫）</p>
          </Block>
          <Block tone="blue" title="Ⅱ 検査所見">
            <p>① 血中PRLの高値（安静時・複数回で確認）</p>
            <p>② MRIで下垂体腺腫を認める</p>
          </Block>
          <Block tone="yellow" title="Ⅲ 必ず除外する高PRL血症の原因">
            <p><Em>薬剤性</Em>：スルピリド・メトクロプラミド・ドンペリドン・抗精神病薬・三環系抗うつ薬・H2遮断薬など</p>
            <p>原発性甲状腺機能低下症（TRH↑）／妊娠・授乳／腎不全／胸壁刺激（帯状疱疹・手術）</p>
            <p>マクロプロラクチン血症（症状が合わない時はPEG処理で確認）</p>
            <p>視床下部・下垂体茎病変（stalk effect：非機能性腺腫でも上がる）</p>
          </Block>
          <Verdict>
            <p><Em>確実例</Em>：Ⅰのいずれか ＋ Ⅱの①② ＋ Ⅲの除外</p>
          </Verdict>
          <Point title="数字の目安">
            <p>PRL &gt;200 ng/mL → プロラクチノーマの可能性が高い</p>
            <p>マクロ腺腫なのにPRLが軽度高値 → stalk effect か <Em>フック効果</Em>（希釈して再測定）</p>
            <p>治療：カベルゴリン第一選択（腫瘍縮小・視野改善も期待）</p>
          </Point>
        </div>
      )}

      {/* ── クッシング病 ── */}
      {d === "クッシング病" && (
        <div className="space-y-3">
          <Block tone="orange" title="Ⅰ 主症候">
            <p><span className="text-orange-300 font-semibold">特異的</span>：満月様顔貌・中心性肥満/水牛様脂肪沈着・赤紫色皮膚線条（幅1cm以上）・皮膚の菲薄化と皮下溢血・近位筋の筋力低下・小児の肥満を伴う成長遅延</p>
            <p><span className="text-orange-300 font-semibold">非特異的</span>：高血圧・月経異常・ざ瘡・多毛・浮腫・耐糖能異常・骨粗鬆症・色素沈着・精神症状</p>
          </Block>
          <Block tone="blue" title="Ⅱ 検査所見（コルチゾール過剰＋ACTH非抑制）">
            <p>① 血中ACTHとコルチゾールを同時測定し、ともに正常〜高値（ACTHが抑制されない）</p>
            <p>② 尿中遊離コルチゾール（UFC）が正常上限以上</p>
          </Block>
          <Block tone="gray" title="Ⅲ スクリーニング（コルチゾール自律分泌）">
            <p>一晩少量デキサメタゾン抑制試験で翌朝コルチゾールが抑制されない</p>
            <p>深夜睡眠時の血中コルチゾール ≥5 μg/dL（日内変動の消失）</p>
            <p className="text-gray-400">（補助）DDAVP試験でACTHが前値の1.5倍以上に上昇 ※必須ではない・検査目的は保険適用外</p>
            <p className="text-gray-500">※ 各カットオフの詳細は「クッシング」タブ・検査一覧を参照</p>
          </Block>
          <Block tone="purple" title="Ⅳ 下垂体性（ACTH産生腺腫）の確定">
            <p>① CRH試験：ACTHが前値の1.5倍以上に上昇</p>
            <p>② 8mg デキサメタゾン抑制試験：コルチゾールが前値の半分以下に抑制</p>
            <p>③ MRIで下垂体腺腫（微小腺腫が多く写らないことも多い）</p>
            <p>④ 選択的静脈洞サンプリング（IPSS/CSS）：中枢/末梢ACTH比 ≥2（CRH後 ≥3）</p>
          </Block>
          <Verdict>
            <p><Em>確実例</Em>：Ⅰのいずれか ＋ Ⅱ・Ⅲ（DST・深夜コルチゾール）を満たし、さらに〔Ⅳ①または②〕かつ〔Ⅳ③または④〕</p>
            <p className="mt-1">または Ⅰのいずれか ＋ Ⅱ・Ⅲを満たし、さらに摘出腫瘍の病理でACTH陽性／TPIT陽性腺腫を確認</p>
            <p className="text-gray-400 mt-1">MRIで腺腫がはっきりしない時はIPSSで異所性ACTH症候群を除外</p>
          </Verdict>
          <Point title="見逃し・誤診の注意">
            <p>偽性クッシング（うつ病・アルコール多飲・重度肥満・コントロール不良糖尿病）は確定前に除外</p>
            <p>周期性クッシングでは検査を繰り返す</p>
          </Point>
        </div>
      )}

      {/* ── 前葉機能低下症 ── */}
      {d === "前葉機能低下症" && (
        <div className="space-y-3">
          <Block tone="red" title="ACTH分泌低下症（続発性副腎不全）">
            <p><span className="text-red-300 font-semibold">症候</span>：易疲労感・脱力・食欲不振・体重減少・低血圧・低血糖・低Na血症</p>
            <p><span className="text-red-300 font-semibold">検査</span>：早朝コルチゾール低値（&lt;4 μg/dL で強く疑う）＋ ACTHは低値〜基準内</p>
            <p>CRH試験でACTHが低反応／ITT・CRH試験でコルチゾール頂値 &lt;18 μg/dL</p>
            <p className="text-gray-500">迅速ACTH試験は発症早期だと正常反応しうる（偽陰性）</p>
          </Block>
          <Block tone="teal" title="TSH分泌低下症（中枢性甲状腺機能低下症）">
            <p><Em>FT4低値なのにTSHが低値〜基準内（軽度高値もありうる）</Em>（TSHだけ見ると見逃す）</p>
            <p className="text-gray-500">生物活性の低いTSHが測定されて軽度高値になることがある</p>
            <p>TRH試験でTSHが低反応（視床下部性では遅延反応）</p>
          </Block>
          <Block tone="indigo" title="ゴナドトロピン分泌低下症">
            <p>性ホルモン（テストステロン/エストラジオール）低値 ＋ LH・FSHが低値〜基準内</p>
            <p>症候：無月経・性欲低下・ED・二次性徴の遅れ・恥毛/腋毛の脱落</p>
            <p>GnRH試験で低反応</p>
          </Block>
          <Block tone="sky" title="成人GH分泌不全症">
            <p>症候：疲れやすさ・意欲低下・内臓脂肪増加・脂質異常・骨密度低下</p>
            <p>負荷試験のGH頂値：<Em>ITT・アルギニン・グルカゴン ≤3 ng/mL</Em>（重症 ≤1.8）／<Em>GHRP-2 ≤9 ng/mL</Em>（重症）</p>
            <p>原則2種類の負荷試験で確認（器質的疾患があり、GHを含めて複数の下垂体ホルモン分泌低下がある場合は1種類で可）</p>
          </Block>
          <Block tone="pink" title="PRL分泌低下症">
            <p>産褥期の乳汁分泌低下（Sheehan症候群を疑う）・PRL低値</p>
          </Block>
          <Point title="補充の順番（最重要）">
            <p><Em>ACTH欠損があれば、甲状腺ホルモンより先にヒドロコルチゾンを開始</Em>（逆だと副腎クリーゼを誘発）</p>
            <p>原因検索：腫瘍・術後/放射線後・下垂体卒中・リンパ球性下垂体炎・<Em>免疫チェックポイント阻害薬</Em>・IgG4関連・頭部外傷</p>
          </Point>
        </div>
      )}

      {/* ── AVP欠乏症（中枢性尿崩症） ── */}
      {d === "AVP欠乏症" && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 px-1">2023年に「中枢性尿崩症」から「AVP欠乏症」へ名称変更</p>
          <Block tone="cyan" title="Ⅰ 主症候">
            <p>① 口渇 ② 多飲 ③ 多尿（成人で尿量 ≥3,000 mL/日）</p>
          </Block>
          <Block tone="blue" title="Ⅱ 検査所見">
            <p>① 尿浸透圧 &lt;300 mOsm/kg（低張尿）</p>
            <p>② 高張食塩水負荷で血漿浸透圧上昇に対するAVP分泌が低下</p>
            <p>③ 水制限試験でも尿浸透圧が300 mOsm/kgを超えない</p>
            <p>④ バソプレシン投与で尿浸透圧が上昇（300 mOsm/kg以上）<span className="text-gray-500">※診断目的にデスモプレシンで代用しない（水中毒の危険）</span></p>
          </Block>
          <Block tone="gray" title="Ⅲ 参考所見">
            <p>MRI T1強調で下垂体後葉の高信号消失</p>
            <p>血漿浸透圧は正常上限〜高値（心因性多飲では低め・低Na傾向）</p>
          </Block>
          <Verdict>
            <p><Em>確実例</Em>：Ⅰ ＋ 次のどちらかの経路</p>
            <p>〔Ⅱ① 低張尿 ＋ Ⅱ② 高張食塩水負荷でAVP低反応〕</p>
            <p>〔Ⅱ① 低張尿 ＋ Ⅱ③ 水制限 ＋ Ⅱ④ AVP負荷で尿濃縮〕</p>
            <p className="text-yellow-300 mt-1">⚠️ 著明な脱水（Na ≥150 mEq/Lなど）では高張食塩水負荷・水制限を行わない</p>
          </Verdict>
          <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-3 text-xs">
            <p className="font-bold text-white mb-2">多尿の鑑別</p>
            <div className="grid grid-cols-3 gap-2">
              <Mini title="AVP欠乏症" tone="text-cyan-300" lines={["AVP分泌↓", "AVP投与で尿濃縮↑"]} />
              <Mini title="AVP抵抗症（腎性）" tone="text-yellow-300" lines={["AVP分泌↑", "AVP投与に無反応", "リチウム・高Ca・低K"]} />
              <Mini title="心因性多飲" tone="text-gray-300" lines={["AVP反応は正常", "血漿浸透圧↓"]} />
            </div>
            <p className="text-gray-500 mt-2">先に浸透圧利尿（高血糖など）を除外</p>
          </div>
          <Point title="治療の注意">
            <p>デスモプレシン開始後は<Em>水中毒・低Na血症</Em>に注意（飲水指導と血清Naフォロー）</p>
            <p>口渇感のない例（渇中枢障害）は特に高Na/低Naが起きやすい</p>
          </Point>
        </div>
      )}

      {/* ── TSH産生腫瘍 ── */}
      {d === "TSH産生腫瘍" && (
        <div className="space-y-3">
          <Block tone="teal" title="Ⅰ 主症候">
            <p>甲状腺中毒症状（動悸・体重減少・発汗）・びまん性甲状腺腫・頭痛/視野障害（マクロ腺腫）</p>
          </Block>
          <Block tone="blue" title="Ⅱ 検査所見">
            <p>① <Em>FT4（FT3）高値なのにTSHが抑制されない</Em>（基準内〜高値＝SITSH）</p>
            <p>② MRIで下垂体腺腫を認める</p>
            <p>③ TRH試験でTSHが無〜低反応（参考）／αサブユニット高値</p>
          </Block>
          <Verdict>
            <p><Em>ほぼ確実例</Em>：Ⅰ ＋ Ⅱの①② ＋ 甲状腺ホルモン不応症の除外</p>
            <p className="mt-1"><Em>確実例</Em>：上記 ＋ 摘出腫瘍でTSHβ（TSH）免疫染色陽性</p>
          </Verdict>
          <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-3 text-xs">
            <p className="font-bold text-white mb-2">SITSHの鑑別</p>
            <div className="grid grid-cols-2 gap-2">
              <Mini title="TSH産生腫瘍" tone="text-teal-300" lines={["MRIで腺腫", "TRHに無〜低反応", "αサブユニット↑", "家族歴なし"]} />
              <Mini title="甲状腺ホルモン不応症" tone="text-gray-300" lines={["TRHに正常〜過剰反応", "αサブユニット正常", "家族歴が多い", "THRB変異が多い"]} />
            </div>
            <p className="text-yellow-300 mt-2">家族歴・THRB変異がない不応症や、非機能性腺腫を偶然合併する不応症もある（決め手にしない）</p>
            <p className="text-gray-500 mt-2">まず測定系の干渉（抗T4抗体・異好性抗体・ビオチン）を除外</p>
          </div>
        </div>
      )}

      {/* ── 偶発腫・下垂体卒中 ── */}
      {d === "偶発腫・卒中" && (
        <div className="space-y-3">
          <Block tone="gray" title="下垂体偶発腫を見つけたら">
            <p>全例：PRL・IGF-1・早朝ACTH/コルチゾール・TSH/FT4・LH/FSH/性ホルモン・Na</p>
            <p>マクロ腺腫（≥10mm）・視交叉に接する：視野検査</p>
            <p>非機能性・無症候なら画像と機能のフォロー（増大・視野障害・機能低下で手術検討）</p>
          </Block>
          <Block tone="red" title="下垂体卒中（救急）">
            <p><span className="text-red-300 font-semibold">症候</span>：突然の激しい頭痛・視力/視野障害・眼球運動障害（複視・眼瞼下垂）・嘔吐・意識障害</p>
            <p><span className="text-red-300 font-semibold">画像</span>：MRI（腺腫内の出血・梗塞）</p>
            <p><Em>急性副腎不全を想定し、採血後すぐにヒドロコルチゾンを投与（結果を待たない）</Em></p>
            <p>視力低下・意識障害が進む例は脳神経外科と緊急減圧を検討</p>
          </Block>
        </div>
      )}

      <div className="rounded-xl bg-gray-900/60 border border-gray-800 p-3 text-xs text-gray-500 space-y-1">
        <p>出典：厚生労働科学研究費補助金 間脳下垂体機能障害に関する調査研究班『間脳下垂体機能障害と先天性腎性尿崩症および関連疾患の診療ガイドライン2023年版』（診断と治療の手引き 令和4年度改訂を収載）、Acromegaly国際コンセンサス2024ほか。</p>
        <p>要点を抜き出したもので、細目・注釈は原典をご確認ください。基準値・カットオフは測定系や施設により異なります。</p>
      </div>
    </div>
  );
}

const TONES: Record<string, { box: string; title: string }> = {
  sky: { box: "border-sky-700/50 bg-sky-950/20", title: "text-sky-300" },
  blue: { box: "border-blue-700/50 bg-blue-950/20", title: "text-blue-300" },
  gray: { box: "border-gray-700 bg-gray-800/40", title: "text-white" },
  green: { box: "border-green-700/50 bg-green-950/20", title: "text-green-300" },
  pink: { box: "border-pink-700/50 bg-pink-950/20", title: "text-pink-300" },
  yellow: { box: "border-yellow-700/50 bg-yellow-950/20", title: "text-yellow-300" },
  orange: { box: "border-orange-700/50 bg-orange-950/20", title: "text-orange-300" },
  purple: { box: "border-purple-700/50 bg-purple-950/20", title: "text-purple-300" },
  red: { box: "border-red-700/50 bg-red-950/20", title: "text-red-300" },
  teal: { box: "border-teal-700/50 bg-teal-950/20", title: "text-teal-300" },
  indigo: { box: "border-indigo-700/50 bg-indigo-950/20", title: "text-indigo-300" },
  cyan: { box: "border-cyan-700/50 bg-cyan-950/20", title: "text-cyan-300" },
};

function Block({ tone, title, children }: { tone: string; title: string; children: React.ReactNode }) {
  const t = TONES[tone];
  return (
    <div className={`rounded-xl border p-3 text-xs space-y-1 ${t.box}`}>
      <p className={`font-bold mb-1 ${t.title}`}>{title}</p>
      <div className="space-y-1 text-gray-300">{children}</div>
    </div>
  );
}

function Verdict({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border-2 border-green-600/60 bg-green-950/30 p-3 text-xs text-gray-200">
      <p className="font-bold text-green-300 mb-1">診断の基準</p>
      {children}
    </div>
  );
}

function Point({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-yellow-950/30 border border-yellow-700/50 p-3 text-xs space-y-1">
      <p className="font-bold text-yellow-400 mb-1">⚠️ {title}</p>
      <div className="space-y-1 text-gray-300">{children}</div>
    </div>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <span className="text-yellow-300 font-semibold">{children}</span>;
}

function Mini({ title, tone, lines }: { title: string; tone: string; lines: string[] }) {
  return (
    <div className="rounded-lg bg-gray-900 p-2 space-y-1">
      <p className={`font-bold ${tone}`}>{title}</p>
      {lines.map(l => <p key={l} className="text-gray-400">{l}</p>)}
    </div>
  );
}
