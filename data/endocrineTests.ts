// ─── 軸ノード定義 ──────────────────────────────────────
export type AxisKey = "HPA" | "HPT" | "GH" | "HPG" | "ADH" | "Pancreas" | "Catecholamine" | "RAAS";

export interface AxisNodeConfig {
  id: string;
  label: string;    // ボックス表示名
  hormone: string;  // 次ノードへの矢印ラベル
}

export const AXES: Record<AxisKey, AxisNodeConfig[]> = {
  HPA: [
    { id: "hypothalamus", label: "視床下部",   hormone: "CRH" },
    { id: "pituitary",    label: "下垂体",     hormone: "ACTH" },
    { id: "adrenal",      label: "副　腎",     hormone: "コルチゾール" },
  ],
  HPT: [
    { id: "hypothalamus", label: "視床下部",   hormone: "TRH" },
    { id: "pituitary",    label: "下垂体",     hormone: "TSH" },
    { id: "thyroid",      label: "甲状腺",     hormone: "T3/T4" },
  ],
  GH: [
    { id: "hypothalamus", label: "視床下部",   hormone: "GHRH" },
    { id: "pituitary",    label: "下垂体",     hormone: "GH" },
    { id: "liver",        label: "肝/組織",    hormone: "IGF-1" },
  ],
  HPG: [
    { id: "hypothalamus", label: "視床下部",   hormone: "GnRH" },
    { id: "pituitary",    label: "下垂体",     hormone: "LH/FSH" },
    { id: "gonad",        label: "性　腺",     hormone: "性ホルモン" },
  ],
  ADH: [
    { id: "hypothalamus",       label: "視床下部",   hormone: "ADH産生" },
    { id: "pituitary_posterior", label: "下垂体後葉", hormone: "ADH放出" },
    { id: "kidney",             label: "腎集合管",   hormone: "水再吸収" },
  ],
  Pancreas: [
    { id: "stimulus",   label: "刺激物質",   hormone: "刺激" },
    { id: "beta_cell",  label: "膵β細胞",   hormone: "分泌" },
    { id: "c_peptide",  label: "インスリン\n/Cペプチド", hormone: "評価" },
  ],
  Catecholamine: [
    { id: "adrenal_medulla",    label: "副腎髄質",      hormone: "カテコラミン" },
    { id: "plasma",             label: "血中循環",      hormone: "代謝" },
    { id: "urine_metabolites",  label: "尿中メタネフリン", hormone: "定量" },
  ],
  RAAS: [
    { id: "kidney_jga",    label: "傍糸球体装置",   hormone: "レニン" },
    { id: "angiotensin",   label: "アンジオテンシン", hormone: "AngII" },
    { id: "adrenal_zona",  label: "副腎球状層",     hormone: "アルドステロン" },
  ],
};

// ─── 検査カテゴリ ───────────────────────────────────────
export type TestCategory =
  | "副腎・HPA軸"
  | "副腎・褐色細胞腫"
  | "副腎・アルドステロン"
  | "甲状腺・HPT軸"
  | "成長ホルモン軸"
  | "性腺軸"
  | "ADH・水代謝"
  | "膵臓・血糖";

// ─── データ型定義 ───────────────────────────────────────
export interface TimelineStep {
  time: string;
  action: string;
  isKey?: boolean;
  note?: string;
}

export interface JudgmentItem {
  parameter: string;
  unit: string;
  threshold: string;
  isNormalAbove: boolean;
  normalLabel: string;
  abnormalLabel: string;
  note?: string;
}

export interface HormoneFlowConfig {
  axisKey: AxisKey;
  highlightTarget: string; // node id or "feedback"
  mechanismLabel: string;
}

export interface ClinicalNoteRow {
  label: string;
  sublabel?: string;
  value?: string;
}

export interface ClinicalNoteBlock {
  heading?: string;
  rows?: ClinicalNoteRow[];
  text?: string;
}

export interface ClinicalNote {
  title: string;
  emoji?: string;
  blocks: ClinicalNoteBlock[];
}

export interface EndocrineTest {
  id: string;
  name: string;
  tagline: string;
  essence: string;
  color: string;
  category: TestCategory;
  status: "available" | "coming-soon";
  what: string;
  indications: string[];
  preparations: string[];
  timeline: TimelineStep[];
  judgments: JudgmentItem[];
  normalInterpretation: string;
  abnormalInterpretation: string;
  cautions: string[];
  contraindications: string[];
  stopCriteria?: string[];
  pitfalls: string[];
  reportPhrase: string;
  hormoneFlow: HormoneFlowConfig;
  clinicalNotes?: ClinicalNote[];
}

// ─── 検査データ ────────────────────────────────────────
export const endocrineTests: EndocrineTest[] = [

  // ════════════════════════════════
  // 副腎・HPA軸
  // ════════════════════════════════
  {
    id: "cortisol-diurnal",
    name: "コルチゾール日内変動・深夜コルチゾール",
    tagline: "採血時刻で値が大きく変わる — 深夜採血で自律分泌を見抜く",
    essence: "HPA軸の概日リズムと採血タイミング",
    color: "blue",
    category: "副腎・HPA軸",
    status: "available",
    what: "コルチゾールは視床下部CRHパルスジェネレーターの概日リズムに従い、早朝に最高値・深夜に最低値をとる。この日内変動を知らずに採血すると「高値」「低値」を誤解する。クッシング症候群では深夜の抑制が消失するのが最大の特徴。深夜23時の血中コルチゾールが5 μg/dLを超えている場合、コルチゾールの自律分泌が示唆される。",
    indications: [
      "コルチゾール値の解釈（採血時刻の確認）",
      "クッシング症候群のスクリーニング（深夜23時血中コルチゾール）",
      "副腎不全の評価（早朝8時採血が標準）",
    ],
    preparations: [
      "通常の血中コルチゾール測定は早朝6〜8時が基準（最高値帯）",
      "深夜コルチゾール評価：23時ちょうどに採血（入院患者で実施）",
      "採血前は安静にする（運動・ストレスで偽高値になりやすい）",
    ],
    timeline: [
      { time: "6〜8時（早朝）",   action: "コルチゾール 最高値帯: 15〜25 μg/dL", isKey: true, note: "副腎不全評価・標準採血時刻" },
      { time: "12時（正午）",     action: "コルチゾール 中間値帯: 5〜15 μg/dL",   isKey: false },
      { time: "16〜18時（夕）",   action: "コルチゾール 低下帯: 3〜10 μg/dL",     isKey: false },
      { time: "23時（深夜）",     action: "採血（血中コルチゾール）", isKey: true, note: ">5 μg/dL → 自律分泌を示唆。クッシング症候群では抑制されない" },
    ],
    judgments: [
      {
        parameter: "早朝（8時）血中コルチゾール（副腎不全評価）",
        unit: "μg/dL", threshold: "10", isNormalAbove: true,
        normalLabel: "副腎不全の可能性低い",
        abnormalLabel: "<10 → 副腎不全を疑い迅速ACTH試験へ",
        note: "3〜10μg/dLはグレーゾーン。<3μg/dLは副腎不全を強く示唆",
      },
      {
        parameter: "深夜（23時）血中コルチゾール（クッシング評価）",
        unit: "μg/dL", threshold: "5", isNormalAbove: false,
        normalLabel: "正常（深夜抑制あり）",
        abnormalLabel: ">5 → コルチゾール自律分泌を示唆",
        note: "1mg DST・UFCと組み合わせて総合判断する",
      },
    ],
    normalInterpretation: "早朝高値・深夜低値のリズムが正常に保たれている → HPA軸の概日リズム正常。",
    abnormalInterpretation: "深夜コルチゾール>5 μg/dL → 自律分泌を示唆（日内変動の平坦化）。クッシング症候群の特徴。1mg DSTやUFCと組み合わせて診断を進める。",
    cautions: [
      "午後・夕方の採血でコルチゾールが低値でも正常 → 時刻を必ず記録する",
      "夜勤・交代勤務・重篤な入院患者では概日リズムが乱れ偽高値になりやすい",
      "経口エストロゲン服用 → CBG（コルチゾール結合グロブリン）増加 → 総コルチゾール偽高値",
      "深夜採血は入院患者でのみ実施可能",
    ],
    contraindications: [],
    pitfalls: [
      "「コルチゾール高値」を見たらまず採血時刻を確認する — 午後採血では当然低い",
      "深夜採血の時刻がずれると判定精度が落ちる → 23時ちょうどを厳守する",
      "深夜コルチゾール単独では確定診断できない → 1mg DST・UFCと組み合わせる",
    ],
    reportPhrase: "早朝（___時）コルチゾール ___μg/dL。深夜23時コルチゾール ___μg/dL（【正常／>5 μg/dL・自律分泌示唆】）。",
    hormoneFlow: {
      axisKey: "HPA", highlightTarget: "adrenal",
      mechanismLabel: "概日リズムに従い早朝に最高値\n深夜の抑制消失がクッシングの鍵",
    },
    clinicalNotes: [
      {
        title: "クッシング症候群の身体所見・徴候",
        emoji: "🩺",
        blocks: [
          {
            heading: "体型変化",
            rows: [
              { label: "中心性肥満（体幹肥満）" },
              { label: "満月様顔貌（moon face）" },
              { label: "野牛肩（buffalo hump）" },
              { label: "四肢は相対的に細い" },
            ],
          },
          {
            heading: "皮膚所見（診断価値が高い）",
            rows: [
              { label: "赤紫色皮膚線条（striae）", sublabel: "幅1cm以上、腹部・大腿" },
              { label: "皮膚菲薄化・易出血性（皮下出血）" },
              { label: "創傷治癒遅延" },
              { label: "にきび・脂漏" },
            ],
          },
          {
            heading: "筋骨格",
            rows: [
              { label: "近位筋筋力低下（大腿・肩）" },
              { label: "骨粗鬆症 → 圧迫骨折" },
            ],
          },
          {
            heading: "代謝・内分泌異常",
            rows: [
              { label: "高血圧" },
              { label: "耐糖能異常〜糖尿病" },
              { label: "脂質異常症" },
              { label: "低K血症", sublabel: "ACTH依存性で特に顕著" },
            ],
          },
          {
            heading: "精神・神経・性腺",
            rows: [
              { label: "抑うつ・不安・不眠・認知機能低下" },
              { label: "無月経・性欲低下・不妊" },
              { label: "易感染性・日和見感染（重症例）" },
            ],
          },
          {
            heading: "見逃しやすい盲点",
            rows: [
              { label: "肥満＋糖尿病として扱われている" },
              { label: "皮膚線条が「妊娠線」と誤認" },
              { label: "筋力低下が加齢扱い" },
              { label: "特に疑うべき組み合わせ", value: "紫色線条＋筋力低下＋高血圧" },
            ],
          },
          {
            heading: "スクリーニング適応",
            rows: [
              { label: "若年高血圧" },
              { label: "コントロール不良糖尿病" },
              { label: "原因不明骨折" },
              { label: "典型皮膚所見" },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "rapid-acth",
    name: "迅速ACTH試験",
    tagline: "副腎の予備能を直接確かめる",
    essence: "副腎の応答力",
    color: "blue",
    category: "副腎・HPA軸",
    status: "available",
    what: "外からACTHを投与して副腎皮質がコルチゾールを十分に産生できるかを確認する。視床下部・下垂体をバイパスして副腎を直接刺激する。",
    indications: [
      "副腎不全の疑い（倦怠感・低血圧・低Na血症）",
      "長期ステロイド使用後の副腎抑制評価",
      "下垂体疾患後のフォローアップ",
    ],
    preparations: [
      "特別な絶食は不要",
      "当日朝のステロイドは検査後まで保留（施設基準による）",
      "アナフィラキシー対応準備：ルート確保・エピネフリン準備",
    ],
    timeline: [
      { time: "0分",  action: "採血（コルチゾール・ACTH・電解質）", isKey: true },
      { time: "0分",  action: "テトラコサクチド 250μg IV（または筋注）", isKey: true, note: "コートロシン®" },
      { time: "30分", action: "採血（コルチゾール）", isKey: true },
      { time: "60分", action: "採血（コルチゾール）", isKey: true },
    ],
    judgments: [
      {
        parameter: "コルチゾール頂値（30 or 60分）",
        unit: "μg/dL", threshold: "18", isNormalAbove: true,
        normalLabel: "正常（副腎不全なし）",
        abnormalLabel: "副腎不全疑い",
        note: "施設によっては ≥500 nmol/L を採用",
      },
    ],
    normalInterpretation: "ACTHに反応してコルチゾールが十分上昇 → 副腎皮質は正常に機能している。",
    abnormalInterpretation: "上昇不十分 → 一次性副腎不全、または長期ACTH低下による二次性副腎不全を疑う。",
    cautions: [
      "アナフィラキシー（稀・0.5%以下）→ エピネフリン・抗ヒスタミン薬を準備",
      "重篤な副腎不全が疑われる場合はヒドロコルチゾン投与を優先",
      "採血時刻と検体ラベルを必ず確認",
    ],
    contraindications: ["テトラコサクチドへの既知のアレルギー"],
    stopCriteria: ["蕁麻疹・血圧低下・呼吸困難 → 直ちに中止しアナフィラキシー対応"],
    pitfalls: [
      "30分値が低くても60分値が≥18なら正常 — 頂値で判定する",
      "この試験では二次性副腎不全の除外は不十分（感度低）",
      "ステロイドすでに投与中の場合は偽正常になりうる",
    ],
    reportPhrase: "ACTH試験でコルチゾール頂値が ___μg/dL と【正常反応／反応不良】でした。",
    hormoneFlow: {
      axisKey: "HPA", highlightTarget: "adrenal",
      mechanismLabel: "副腎に直接ACTHを投与して\n副腎の反応を評価",
    },
  },

  {
    id: "dexamethasone-suppression",
    name: "デキサメタゾン抑制試験",
    tagline: "コルチゾールの自律分泌を見抜く",
    essence: "フィードバック制御の正常性",
    color: "violet",
    category: "副腎・HPA軸",
    status: "available",
    what: "合成ステロイド（DEX）を投与してフィードバックをかけ、コルチゾールが正常に抑制されるかを評価する。クッシング症候群のスクリーニング検査。",
    indications: [
      "クッシング症候群の疑い（中心性肥満・高血圧・糖尿病・皮膚線条）",
      "副腎偶発腫瘍（インシデンタローマ）の機能評価",
      "コルチゾール高値の精査",
    ],
    preparations: [
      "前日夜22〜23時にデキサメタゾン1mgを内服（忘れずに確認）",
      "翌朝8〜9時に採血（空腹時推奨）",
      "CYP3A4誘導薬（フェニトイン・リファンピシン）は偽陰性の原因",
    ],
    timeline: [
      { time: "前日 23:00", action: "デキサメタゾン 1mg 内服", isKey: true, note: "患者自身が内服 → 確認が重要" },
      { time: "翌朝 8:00",  action: "コルチゾール採血（ACTH同時採血も可）", isKey: true },
    ],
    judgments: [
      {
        parameter: "翌朝コルチゾール",
        unit: "μg/dL", threshold: "1.8", isNormalAbove: false,
        normalLabel: "正常（抑制あり）",
        abnormalLabel: "抑制不十分 → クッシング疑い",
        note: "感度高・特異度低。偽陽性多い → 陽性なら精密検査へ",
      },
    ],
    normalInterpretation: "DEXのフィードバックが正常に効き、ACTH↓ → コルチゾール↓。クッシング症候群は否定的。",
    abnormalInterpretation: "フィードバックが効かずコルチゾールが抑制されない → 自律分泌を疑い、UFC・深夜唾液コルチゾール・2日法などへ。",
    cautions: [
      "偽陽性：うつ病・アルコール多飲・肥満・急性疾患・ストレス",
      "偽陰性：CYP3A4誘導薬（フェニトイン・リファンピシン等）",
      "経口避妊薬・エストロゲン服用 → CBG上昇で偽陽性",
      "陽性でも必ず精密検査（UFC・2日法）で確認する",
    ],
    contraindications: [],
    pitfalls: [
      "患者がDEXを飲み忘れていないか必ず確認する（最多の失敗原因）",
      "陽性＝クッシングではない。感度優先の検査のため偽陽性が多い",
      "採血時刻が9時を過ぎると日内変動で偽陽性になりやすい",
    ],
    reportPhrase: "1mg デキサメタゾン抑制試験でコルチゾールが ___μg/dL と【抑制あり／抑制不十分】でした。",
    hormoneFlow: {
      axisKey: "HPA", highlightTarget: "feedback",
      mechanismLabel: "DEX 1mgがフィードバックを模倣\n→ クッシング症候群のスクリーニング",
    },
  },

  {
    id: "high-dose-dst",
    name: "大量デキサメタゾン抑制試験（8mg DST）",
    tagline: "クッシング病と異所性ACTH症候群を鑑別する",
    essence: "ACTHの産生部位（下垂体 vs 異所性）",
    color: "violet",
    category: "副腎・HPA軸",
    status: "available",
    what: "8mgのDEXを投与し、コルチゾールが抑制されるかどうかで過剰ACTHの産生部位を鑑別する。下垂体腺腫（クッシング病）は大量DEXでも抑制されるが、異所性ACTH産生腫瘍は抑制されない。1mg DSTでスクリーニング陽性 → 本試験で局在診断という流れで使用。",
    indications: [
      "クッシング症候群のACTH依存性確認後の局在診断",
      "クッシング病（下垂体性）vs 異所性ACTH症候群の鑑別",
      "副腎偶発腫瘍でACTH高値の精査",
    ],
    preparations: [
      "一夜法（標準）: 前日23時にDEX 8mgを内服 → 翌朝8時に採血（ACTH・コルチゾール）",
      "※歴史的プロトコル: Liddle高用量2日法（DEX 2mg ×6時間毎 ×2日間＝計16mg）も存在するが、現在はほぼ使用されない",
      "ベースラインのコルチゾール・ACTH・UFC（24h蓄尿）を確認",
      "CYP3A4誘導薬は中止または影響を考慮する",
    ],
    timeline: [
      { time: "前日 23時", action: "DEX 8mgを内服", isKey: true },
      { time: "翌朝 8時", action: "採血（コルチゾール・ACTH）", isKey: true },
      { time: "必要時", action: "UFC（24h蓄尿）をDEX前後で比較", note: "感度・特異度向上のため" },
    ],
    judgments: [
      {
        parameter: "コルチゾール抑制率（DEX前後比較）",
        unit: "%", threshold: "50", isNormalAbove: true,
        normalLabel: "クッシング病（下垂体性）",
        abnormalLabel: "異所性ACTH or 副腎腫瘍",
        note: "抑制率≥50%でクッシング病を示唆（感度83%程度）。確定にはIPSS（下錐体静脈洞サンプリング）が必要",
      },
    ],
    normalInterpretation: "コルチゾールが≥50%抑制 → 下垂体腺腫は高用量DEXに反応する → クッシング病を示唆。MRI・IPSSへ進む。",
    abnormalInterpretation: "抑制なし → 異所性ACTH産生腫瘍（肺カルチノイド・胸腺腫など）または副腎自律腫瘍を疑う。CT/FDG-PETで腫瘍探索。",
    cautions: [
      "1mg DSTで陽性確認済みの患者に実施する（スクリーニングには使わない）",
      "感度・特異度ともに完全ではない → IPSS（侵襲的）が確定診断の標準",
      "抑制ありでも異所性ACTHが完全に除外できない（偽陽性）",
      "現在は一夜法（8mg単回）が標準。Liddle高用量2日法は歴史的プロトコル",
    ],
    contraindications: [],
    pitfalls: [
      "1mg DSTと8mg DSTの目的が異なる: 1mgはスクリーニング（感度優先）、8mgは鑑別（特異度を上げる目的）",
      "下垂体MRIが陰性でもクッシング病は除外できない（微小腺腫は見えないことが多い）",
      "抑制率の計算はベースライン採血時刻を統一して行う",
    ],
    reportPhrase: "8mg DEX試験でコルチゾールが ___μg/dL（___% 抑制）と【下垂体性示唆／抑制不十分】でした。",
    hormoneFlow: {
      axisKey: "HPA", highlightTarget: "feedback",
      mechanismLabel: "大量DEX（8mg）で\n下垂体 vs 異所性ACTHを鑑別",
    },
  },

  {
    id: "24h-ufc",
    name: "24時間蓄尿遊離コルチゾール（UFC）",
    tagline: "1日のコルチゾール総産生量を客観的に評価する",
    essence: "副腎からのコルチゾール過剰産生",
    color: "teal",
    category: "副腎・HPA軸",
    status: "available",
    what: "24時間の尿を全量採取し、尿中に排泄される遊離コルチゾールを定量する。日内変動の影響を受けず、クッシング症候群のスクリーニング検査として1mg DSTと並んで推奨されている。投薬なしで実施できる非侵襲的な確認試験。",
    indications: [
      "クッシング症候群の診断（スクリーニング）",
      "1mg DST陽性後の確認検査",
      "クッシング症候群治療後のモニタリング",
    ],
    preparations: [
      "採尿開始時刻に排尿して捨て、以後の全尿を専用容器に24時間採取（採尿終了時も排尿して加える）",
      "採尿容器は遮光・冷蔵保存（施設の指示に従う）",
      "採尿量（mL）を必ず記録する",
      "採尿中は激しい運動・ストレス・急性疾患を避ける",
    ],
    timeline: [
      { time: "Day 1 朝（例: 7:00）", action: "排尿して捨てる（採尿開始）", isKey: true },
      { time: "Day 1 7:00 ～ Day 2 7:00", action: "以降の全尿を採尿容器に貯める", isKey: true },
      { time: "Day 2 朝（例: 7:00）", action: "最終排尿を採尿容器に加えて採尿終了", isKey: true },
      { time: "採尿終了後", action: "総尿量記録 → 検体提出（UFC・尿クレアチニン測定）", isKey: true },
    ],
    judgments: [
      {
        parameter: "UFC（尿中遊離コルチゾール）",
        unit: "μg/day", threshold: "正常上限×3", isNormalAbove: false,
        normalLabel: "クッシング症候群は否定的",
        abnormalLabel: "クッシング症候群強く疑う",
        note: "正常上限×1〜3倍は偽性クッシング（肥満・うつ・飲酒）との重なり多い。×3以上で確定的",
      },
    ],
    normalInterpretation: "UFC正常範囲 → コルチゾール過剰産生はない。ただし周期性クッシングでは偽陰性あり → 繰り返し測定を検討。",
    abnormalInterpretation: "UFC高値（正常上限×3超） → コルチゾール過剰産生を確認。原因（下垂体/副腎/異所性）の精査へ進む。",
    cautions: [
      "採尿不完全が最多の誤差原因 → 尿クレアチニンで採尿完全性を確認する（体重1kgあたり約15-20mg/day）",
      "腎機能低下（GFR<60）では偽低値になりやすい",
      "うつ病・アルコール多飲・肥満・過度なストレスでは偽高値（疑似クッシング）",
      "スクリーニングとして最低2回施行が推奨（変動が大きいため）",
    ],
    contraindications: [],
    pitfalls: [
      "正常上限の1〜3倍はグレーゾーン → 深夜唾液コルチゾール・1mg DSTと組み合わせて判断",
      "採尿量が少ない（<500mL/day or 尿クレアチニン低値）は再検を要する",
      "UFCが正常でもクッシング症候群を完全に除外できない（特に周期性タイプ）",
    ],
    reportPhrase: "24時間UFC ___μg/dayで【正常範囲／正常上限×___倍の高値】でした。尿量 ___mL/day。",
    hormoneFlow: {
      axisKey: "HPA", highlightTarget: "adrenal",
      mechanismLabel: "副腎からのコルチゾール過剰分泌を\n24時間尿量で客観的に定量",
    },
  },

  {
    id: "crh-test",
    name: "CRH試験",
    tagline: "副腎不全の「どこが原因か」を鑑別する【三者負荷試験の1つ】",
    essence: "下垂体のACTH分泌能",
    color: "teal",
    category: "副腎・HPA軸",
    status: "available",
    what: "外からCRHを投与して下垂体がACTHを十分に分泌できるかを評価する。迅速ACTH試験で副腎不全が確認された後、原因が「下垂体性」か「視床下部性」かを鑑別するために用いる。実臨床では TRH・GnRH と同時に投与する「三者負荷試験（CRH＋TRH＋GnRH）」として行うことが多く、下垂体の複数軸を1回の試験で一括評価できる。",
    indications: [
      "副腎不全の原因鑑別（視床下部性 vs 下垂体性）",
      "クッシング症候群の局在診断補助（IPSS施行前）",
    ],
    preparations: [
      "絶食不要",
      "コルチゾール・ACTH基礎値の事前確認",
    ],
    timeline: [
      { time: "0分",  action: "採血（コルチゾール・ACTH）", isKey: true },
      { time: "0分",  action: "CRH 100μg IV（緩徐に）投与", isKey: true },
      { time: "15分", action: "採血（ACTH）", isKey: true },
      { time: "30分", action: "採血（ACTH・コルチゾール）", isKey: true },
      { time: "60分", action: "採血（ACTH・コルチゾール）", isKey: true },
      { time: "90分", action: "採血（コルチゾール）" },
    ],
    judgments: [
      {
        parameter: "ACTH頂値（30分）",
        unit: "pg/mL", threshold: "30", isNormalAbove: true,
        normalLabel: "正常（前値の2倍以上 or ≥30pg/mL）",
        abnormalLabel: "下垂体性副腎不全疑い",
        note: "頂値が前値の2倍以上 or ≥30pg/mL のいずれかを満たせば正常。FSH以外は30分で頂値、FSHは60分で頂値",
      },
      {
        parameter: "cortisol頂値",
        unit: "μg/dL", threshold: "18", isNormalAbove: true,
        normalLabel: "正常（副腎反応あり）",
        abnormalLabel: "副腎反応不良",
        note: "cortisol正常：頂値>18μg/dL",
      },
    ],
    normalInterpretation: "CRHに反応してACTHが上昇（前値2倍以上 or ≥30pg/mL）→ 下垂体は正常 → 原因は視床下部の可能性。",
    abnormalInterpretation: "ACTHが上昇しない → 下垂体自体に問題（下垂体性副腎不全）。",
    cautions: [
      "顔面紅潮・一過性の血圧変動が起こりうる（通常軽微）",
      "クッシング症候群鑑別での使用はIPSS（下錐体静脈洞サンプリング）と組み合わせる",
    ],
    contraindications: [],
    pitfalls: [
      "単独では確定診断できない → 迅速ACTH試験・画像と組み合わせる",
      "下垂体手術直後は結果が安定しない（術後6週以降が望ましい）",
    ],
    reportPhrase: "CRH試験でACTHが ___pg/mL と【反応あり／反応不良】でした。",
    hormoneFlow: {
      axisKey: "HPA", highlightTarget: "pituitary",
      mechanismLabel: "CRHを投与して下垂体の\nACTH分泌能を直接評価",
    },
  },

  // ════════════════════════════════
  // 副腎・褐色細胞腫
  // ════════════════════════════════
  {
    id: "urine-metanephrine",
    name: "酸性蓄尿メタネフリン・ノルメタネフリン",
    tagline: "褐色細胞腫・パラガングリオーマを尿検査でスクリーニングする",
    essence: "副腎髄質カテコラミン過剰産生",
    color: "red",
    category: "副腎・褐色細胞腫",
    status: "available",
    what: "褐色細胞腫やパラガングリオーマが産生するカテコラミン（アドレナリン・ノルアドレナリン）は体内で代謝されてメタネフリン・ノルメタネフリンとなり尿中に排泄される。24時間尿を酸性化して採取し定量することで腫瘍の存在を推定する。血漿遊離メタネフリンとの組み合わせが診断精度を高める。",
    indications: [
      "高血圧（特に発作性・難治性・若年性）の精査",
      "褐色細胞腫が疑われる症状（頭痛・動悸・発汗の三徴）",
      "副腎偶発腫瘍（インシデンタローマ）の機能評価",
      "MEN2・VHL・SDH変異などの遺伝性症候群スクリーニング",
    ],
    preparations: [
      "採尿容器に塩酸（HCl）20mLをあらかじめ入れて酸性化（pH<3維持）",
      "24時間蓄尿（採尿方法はUFCと同様）",
      "採尿中の薬剤確認: カテコラミン・メチルドパ・ラベタロール・β遮断薬は結果に影響",
      "採尿前48時間はバナナ・チーズ・チョコレート・カフェイン・タバコを避ける",
    ],
    timeline: [
      { time: "Day 1 朝", action: "排尿して捨て、酸性化済み採尿容器に24時間蓄尿開始", isKey: true },
      { time: "Day 2 朝", action: "採尿完了。総尿量記録 → 速やかに提出（常温放置厳禁）", isKey: true },
    ],
    judgments: [
      {
        parameter: "尿中メタネフリン or ノルメタネフリン",
        unit: "（正常上限比）", threshold: "正常上限×2", isNormalAbove: false,
        normalLabel: "褐色細胞腫は否定的",
        abnormalLabel: "褐色細胞腫・PGL 疑い",
        note: "正常上限×2〜3以上で感度・特異度ともに高い。境界域は繰り返し測定・血漿遊離メタネフリンで確認",
      },
    ],
    normalInterpretation: "メタネフリン・ノルメタネフリンともに正常範囲 → 褐色細胞腫の可能性は低い。ただし間欠性分泌腫瘍では偽陰性あり。",
    abnormalInterpretation: "高値 → 褐色細胞腫・パラガングリオーマを疑い、CT/MRI・MIBG/PETシンチで局在診断へ。降圧治療（α遮断薬先行）の準備を始める。",
    cautions: [
      "手術・処置・侵襲的検査の前には血圧コントロールが必須（クリーゼ予防）",
      "β遮断薬単独使用は禁忌（α未遮断下でのβ遮断はパラドキシカル高血圧）",
      "採尿の酸性化が不十分だとメタネフリンが分解され偽低値になる",
      "急性疾患・重篤なストレス状態では偽高値になりやすい",
    ],
    contraindications: [],
    stopCriteria: [],
    pitfalls: [
      "三徴（頭痛・動悸・発汗）がなくても褐色細胞腫は存在する（無症候性は30%以上）",
      "尿クレアチニンで採尿完全性を必ず確認する",
      "採尿期間中に高血圧発作があった場合の採尿が最も診断価値が高い",
      "血漿遊離メタネフリンの方が感度が高い → 強く疑う場合は血漿測定を優先",
    ],
    reportPhrase: "酸性蓄尿でメタネフリン ___μg/day・ノルメタネフリン ___μg/dayと【正常範囲／高値（正常上限×___倍）】でした。",
    hormoneFlow: {
      axisKey: "Catecholamine", highlightTarget: "urine_metabolites",
      mechanismLabel: "副腎髄質のカテコラミン過剰産生を\n尿中代謝産物（メタネフリン類）で定量",
    },
    clinicalNotes: [
      {
        title: "5H：褐色細胞腫の典型症状",
        emoji: "💊",
        blocks: [
          {
            heading: "5つのHで覚える古典的症候",
            rows: [
              { label: "Headache", sublabel: "頭痛" },
              { label: "Hyperhidrosis", sublabel: "発汗過多" },
              { label: "Hypertension", sublabel: "高血圧" },
              { label: "Hypermetabolism", sublabel: "代謝亢進：体重減少・耐糖能異常など" },
              { label: "Hyperglycemia", sublabel: "高血糖" },
            ],
          },
          {
            heading: "疫学・特徴",
            rows: [
              { label: "遺伝性", value: "約30–40%" },
              { label: "副腎外（パラガングリオーマ）", value: "15–20%" },
              { label: "悪性", value: "10–15%程度" },
            ],
          },
        ],
      },
      {
        title: "MEN2：褐色細胞腫との関連",
        emoji: "🧬",
        blocks: [
          {
            heading: "多発性内分泌腫瘍症2型（MEN2）合併頻度",
            rows: [
              { label: "褐色細胞腫", value: "約50%（MEN2A・2B共通）" },
              { label: "甲状腺髄様癌", value: "ほぼ100%" },
              { label: "副甲状腺機能亢進", value: "MEN2Aのみ" },
            ],
          },
          {
            heading: "サブタイプと原因遺伝子",
            rows: [
              { label: "MEN2A", sublabel: "褐色細胞腫＋甲状腺髄様癌＋副甲状腺機能亢進" },
              { label: "MEN2B", sublabel: "褐色細胞腫＋甲状腺髄様癌＋粘膜神経腫" },
              { label: "原因遺伝子", value: "RET変異" },
            ],
          },
        ],
      },
      {
        title: "VHL病（von Hippel–Lindau）：腫瘍スペクトラム",
        emoji: "🔬",
        blocks: [
          {
            heading: "基本情報",
            rows: [
              { label: "遺伝形式", value: "常染色体優性" },
              { label: "原因遺伝子", value: "VHL遺伝子" },
              { label: "機序", value: "HIF分解障害 → 血管新生亢進" },
            ],
          },
          {
            heading: "主要病変（頻度順）",
            rows: [
              { label: "血管芽腫（小脳・脊髄・網膜）", value: "約60–80%" },
              { label: "腎細胞癌（clear cell RCC・多発両側）", value: "約40–70%" },
              { label: "褐色細胞腫／パラガングリオーマ", value: "約10–20%（Type依存）" },
              { label: "膵嚢胞", value: "約50–70%" },
              { label: "膵神経内分泌腫瘍（pNET）", value: "約10–20%" },
              { label: "内リンパ嚢腫瘍（ELST・難聴の原因）", value: "数%" },
              { label: "精巣上体嚢胞腺腫（男性）", sublabel: "良性" },
            ],
          },
          {
            heading: "臨床分類（褐色細胞腫の有無）",
            rows: [
              { label: "Type 1", sublabel: "褐色細胞腫なし・RCCあり" },
              { label: "Type 2A", sublabel: "褐色細胞腫あり・RCCリスク低" },
              { label: "Type 2B", sublabel: "褐色細胞腫あり・RCCリスク高" },
              { label: "Type 2C", sublabel: "褐色細胞腫のみ" },
            ],
          },
          {
            heading: "臨床的ポイント・盲点",
            rows: [
              { label: "最重要死亡原因", value: "腎細胞癌" },
              { label: "若年のRCC", sublabel: "VHLを疑う" },
              { label: "両側pheo", sublabel: "VHL or MEN2 を鑑別" },
              { label: "網膜血管腫", sublabel: "初発になりうる" },
              { label: "褐色細胞腫の特徴", value: "ノルアドレナリン優位" },
            ],
          },
        ],
      },
    ],
  },

  // ════════════════════════════════
  // 副腎・アルドステロン
  // ════════════════════════════════
  {
    id: "captopril-test",
    name: "カプトプリル負荷試験（原発性アルドステロン症）",
    tagline: "ACE阻害薬でアルドステロン自律分泌を確認する",
    essence: "アルドステロン分泌の自律性（RAAS抑制への反応）",
    color: "sky",
    category: "副腎・アルドステロン",
    status: "available",
    what: "カプトプリル（ACE阻害薬）を投与してアンジオテンシンIIを低下させる。正常ではアルドステロンが抑制されるが、原発性アルドステロン症（PA）では腫瘍・過形成がアンジオテンシン非依存的にアルドステロンを分泌し続けるため抑制されない。外来で実施可能な簡便な確認試験。",
    indications: [
      "高血圧＋低K血症でPAを疑う場合のスクリーニング確認",
      "ARR（アルドステロン/レニン比）高値後の確認試験",
      "生理食塩水負荷試験の代替（外来・禁忌症例）",
    ],
    preparations: [
      "座位30分後に採血（座位で実施する）",
      "カリウム補正は試験前に行う（低K血症はアルドステロン分泌を偽抑制する）",
      "スピロノラクトン・エプレレノン・利尿薬は4週間前から中止",
      "ACE阻害薬・ARB・DHP-Ca拮抗薬・β遮断薬の影響を考慮する",
    ],
    timeline: [
      { time: "0分（座位）", action: "採血（PAC・PRA・血清K）", isKey: true },
      { time: "0分",        action: "カプトプリル 25〜50mg 内服", isKey: true },
      { time: "60分（座位）", action: "採血（PAC・PRA）", isKey: true },
      { time: "120分（座位）", action: "採血（PAC・PRA）", isKey: true, note: "施設により60分 or 90分のみの場合あり" },
    ],
    judgments: [
      {
        parameter: "負荷後 PAC（血漿アルドステロン濃度）",
        unit: "pg/mL", threshold: "60", isNormalAbove: false,
        normalLabel: "抑制あり（PAは否定的）",
        abnormalLabel: "陽性：PAC≥60かつARR≥200 / 暫定陽性：PAC≥60かつARR 100〜200",
        note: "①PAC≥60かつARR≥200→陽性　②PAC≥60かつ100≤ARR<200→暫定陽性",
      },
    ],
    normalInterpretation: "カプトプリルによりAngII↓ → アルドステロンが正常に抑制（PAC<60pg/mL）→ PAは否定的。",
    abnormalInterpretation: "PAC≥60pg/mLかつARR≥200 → PA確認試験陽性。PAC≥60かつARR 100〜200は暫定陽性。副腎CT・AVS（副腎静脈サンプリング）へ進む。",
    cautions: [
      "初回内服後30〜60分は血圧低下に注意（特に高齢者・脱水）",
      "座位を保つことが条件 → 臥位では結果が変わる",
      "ACE阻害薬への過敏症（血管浮腫歴）は禁忌",
      "腎機能低下では血清K上昇に注意",
    ],
    contraindications: ["ACE阻害薬アレルギー（血管浮腫歴）", "妊娠"],
    stopCriteria: ["著明な血圧低下（収縮期血圧<90mmHg）"],
    pitfalls: [
      "PAC/PRA比は測定キット・採血条件（安静・座位・時刻）で大きく変動する",
      "スピロノラクトン内服中はレニンが高値となりARR偽低値になる → 必ず中止期間を確認",
      "生理食塩水試験よりやや感度が低い → 陰性でも臨床的に疑う場合は追加検査",
    ],
    reportPhrase: "カプトプリル試験で負荷後PAC ___ng/dL・PAC/PRA比 ___と【抑制あり／抑制不十分（PA疑い）】でした。",
    hormoneFlow: {
      axisKey: "RAAS", highlightTarget: "adrenal_zona",
      mechanismLabel: "カプトプリルでAngIIを抑制 →\n正常ならアルドステロン↓、PAなら抑制されない",
    },
  },

  {
    id: "saline-infusion-pa",
    name: "生理食塩水負荷試験（原発性アルドステロン症）",
    tagline: "最も信頼性の高いアルドステロン確認試験",
    essence: "循環血漿量増加によるアルドステロン抑制能",
    color: "emerald",
    category: "副腎・アルドステロン",
    status: "available",
    what: "2Lの生理食塩水を4時間かけて点滴し、循環血漿量を増加させてレニン・アルドステロン分泌を抑制する。正常ではアルドステロンが著明に低下するが、PAでは抑制されない。感度・特異度ともに高く国内外のガイドラインで推奨されている標準的確認試験。",
    indications: [
      "ARR高値後の確認試験（最も推奨される方法）",
      "カプトプリル試験陽性後の最終確認",
      "PA確定診断が必要な場合（AVSに進む前の確定）",
    ],
    preparations: [
      "前日夜から絶食（朝食なし）",
      "試験中は臥位（仰臥位）を保つ",
      "低K血症は補正してから実施",
      "心不全・重篤な高血圧（≥160/100mmHg）では禁忌 → カプトプリル試験を選択",
      "スピロノラクトン・利尿薬は4週間前から中止",
    ],
    timeline: [
      { time: "0分（臥位）", action: "採血（PAC・PRA・血清K・コルチゾール）", isKey: true },
      { time: "0分",        action: "生理食塩水 2L を4時間で点滴開始（500mL/h）", isKey: true, note: "点滴中は臥位保持・バイタル定期確認" },
      { time: "60分",       action: "血圧・脈拍・症状確認" },
      { time: "120分",      action: "血圧・脈拍確認" },
      { time: "240分（終了）", action: "採血（PAC・PRA・血清K・コルチゾール）", isKey: true },
    ],
    judgments: [
      {
        parameter: "負荷後 PAC（4時間後）",
        unit: "pg/mL", threshold: "60", isNormalAbove: false,
        normalLabel: "PAは否定的（<12pg/mL で確実）",
        abnormalLabel: "PA確定（≥60pg/mL）",
        note: "≥60pg/mL→陽性（PA確定）、12〜60pg/mL→暫定陽性（グレーゾーン）、<12pg/mLでPA否定",
      },
    ],
    normalInterpretation: "循環血漿量増加 → レニン↓ → AngII↓ → アルドステロン<12pg/mLに抑制。PA否定。",
    abnormalInterpretation: "アルドステロンが≥60pg/mLで抑制されない → PA確定。副腎CT → AVS（副腎静脈サンプリング）で一側性か両側性かを鑑別し、手術 or 薬物療法を選択。",
    cautions: [
      "心不全・重篤な高血圧・腎不全・低K血症未補正では禁忌",
      "点滴中の血圧上昇（稀にPAで著明高血圧）に注意",
      "試験中は臥位保持 → 体位変換で結果が変動する",
      "4時間の拘束が必要 → 患者への十分な説明と同意が必要",
    ],
    contraindications: [
      "心不全（EF低下・浮腫あり）",
      "コントロール不良な高血圧（≥160/100mmHg）",
      "重篤な腎機能障害",
      "低K血症未補正（<3.0mEq/L）",
    ],
    stopCriteria: ["収縮期血圧>200mmHg持続", "著明な呼吸困難・肺水腫症状"],
    pitfalls: [
      "5〜10ng/dLのグレーゾーンでは安易に確定しない → 臨床所見・ARR・カプトプリル試験と総合判断",
      "AVSは技術的に難しい → 一側性疑いでも経験施設への紹介が必要",
      "体位（臥位 vs 座位）で結果が変わる → 試験プロトコルを厳守する",
    ],
    reportPhrase: "生理食塩水負荷試験で4時間後PAC ___ng/dLと【抑制あり（PA否定）／抑制不十分（PA確定）】でした。",
    hormoneFlow: {
      axisKey: "RAAS", highlightTarget: "adrenal_zona",
      mechanismLabel: "生食2Lで循環血漿量増加 →\n正常ならアルドステロン抑制・PAでは抑制されない",
    },
  },

  // ════════════════════════════════
  // 甲状腺・HPT軸
  // ════════════════════════════════
  {
    id: "trh-test",
    name: "TRH試験",
    tagline: "中枢性甲状腺機能低下症の原因を鑑別する【三者負荷試験の1つ】",
    essence: "下垂体TSH分泌能",
    color: "emerald",
    category: "甲状腺・HPT軸",
    status: "available",
    what: "TRHを投与して下垂体のTSH分泌能を評価する。甲状腺機能低下症の原因が「下垂体性」か「視床下部性」かを鑑別するために用いる。実臨床では CRH・GnRH と同時に投与する「三者負荷試験（CRH＋TRH＋GnRH）」として行うことが多く、下垂体の複数軸を1回の試験で一括評価できる。",
    indications: [
      "中枢性甲状腺機能低下症の鑑別（視床下部性 vs 下垂体性）",
      "下垂体機能低下症の評価（TRHによるPRL過剰分泌評価も可）",
    ],
    preparations: [
      "絶食不要",
      "FT4・FT3・TSH基礎値の確認",
    ],
    timeline: [
      { time: "0分",  action: "採血（TSH・PRL・FT4）", isKey: true },
      { time: "0分",  action: "TRH 500μg IV（緩徐に30秒以上かけて）投与", isKey: true },
      { time: "30分", action: "採血（TSH・PRL）", isKey: true },
      { time: "60分", action: "採血（TSH）", isKey: true },
    ],
    judgments: [
      {
        parameter: "TSH頂値",
        unit: "μIU/mL", threshold: "6", isNormalAbove: true,
        normalLabel: "正常（頂値>6μIU/mL）",
        abnormalLabel: "下垂体性低下症疑い",
        note: "遅延反応（60分値>30分値）は視床下部性を示唆。FT3：120分値≥前値1.3倍で正常",
      },
      {
        parameter: "PRL頂値",
        unit: "倍（前値比）", threshold: "2", isNormalAbove: true,
        normalLabel: "正常（頂値>前値2倍）",
        abnormalLabel: "PRL反応不良",
        note: "PRL正常：頂値>前値2倍",
      },
      {
        parameter: "LH頂値",
        unit: "倍（前値比）", threshold: "5", isNormalAbove: true,
        normalLabel: "正常（頂値>前値5倍）",
        abnormalLabel: "LH反応不良",
        note: "LH正常：頂値>前値5倍。FSH正常：頂値>前値1.5倍",
      },
      {
        parameter: "GH（異常性反応）",
        unit: "倍（前値比）", threshold: "2", isNormalAbove: true,
        normalLabel: "GH異常性反応なし",
        abnormalLabel: "GH異常性反応あり（先端肥大症等を示唆）",
        note: "TRH投与でGHが前値の2倍以上に上昇→異常性反応（先端肥大症・糖尿病等で出現）",
      },
    ],
    normalInterpretation: "TRHに反応してTSHが>6μIU/mLに上昇 → 下垂体は正常 → 原因は視床下部の可能性。",
    abnormalInterpretation: "TSH反応不良 → 下垂体性甲状腺機能低下症。遅延反応（60分>30分）なら視床下部性を疑う。",
    cautions: [
      "顔面紅潮・嘔気・尿意（一過性、数分で消失）",
      "原発性甲状腺機能低下症（TSH高値）では施行意義が低い",
    ],
    contraindications: [],
    pitfalls: [
      "30分値 vs 60分値の「遅延パターン」に注目 → 視床下部性の重要な手がかり",
      "原発性甲状腺機能低下症（TSH高値）には不要",
      "甲状腺機能亢進症（TSH抑制状態）では反応しないことがある",
    ],
    reportPhrase: "TRH試験でTSHが最大___mU/Lと【正常反応／反応不良】でした。遅延反応【あり／なし】。",
    hormoneFlow: {
      axisKey: "HPT", highlightTarget: "pituitary",
      mechanismLabel: "TRHを投与して下垂体の\nTSH分泌能を直接評価",
    },
  },

  // ════════════════════════════════
  // 成長ホルモン軸
  // ════════════════════════════════
  {
    id: "arginine-test",
    name: "アルギニン負荷試験",
    tagline: "GH分泌不全をインスリン試験の代替として評価する",
    essence: "下垂体GH分泌能",
    color: "amber",
    category: "成長ホルモン軸",
    status: "available",
    what: "アルギニンを静脈投与してGH分泌を刺激し、下垂体のGH分泌能を評価する。インスリン低血糖試験が禁忌の場合の代替試験として使用。",
    indications: [
      "成人GH分泌不全の診断",
      "インスリン低血糖試験が禁忌の場合（てんかん・心疾患）",
      "小児の低身長・GH分泌不全の評価",
    ],
    preparations: [
      "絶食（8時間以上）",
      "GH基礎値の確認",
      "アルギニン塩酸塩を生理食塩水に溶解（0.5g/kgを500mLに）",
    ],
    timeline: [
      { time: "0分",   action: "採血（GH・IGF-1）", isKey: true },
      { time: "0分",   action: "アルギニン塩酸塩 0.5g/kg を30分かけてIV", isKey: true },
      { time: "30分",  action: "採血（GH）", isKey: true },
      { time: "60分",  action: "採血（GH）", isKey: true },
      { time: "90分",  action: "採血（GH）", isKey: true },
      { time: "120分", action: "採血（GH）", isKey: true },
    ],
    judgments: [
      {
        parameter: "GH頂値",
        unit: "ng/mL", threshold: "3", isNormalAbove: true,
        normalLabel: "GH分泌正常",
        abnormalLabel: "GH分泌不全疑い",
        note: "BMIにより閾値を調整（施設基準による）。BMI高値では閾値を下げる",
      },
    ],
    normalInterpretation: "アルギニン刺激に反応してGHが十分上昇 → 下垂体のGH分泌能は正常。",
    abnormalInterpretation: "GH頂値が低値 → GH分泌不全。成人GH補充療法の適応検討へ。",
    cautions: [
      "嘔気・嘔吐・顔面紅潮（一過性）が起こりうる",
      "腎機能障害では排泄遅延のため高アルギニン血症に注意",
      "インスリン低血糖試験より刺激が弱い → 境界例は両試験が必要な場合あり",
    ],
    contraindications: ["重篤な腎機能障害"],
    pitfalls: [
      "BMIが高いほどGH反応が低下する → 肥満では閾値を3→1.4ng/mLなど下げる施設もある",
      "GH分泌不全の確定診断には2種類の負荷試験が必要（施設基準による）",
      "IGF-1が高値なら試験前から正常の可能性が高い",
    ],
    reportPhrase: "アルギニン負荷試験でGH頂値が ___ng/mL と【正常反応／反応不良】でした。",
    hormoneFlow: {
      axisKey: "GH", highlightTarget: "pituitary",
      mechanismLabel: "アルギニンで下垂体を刺激して\nGH分泌能を評価",
    },
  },

  {
    id: "ghrp2-test",
    name: "GHRP-2負荷試験",
    tagline: "低血糖リスクなしで下垂体GH分泌能を評価する",
    essence: "下垂体GH分泌能（グレリン受容体経由）",
    color: "indigo",
    category: "成長ホルモン軸",
    status: "available",
    what: "GHRP-2（Growth Hormone Releasing Peptide-2）は下垂体のグレリン受容体（GHS-R）に作用し、GHRHとは独立した経路でGH分泌を促進する合成ペプチドである。インスリン低血糖試験が禁忌の患者でも安全に実施でき、日本では成人GH分泌不全診断の保険適用試験として承認されている。",
    indications: [
      "成人GH分泌不全の診断（インスリン低血糖試験の禁忌・代替として）",
      "小児GH分泌不全の確認試験",
      "下垂体術後・放射線治療後のGH軸評価",
    ],
    preparations: [
      "絶食（8時間以上）",
      "GH基礎値・IGF-1・血糖の確認",
      "GHRP-2 2μg/kgを生理食塩水2mLに溶解（最大100μg）",
    ],
    timeline: [
      { time: "0分",  action: "採血（GH・血糖・IGF-1）", isKey: true },
      { time: "0分",  action: "GHRP-2 2μg/kg IVボーラス（最大100μg）", isKey: true, note: "30秒以内に急速静注" },
      { time: "15分", action: "採血（GH）", isKey: true },
      { time: "30分", action: "採血（GH）", isKey: true },
      { time: "45分", action: "採血（GH）" },
      { time: "60分", action: "採血（GH）" },
      { time: "90分", action: "採血（GH）" },
    ],
    judgments: [
      {
        parameter: "GH頂値（15〜30分が頂値となる）",
        unit: "ng/mL", threshold: "9", isNormalAbove: true,
        normalLabel: "GH分泌能 正常",
        abnormalLabel: "重症成人GH分泌不全（≤9.0ng/mL）",
        note: "正常：15〜30分でGH頂値。重症成人GH分泌不全の診断基準：頂値≤9.0ng/mL。（参考）cortisol頂値>11.6μg/dL",
      },
    ],
    normalInterpretation: "GHRP-2刺激でGHが9ng/mL超に上昇（15〜30分で頂値）→ 下垂体のGH分泌能は保たれている。",
    abnormalInterpretation: "GH頂値≤9.0ng/mL → 重症成人GH分泌不全の診断基準を満たす。他の負荷試験と組み合わせて診断を確定する。",
    cautions: [
      "低血糖は起こらない（インスリン低血糖試験との大きな相違点）",
      "一過性の顔面紅潮・口渇・眠気が起こることがある",
      "肥満ではGH頂値が低下しやすい → BMIを記録して解釈に反映させる",
      "下垂体に病変がある場合はGH分泌が著しく低下する",
    ],
    contraindications: [
      "妊娠中（安全性未確立）",
      "活動性悪性腫瘍（GH分泌促進により増悪リスク）",
    ],
    stopCriteria: [
      "著明な血圧変動・アレルギー反応（まれ）",
    ],
    pitfalls: [
      "GHRP-2はGHRHとは独立した経路で作用するため、GHRH単独投与と反応が異なる",
      "頂値は15〜30分に出やすい → 30分までの採血を確実に行う",
      "BMI補正を忘れると過剰診断（肥満例でGH分泌不全と誤診）になりやすい",
      "IGF-1が正常範囲内ならGH分泌不全の可能性は低い → 試験前に必ず確認",
    ],
    reportPhrase: "GHRP-2負荷試験でGH頂値が ___ng/mL と【正常反応／反応不良】でした。BMI ___。",
    hormoneFlow: {
      axisKey: "GH", highlightTarget: "pituitary",
      mechanismLabel: "GHRP-2がグレリン受容体に作用し\n下垂体からGH分泌を促進",
    },
  },

  // ════════════════════════════════
  // 性腺軸
  // ════════════════════════════════
  {
    id: "gnrh-test",
    name: "GnRH（LH-RH）試験",
    tagline: "性腺機能低下症の原因を鑑別する【三者負荷試験の1つ】",
    essence: "下垂体LH/FSH分泌能",
    color: "rose",
    category: "性腺軸",
    status: "available",
    what: "GnRHを投与して下垂体からのLH・FSH分泌能を評価する。性腺機能低下症が「下垂体性」か「視床下部性」かを鑑別する。実臨床では CRH・TRH と同時に投与する「三者負荷試験（CRH＋TRH＋GnRH）」として行うことが多く、下垂体の複数軸を1回の試験で一括評価できる。",
    indications: [
      "性腺機能低下症の原因鑑別（下垂体性 vs 視床下部性）",
      "思春期遅発症・無月経・不妊の精査",
      "下垂体機能低下症の評価",
    ],
    preparations: [
      "絶食不要",
      "LH・FSH・テストステロン（男性）またはエストラジオール（女性）の基礎値確認",
      "女性は月経周期を記録（結果の解釈に影響）",
    ],
    timeline: [
      { time: "0分",  action: "採血（LH・FSH・性ホルモン）", isKey: true },
      { time: "0分",  action: "GnRH（ブセレリン）100μg IV投与", isKey: true },
      { time: "30分", action: "採血（LH・FSH）", isKey: true },
      { time: "60分", action: "採血（LH・FSH）", isKey: true },
    ],
    judgments: [
      {
        parameter: "LH最大増加倍率（ベースラインから）",
        unit: "倍", threshold: "5", isNormalAbove: true,
        normalLabel: "下垂体は正常",
        abnormalLabel: "下垂体性機能低下疑い",
        note: "性別・年齢・月経周期で基準値が異なる。FSHは変化が乏しいことが多い",
      },
    ],
    normalInterpretation: "GnRHに反応してLHが上昇 → 下垂体は正常 → 原因は視床下部（GnRHパルス異常）の可能性。",
    abnormalInterpretation: "反応不良 → 下垂体自体の問題。ただし長期視床下部性機能低下症でも反応低下することがある。",
    cautions: [
      "月経周期によってLH基礎値・反応が大きく変動する（女性）",
      "ステロイド・経口避妊薬服用中は結果に影響する",
    ],
    contraindications: [],
    pitfalls: [
      "視床下部性でも長期機能低下では下垂体の反応が低下することがある → 単回試験で確定しない",
      "FSHよりLHの変化を重視する",
      "検査日の月経周期（何日目か）を必ず記録する",
    ],
    reportPhrase: "GnRH試験でLHが最大___mIU/mLと【正常反応／反応不良】でした。",
    hormoneFlow: {
      axisKey: "HPG", highlightTarget: "pituitary",
      mechanismLabel: "GnRHを投与して下垂体の\nLH/FSH分泌能を評価",
    },
  },

  // ════════════════════════════════
  // ADH・水代謝
  // ════════════════════════════════
  {
    id: "water-deprivation",
    name: "水制限・DDAVP試験",
    tagline: "尿崩症のタイプを見分ける",
    essence: "ADH分泌能と腎の反応性",
    color: "sky",
    category: "ADH・水代謝",
    status: "available",
    what: "水制限で高浸透圧を誘発し、尿浸透圧の上昇を確認する。上昇が不十分なら合成ADH（DDAVP）を投与して腎の反応性を評価する。中枢性DI・腎性DI・心因性多飲を鑑別する。",
    indications: [
      "尿崩症（DI）の診断と分類（中枢性 vs 腎性 vs 心因性多飲）",
      "多尿・口渇の精査",
    ],
    preparations: [
      "前日から水分制限を開始（施設プロトコルによる）",
      "体重・尿量・尿浸透圧・血漿浸透圧を定期測定する準備",
      "低血圧・脱水に対応できる環境で行う",
    ],
    timeline: [
      { time: "開始",    action: "体重・尿量・尿浸透圧・血漿浸透圧・血清Na測定", isKey: true },
      { time: "2時間毎", action: "体重・尿浸透圧・血漿浸透圧を確認", isKey: true },
      { time: "中止条件", action: "体重3%以上減少 or 尿浸透圧>800mOsm/kg達成 or 血漿浸透圧>300mOsm/kg", isKey: true },
      { time: "DDAVP投与", action: "デスモプレシン（DDAVP）2μg IM投与", isKey: true },
      { time: "投与後2時間", action: "尿浸透圧・血漿浸透圧測定", isKey: true },
    ],
    judgments: [
      {
        parameter: "DDAVP投与後の尿浸透圧上昇率",
        unit: "%", threshold: "50", isNormalAbove: true,
        normalLabel: "中枢性DI（ADH不足→腎は正常反応）",
        abnormalLabel: "腎性DI（腎がADHに反応しない）",
        note: "水制限のみで尿浸透圧>800mOsm/kgなら心因性多飲を疑う",
      },
    ],
    normalInterpretation: "水制限で尿が濃縮される → 正常またはADH反応正常（心因性多飲の可能性）。",
    abnormalInterpretation: "水制限で濃縮されず、DDAVP投与後に濃縮される → 中枢性DI。DDAVP後も濃縮されない → 腎性DI。",
    cautions: [
      "脱水・電解質異常・循環不全のリスク → 入院管理が原則",
      "体重3%以上の減少で中止",
      "高Na血症（>150mEq/L）になったら直ちに中止",
    ],
    contraindications: [
      "重篤な心疾患・腎不全",
      "高度の高Na血症（血清Na>145mEq/L）での開始は要注意",
    ],
    stopCriteria: [
      "体重3%以上の減少",
      "血漿浸透圧>300mOsm/kg",
      "血清Na>150mEq/L",
      "血圧低下・意識変容",
    ],
    pitfalls: [
      "心因性多飲では長期多飲で腎の濃縮能が低下 → 水制限のみでは見分けにくい",
      "中枢性DIの診断後は原因（下垂体・視床下部の器質的疾患）検索を忘れずに",
      "電解質は必ずセットで測定する",
    ],
    reportPhrase: "水制限試験にてDDAVP投与後尿浸透圧が___mOsm/kgと【上昇あり（中枢性DI）／変化なし（腎性DI）／制限前から高値（心因性多飲）】でした。",
    hormoneFlow: {
      axisKey: "ADH", highlightTarget: "kidney",
      mechanismLabel: "水制限→ADH分泌確認\nDDAVP→腎の反応性を評価",
    },
  },

  // ════════════════════════════════
  // 膵臓・血糖
  // ════════════════════════════════
  {
    id: "ogtt-75g",
    name: "75g経口ブドウ糖負荷試験（OGTT）",
    tagline: "糖代謝の異常を正確に診断する",
    essence: "インスリン分泌能と感受性",
    color: "orange",
    category: "膵臓・血糖",
    status: "available",
    what: "75gのブドウ糖を経口投与し、血糖とインスリンの時系列反応を評価する。糖尿病・境界型（IGT/IFG）の診断および膵β細胞の機能評価に用いる。",
    indications: [
      "糖尿病・境界型の診断（HbA1c・空腹時血糖だけでは判断できない場合）",
      "妊娠糖尿病のスクリーニング・診断",
      "反応性低血糖の精査",
    ],
    preparations: [
      "3日間以上の自由食（150g/日以上の炭水化物摂取）後に実施",
      "前日夜から絶食（10〜14時間）",
      "試験中は安静・喫煙禁止・運動禁止",
    ],
    timeline: [
      { time: "0分（空腹時）", action: "採血（血糖・インスリン・HbA1c）", isKey: true },
      { time: "0分", action: "ブドウ糖75g経口摂取（5分以内に）", isKey: true },
      { time: "30分", action: "採血（血糖・インスリン）" },
      { time: "60分", action: "採血（血糖・インスリン）" },
      { time: "120分", action: "採血（血糖・インスリン）", isKey: true },
    ],
    judgments: [
      {
        parameter: "120分血糖",
        unit: "mg/dL", threshold: "140", isNormalAbove: false,
        normalLabel: "正常型",
        abnormalLabel: "IGT（140-199）or 糖尿病型（≥200）",
        note: "空腹時血糖と組み合わせて総合判断。ADA/日本糖尿病学会基準",
      },
    ],
    normalInterpretation: "血糖が120分で正常範囲に戻り、インスリン反応も正常 → 糖代謝は正常。",
    abnormalInterpretation: "120分血糖140-199 → IGT（境界型）。≥200 → 糖尿病型。インスリン分泌遅延・低下は将来の糖尿病リスク。",
    cautions: [
      "重篤な高血糖（空腹時血糖≥200mg/dL）では実施不要（すでに糖尿病診断可能）",
      "急性疾患・感染症・手術直後は結果が変動する → 回復後に実施",
      "嘔気・気分不良で飲めない場合は中止",
    ],
    contraindications: ["空腹時血糖≥200mg/dL（糖尿病は確定診断済み）"],
    pitfalls: [
      "準備不足（低炭水化物食・絶食不十分）で偽高値になりやすい",
      "120分のみで判断しない → 空腹時・30分・60分の波形も確認する",
      "採血時刻のズレが判定に影響する → 時刻を厳守",
    ],
    reportPhrase: "75gOGTTで空腹時血糖___mg/dL、120分血糖___mg/dLと【正常型／境界型／糖尿病型】でした。",
    hormoneFlow: {
      axisKey: "Pancreas", highlightTarget: "beta_cell",
      mechanismLabel: "ブドウ糖で膵β細胞を刺激して\nインスリン分泌能を評価",
    },
  },

  {
    id: "glucagon-cpeptide",
    name: "グルカゴン負荷試験（C-peptide）",
    tagline: "膵β細胞の残存機能を測る",
    essence: "膵β細胞の残存インスリン分泌能",
    color: "lime",
    category: "膵臓・血糖",
    status: "available",
    what: "グルカゴンを投与してインスリン分泌を最大に刺激し、Cペプチドを測定することで膵β細胞の残存機能を評価する。1型糖尿病と2型糖尿病の鑑別や治療方針決定に用いる。",
    indications: [
      "1型・2型糖尿病の鑑別（β細胞残存機能の有無）",
      "インスリン依存状態の判断",
      "膵炎・膵切除後の残存機能評価",
    ],
    preparations: [
      "絶食（8〜10時間以上）",
      "空腹時血糖・C-peptide基礎値の確認",
    ],
    timeline: [
      { time: "0分", action: "採血（血糖・C-peptide）", isKey: true },
      { time: "0分", action: "グルカゴン 1mg IM（または SC）投与", isKey: true },
      { time: "6分", action: "採血（C-peptide）", isKey: true },
    ],
    judgments: [
      {
        parameter: "C-peptide頂値（6分）",
        unit: "ng/mL", threshold: "0.5", isNormalAbove: true,
        normalLabel: "β細胞残存分泌あり",
        abnormalLabel: "β細胞残存なし（絶対的インスリン不足）",
        note: "2型相当の反応は頂値≥1.5ng/mLが目安（施設基準による）",
      },
    ],
    normalInterpretation: "グルカゴン刺激に反応してC-peptideが上昇 → β細胞が残存している → 経口薬・GLP-1製剤が有効な可能性。",
    abnormalInterpretation: "C-peptide頂値<0.5ng/mL → β細胞がほぼ消失 → インスリン依存状態（1型DM相当）。",
    cautions: [
      "嘔気・嘔吐（一過性）が起こりやすい → 立位投与は避ける",
      "試験後の血糖上昇に注意（糖尿病患者では著明な高血糖になりうる）",
      "インスリノーマ・褐色細胞腫では禁忌（急激な血糖変動・高血圧）",
    ],
    contraindications: ["インスリノーマ疑い", "褐色細胞腫疑い", "重篤な心疾患"],
    pitfalls: [
      "インスリンではなくCペプチドを測定する → 外因性インスリン注射の影響を受けない",
"空腹時C-peptide<0.1ng/mLなら試験不要（β細胞消失は明らか）",
    ],
    reportPhrase: "グルカゴン負荷試験でC-peptide頂値が ___ng/mL と【β細胞残存あり／なし】でした。",
    hormoneFlow: {
      axisKey: "Pancreas", highlightTarget: "beta_cell",
      mechanismLabel: "グルカゴンで膵β細胞を刺激して\nCペプチド（残存機能）を評価",
    },
  },

  {
    id: "fasting-test-insulinoma",
    name: "絶食試験（インスリノーマ診断）",
    tagline: "低血糖時の不適切インスリン分泌を証明するWhippleの三徴確認",
    essence: "低血糖時の自律インスリン過剰分泌",
    color: "amber",
    category: "膵臓・血糖",
    status: "available",
    what: "絶食によって低血糖を誘発し、低血糖時にもインスリン分泌が抑制されないことを証明する。インスリノーマの確定診断に用いる。Whippleの三徴（①低血糖症状 ②血糖<55mg/dL ③ブドウ糖投与で症状消失）の確認が目標。最長72時間の入院管理が必要。試験終了時にはグルカゴン負荷試験（1mg IV）をセットで施行し、インスリン・Cペプチドの過剰反応を確認する。",
    indications: [
      "インスリノーマ疑い（空腹時低血糖・不可解な意識障害・神経グリコペニア症状）",
      "低血糖の原因精査（内因性 vs 外因性インスリン鑑別）",
      "MEN1患者の膵腫瘍スクリーニング",
    ],
    preparations: [
      "入院管理下で実施（72時間まで）",
      "絶食中は水のみ許可（無カロリー・無カフェイン）",
      "静脈ルート確保・50%ブドウ糖液・グルカゴン1mgを常備",
      "血糖<60mg/dLとなったら採血セット（血糖・インスリン・Cペプチド・プロインスリン・βヒドロキシ酪酸・血中薬物）を実施",
    ],
    timeline: [
      { time: "絶食開始", action: "血糖・インスリン・Cペプチド・プロインスリン採血", isKey: true },
      { time: "6時間毎", action: "血糖モニタリング（血糖<60mg/dLで追加採血）", isKey: true },
      { time: "血糖<55mg/dL 時", action: "終了採血（血糖・インスリン・Cペプチド・プロインスリン・βOHB・薬物スクリーニング）", isKey: true, note: "症状確認→Whippleの三徴を記録" },
      { time: "終了採血直後", action: "グルカゴン 1mg IVボーラス投与", isKey: true, note: "絶食試験とセットで必ず施行する" },
      { time: "グルカゴン後 10分", action: "採血（血糖・インスリン・Cペプチド）", isKey: true, note: "血糖≥25mg/dL上昇 → インスリノーマの追加証拠" },
      { time: "グルカゴン後 20分", action: "採血（血糖）確認・症状観察", isKey: false },
      { time: "終了", action: "50%ブドウ糖 20〜50mL IV → 症状消失を確認", isKey: true },
      { time: "72時間経過（無低血糖）", action: "低血糖なく72時間経過 → グルカゴン負荷試験を施行して終了", note: "陰性でもインスリノーマは除外できない" },
    ],
    judgments: [
      {
        parameter: "低血糖時インスリン（血糖<55mg/dL時）",
        unit: "μIU/mL", threshold: "3", isNormalAbove: false,
        normalLabel: "インスリン適切に抑制",
        abnormalLabel: "不適切インスリン分泌 → インスリノーマ疑い",
        note: "インスリン≥3 + Cペプチド≥0.6nmol/L + プロインスリン≥5pmol/L が揃えば確定的",
      },
    ],
    normalInterpretation: "低血糖時にインスリンが正常に抑制 → インスリノーマは否定的。他の低血糖原因（インスリン分泌促進薬・非膵島性腫瘍性低血糖）を検討。",
    abnormalInterpretation: "低血糖にもかかわらずインスリン・Cペプチド・プロインスリンが高値 → インスリノーマ確定。EUS（超音波内視鏡）・CT・MRIで局在診断。外科切除が根治治療。",
    cautions: [
      "重篤な低血糖（痙攣・意識消失）には直ちにブドウ糖投与 → 試験継続はしない",
      "採血タイミングが遅れると診断精度が低下 → 事前プロトコルの周知徹底",
      "スルホニル尿素薬・メグリチニドの内服はインスリン分泌を増加させるため中止確認が必須",
      "インスリン自己注射や経口血糖降下薬使用者では偽陽性あり → 薬物スクリーニング必須",
    ],
    contraindications: [
      "重篤な心疾患・不整脈（低血糖で悪化リスク）",
      "副腎不全未治療（低血糖への反応障害）",
    ],
    stopCriteria: [
      "血糖<45mg/dL かつ重篤な神経症状（痙攣・意識消失）",
      "血糖<40mg/dL（採血完了後に直ちに終了）",
    ],
    pitfalls: [
      "Cペプチドが低値（<0.6nmol/L）でインスリン高値 → 外因性インスリン注射を疑う（自己注射・虚偽申告）",
      "βヒドロキシ酪酸が高値（>2.7mmol/L）ならインスリン分泌は適切に抑制されている証拠",
      "プロインスリン比率（プロインスリン/インスリン）が高い → インスリノーマの特徴",
      "転移性・悪性インスリノーマもあるため確定後は画像評価が必須",
    ],
    reportPhrase: "絶食試験で血糖 ___mg/dLの低血糖時にインスリン ___μIU/mL・Cペプチド ___nmol/Lと【インスリン適切抑制／不適切高値（インスリノーマ疑い）】でした。グルカゴン負荷後10分血糖 ___mg/dL（___mg/dL上昇）でした。",
    hormoneFlow: {
      axisKey: "Pancreas", highlightTarget: "beta_cell",
      mechanismLabel: "絶食で低血糖を誘発 →\n正常ならインスリン抑制・腫瘍では抑制されない",
    },
    clinicalNotes: [
      {
        title: "MEN1の臨床像（頻度順）",
        emoji: "🧬",
        blocks: [
          {
            heading: "三主徴（MEN1遺伝子・menin変異／常染色体優性）",
            rows: [
              { label: "副甲状腺腫瘍", value: "＞90%" },
              { label: "下垂体腺腫", value: "約30–40%" },
              { label: "膵神経内分泌腫瘍（pNET）", value: "約30–70%" },
            ],
          },
          {
            heading: "下垂体腺腫（頻度順）",
            rows: [
              { label: "プロラクチノーマ（PRL産生）", value: "約60–65%" },
              { label: "GH産生腺腫（先端巨大症）", value: "約20–25%" },
              { label: "ACTH産生腺腫（クッシング病）", value: "約5–10%" },
              { label: "非機能性腺腫", value: "約10–15%" },
            ],
          },
          {
            heading: "膵NET（pNET）（頻度順）",
            rows: [
              { label: "ガストリノーマ（Zollinger-Ellison症候群）", value: "約40–60%" },
              { label: "非機能性pNET", value: "約20–40%" },
              { label: "インスリノーマ", value: "約10–20%" },
              { label: "グルカゴノーマ", value: "＜5%" },
              { label: "VIPoma / ソマトスタチノーマ", value: "＜1–2%" },
            ],
          },
          {
            heading: "臨床的ポイント",
            rows: [
              { label: "生命予後に最も影響", value: "膵NET（非機能性・ガストリノーマ）" },
              { label: "MEN1の初発症状", value: "約半数が副甲状腺機能亢進症" },
              { label: "下垂体腫瘍の特徴", value: "孤発例より大型（macroadenoma多く、治療抵抗性）" },
              { label: "スクリーニング対象", value: "若年発症・多発性腫瘍はMEN1を疑う" },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "glucagon-insulinoma",
    name: "グルカゴン負荷試験（インスリノーマ鑑別）",
    tagline: "グルカゴン刺激後の反応性低血糖でインスリノーマを検証する",
    essence: "グルカゴン刺激に対する異常インスリン分泌",
    color: "orange",
    category: "膵臓・血糖",
    status: "available",
    what: "グルカゴン静注後に血糖・インスリン・Cペプチドを時系列で測定する。インスリノーマでは腫瘍がグルカゴン刺激に反応して過剰にインスリンを分泌し、初期の血糖上昇の後に著明な反応性低血糖が起こる。絶食試験の補完的検査として使用される。注意：このグルカゴン試験はDM患者のβ細胞機能評価（グルカゴン-Cpeptide試験）とは目的・プロトコルが異なる。",
    indications: [
      "絶食試験の補完（72時間絶食で低血糖が誘発されなかった場合）",
      "インスリノーマ診断の追加証拠収集",
      "空腹時低血糖の機能的確認",
    ],
    preparations: [
      "絶食（12時間以上）",
      "静脈ルート2本確保（採血用・ブドウ糖投与用）",
      "50%ブドウ糖液・グルカゴンキット（救急用）を手元に準備",
      "試験前血糖が<70mg/dLなら中止を検討（すでに危険域）",
    ],
    timeline: [
      { time: "0分",  action: "採血（血糖・インスリン・Cペプチド）", isKey: true },
      { time: "0分",  action: "グルカゴン 1mg IVボーラス（急速静注）", isKey: true },
      { time: "5分",  action: "採血（血糖・インスリン・Cペプチド）", isKey: true },
      { time: "10分", action: "採血（血糖・インスリン・Cペプチド）", isKey: true },
      { time: "15分", action: "採血（血糖）", isKey: true },
      { time: "20分", action: "採血（血糖）" },
      { time: "30分", action: "採血（血糖）" },
      { time: "45分", action: "採血（血糖）", note: "血糖<55mg/dLなら試験終了・ブドウ糖投与" },
    ],
    judgments: [
      {
        parameter: "5〜10分のインスリン頂値",
        unit: "μIU/mL", threshold: "150",  isNormalAbove: false,
        normalLabel: "正常反応",
        abnormalLabel: "著明なインスリン過剰分泌 → インスリノーマ疑い",
        note: "絶対値より「低血糖誘発の有無」と「インスリン抑制なし」が重要。カットオフは施設により異なる",
      },
    ],
    normalInterpretation: "グルカゴン刺激後に血糖が上昇・インスリンは適度に反応し、30〜45分で正常血糖に戻る → 自律的インスリン分泌過剰の証拠なし。",
    abnormalInterpretation: "グルカゴン刺激後5〜10分でインスリンが著明高値 → 15〜30分以内に血糖が55mg/dL未満に低下（反応性低血糖）→ インスリノーマを強く示唆。絶食試験との組み合わせで診断精度が高まる。",
    cautions: [
      "著明な反応性低血糖（血糖<45mg/dL）が起こりうる → 常にブドウ糖投与の準備",
      "試験終了まで患者から離れない（医師または看護師が付き添う）",
      "嘔気・嘔吐（グルカゴン副作用）に対する準備",
      "グルカゴン禁忌: インスリノーマが疑われる以外の高インスリン血症状態ではリスクが高い",
    ],
    contraindications: [
      "褐色細胞腫疑い（カテコラミン放出誘発）",
      "重篤な心疾患",
    ],
    stopCriteria: [
      "血糖<45mg/dL → 試験中止・50%ブドウ糖投与",
      "痙攣・意識消失",
    ],
    pitfalls: [
      "グルカゴン-Cpeptide試験（DM用：2・6分採血）と混同しない → 採血時点と目的が異なる",
      "インスリン高値のみでなく「低血糖誘発の有無」を必ず確認する",
      "偽陰性あり（腫瘍が小さいまたは間欠性分泌） → 陰性でもインスリノーマを除外できない",
    ],
    reportPhrase: "グルカゴン負荷試験で5〜10分インスリン頂値 ___μIU/mL・血糖最低値 ___mg/dLと【正常反応／著明過剰分泌・反応性低血糖あり（インスリノーマ疑い）】でした。",
    hormoneFlow: {
      axisKey: "Pancreas", highlightTarget: "beta_cell",
      mechanismLabel: "グルカゴンでβ細胞を刺激 →\nインスリノーマは過剰分泌後に反応性低血糖",
    },
  },
];
