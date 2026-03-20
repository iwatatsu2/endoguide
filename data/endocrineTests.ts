// ─── 軸ノード定義 ──────────────────────────────────────
export type AxisKey = "HPA" | "HPT" | "GH" | "HPG" | "ADH" | "Pancreas";

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
};

// ─── 検査カテゴリ ───────────────────────────────────────
export type TestCategory =
  | "副腎・HPA軸"
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
}

// ─── 検査データ ────────────────────────────────────────
export const endocrineTests: EndocrineTest[] = [

  // ════════════════════════════════
  // 副腎・HPA軸
  // ════════════════════════════════
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
    reportPhrase: "デキサメタゾン抑制試験でコルチゾールが ___μg/dL と【抑制あり／抑制不十分】でした。",
    hormoneFlow: {
      axisKey: "HPA", highlightTarget: "feedback",
      mechanismLabel: "DEXがフィードバックを模倣\n→ 正常なら抑制される経路を評価",
    },
  },

  {
    id: "crh-test",
    name: "CRH試験",
    tagline: "副腎不全の「どこが原因か」を鑑別する",
    essence: "下垂体のACTH分泌能",
    color: "teal",
    category: "副腎・HPA軸",
    status: "available",
    what: "外からCRHを投与して下垂体がACTHを十分に分泌できるかを評価する。迅速ACTH試験で副腎不全が確認された後、原因が「下垂体性」か「視床下部性」かを鑑別するために用いる。",
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
        parameter: "ACTH最大増加率（ベースラインから）",
        unit: "%", threshold: "50", isNormalAbove: true,
        normalLabel: "下垂体は正常",
        abnormalLabel: "下垂体性副腎不全疑い",
        note: "施設・キット基準による",
      },
    ],
    normalInterpretation: "CRHに反応してACTHが上昇 → 下垂体は正常 → 原因は視床下部の可能性。",
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

  {
    id: "insulin-hypoglycemia",
    name: "インスリン低血糖試験",
    tagline: "視床下部の危機対応を総合評価する",
    essence: "視床下部の危機対応能力",
    color: "red",
    category: "副腎・HPA軸",
    status: "available",
    what: "インスリン投与で低血糖を誘発し、視床下部-下垂体系のストレス応答（コルチゾール↑・GH↑）を評価する。コルチゾールとGHを同時評価できる最も強力な試験。",
    indications: [
      "下垂体機能低下症の確定診断（ACTH・GH分泌能の同時評価）",
      "成人GH分泌不全の診断（保険適用の条件に含まれる）",
    ],
    preparations: [
      "絶食（8時間以上）",
      "必ず医師立ち会い・静脈ルート確保・50%ブドウ糖液を手元に準備",
      "血糖計をベッドサイドに用意して15〜30分毎に確認",
    ],
    timeline: [
      { time: "0分",   action: "採血（血糖・GH・コルチゾール）", isKey: true },
      { time: "0分",   action: "インスリン 0.1U/kg IV投与", isKey: true, note: "GH分泌不全強く疑う場合は0.05U/kg" },
      { time: "15分",  action: "採血（血糖）＋症状確認", isKey: true },
      { time: "30分",  action: "採血（血糖・GH・コルチゾール）", isKey: true },
      { time: "45分",  action: "採血（血糖・GH）" },
      { time: "60分",  action: "採血（血糖・GH・コルチゾール）", isKey: true },
      { time: "90分",  action: "採血（GH・コルチゾール）" },
      { time: "120分", action: "採血（GH・コルチゾール）" },
    ],
    judgments: [
      {
        parameter: "血糖最低値（有効性確認）",
        unit: "mg/dL", threshold: "40", isNormalAbove: false,
        normalLabel: "十分な刺激あり（試験有効）",
        abnormalLabel: "刺激不十分 → 試験無効",
        note: "<40に達しないと全結果が無効",
      },
      {
        parameter: "コルチゾール頂値",
        unit: "μg/dL", threshold: "18", isNormalAbove: true,
        normalLabel: "正常（副腎不全なし）",
        abnormalLabel: "副腎不全疑い",
        note: "施設基準による",
      },
      {
        parameter: "GH頂値",
        unit: "ng/mL", threshold: "3", isNormalAbove: true,
        normalLabel: "GH分泌正常",
        abnormalLabel: "GH分泌不全疑い",
        note: "BMI・年齢・性別で補正が必要な場合あり",
      },
    ],
    normalInterpretation: "低血糖刺激に反応してコルチゾール・GHが十分上昇 → 視床下部-下垂体系は正常。",
    abnormalInterpretation: "反応不十分 → 下垂体機能低下症または成人GH分泌不全を診断。",
    cautions: [
      "意識障害・痙攣のリスクあり → 必ず医師立ち会い",
      "著しい低血糖の場合は50%ブドウ糖20mL IVで直ちに補正",
      "高齢者・虚血性心疾患・てんかん患者には禁忌",
    ],
    contraindications: [
      "てんかん・痙攣の既往",
      "冠動脈疾患・不安定狭心症",
      "空腹時血糖 <70mg/dL",
      "下垂体卒中急性期",
    ],
    stopCriteria: [
      "意識消失・痙攣 → 直ちに50%ブドウ糖IV",
      "血糖<30mg/dL かつ強い症状 → 中止して補正",
      "心電図変化・胸痛 → 中止",
    ],
    pitfalls: [
      "血糖<40mg/dLに達しないと試験無効 → 上級医に相談して追加投与を検討",
      "コルチゾールとGHの両方を評価できる唯一の試験だが危険度が最も高い",
      "GH補充療法の適応にはこの試験を含む複数試験が必要（施設・保険基準による）",
    ],
    reportPhrase: "インスリン低血糖試験で血糖最低___mg/dL到達、コルチゾール頂値___μg/dL、GH頂値___ng/mL と【正常反応／反応不良】でした。",
    hormoneFlow: {
      axisKey: "HPA", highlightTarget: "hypothalamus",
      mechanismLabel: "低血糖で視床下部全体を刺激\nGH・コルチゾール両方を同時評価",
    },
  },

  // ════════════════════════════════
  // 甲状腺・HPT軸
  // ════════════════════════════════
  {
    id: "trh-test",
    name: "TRH試験",
    tagline: "中枢性甲状腺機能低下症の原因を鑑別する",
    essence: "下垂体TSH分泌能",
    color: "emerald",
    category: "甲状腺・HPT軸",
    status: "available",
    what: "TRHを投与して下垂体のTSH分泌能を評価する。甲状腺機能低下症の原因が「下垂体性」か「視床下部性」かを鑑別するために用いる。",
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
        parameter: "TSH増加量（30分値 − 基礎値）",
        unit: "mU/L", threshold: "2", isNormalAbove: true,
        normalLabel: "正常（下垂体は正常）",
        abnormalLabel: "下垂体性低下症疑い",
        note: "遅延反応（60分値>30分値）は視床下部性を示唆",
      },
    ],
    normalInterpretation: "TRHに反応してTSHが上昇 → 下垂体は正常 → 原因は視床下部の可能性。",
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

  // ════════════════════════════════
  // 性腺軸
  // ════════════════════════════════
  {
    id: "gnrh-test",
    name: "GnRH（LH-RH）試験",
    tagline: "性腺機能低下症の原因を鑑別する",
    essence: "下垂体LH/FSH分泌能",
    color: "rose",
    category: "性腺軸",
    status: "available",
    what: "GnRHを投与して下垂体からのLH・FSH分泌能を評価する。性腺機能低下症が「下垂体性」か「視床下部性」かを鑑別する。",
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
        unit: "倍", threshold: "3", isNormalAbove: true,
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
      { time: "2分", action: "採血（C-peptide）", isKey: true },
      { time: "6分", action: "採血（C-peptide）", isKey: true },
    ],
    judgments: [
      {
        parameter: "C-peptide頂値（2 or 6分）",
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
      "6分値が2分値より高いことも多い → 必ず両方測定して頂値で評価",
      "空腹時C-peptide<0.1ng/mLなら試験不要（β細胞消失は明らか）",
    ],
    reportPhrase: "グルカゴン負荷試験でC-peptide頂値が ___ng/mL と【β細胞残存あり／なし】でした。",
    hormoneFlow: {
      axisKey: "Pancreas", highlightTarget: "beta_cell",
      mechanismLabel: "グルカゴンで膵β細胞を刺激して\nCペプチド（残存機能）を評価",
    },
  },
];
