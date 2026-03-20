export type AxisType = "HPA" | "HPT";
export type HighlightTarget =
  | "adrenal"
  | "pituitary"
  | "hypothalamus"
  | "feedback"
  | "thyroid";

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
  isNormalAbove: boolean; // true = ≥threshold が正常
  normalLabel: string;
  abnormalLabel: string;
  note?: string;
}

export interface HormoneFlowConfig {
  axis: AxisType;
  highlightTarget: HighlightTarget;
  mechanismLabel: string; // 「ここを評価」の説明
}

export interface EndocrineTest {
  id: string;
  name: string;
  tagline: string;       // 1行エッセンス（@educator）
  essence: string;       // ひとことで何を見るか（例：「副腎の応答力」）
  color: string;
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
  pitfalls: string[];    // 誤りやすいポイント（@medical）
  reportPhrase: string;
  hormoneFlow: HormoneFlowConfig;
}

export const endocrineTests: EndocrineTest[] = [
  {
    id: "rapid-acth",
    name: "迅速ACTH試験",
    tagline: "副腎の予備能を直接確かめる",
    essence: "副腎の応答力",
    color: "blue",
    status: "available",

    what: "外からACTHを投与して、副腎皮質がコルチゾールを十分に産生できるかを確認する。視床下部・下垂体をバイパスして副腎を直接刺激する。",

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
      {
        time: "0分",
        action: "採血（コルチゾール・ACTH・電解質）",
        isKey: true,
      },
      {
        time: "0分",
        action: "テトラコサクチド 250 μg を静注（または筋注）",
        isKey: true,
        note: "コートロシン®",
      },
      { time: "30分", action: "採血（コルチゾール）", isKey: true },
      { time: "60分", action: "採血（コルチゾール）", isKey: true },
    ],

    judgments: [
      {
        parameter: "コルチゾール頂値（30 or 60分）",
        unit: "μg/dL",
        threshold: "18",
        isNormalAbove: true,
        normalLabel: "正常（副腎不全なし）",
        abnormalLabel: "副腎不全疑い",
        note: "施設によっては ≥500 nmol/L を採用",
      },
    ],

    normalInterpretation:
      "ACTHに反応してコルチゾールが十分上昇 → 副腎皮質は正常に機能している。",
    abnormalInterpretation:
      "上昇不十分 → 一次性副腎不全（副腎そのものの問題）、または長期ACTH低下による二次性副腎不全を疑う。",

    cautions: [
      "アナフィラキシー（稀・0.5%以下）→ エピネフリン・抗ヒスタミン薬を準備",
      "重篤な副腎不全が疑われる場合はヒドロコルチゾン投与を優先し検査は後回し",
      "採血時刻と検体ラベルを必ず確認",
    ],
    contraindications: ["テトラコサクチドへの既知のアレルギー"],
    stopCriteria: [
      "蕁麻疹・血圧低下・呼吸困難 → 直ちに中止しアナフィラキシー対応",
    ],
    pitfalls: [
      "30分値が低くても60分値が≥18なら正常 — 頂値で判定する",
      "この試験は二次性副腎不全の除外には不十分（感度低）",
      "ステロイドをすでに投与している場合は結果が偽正常になりうる",
    ],

    reportPhrase:
      "ACTH試験でコルチゾール頂値が ___μg/dL と【正常反応／反応不良】でした。",

    hormoneFlow: {
      axis: "HPA",
      highlightTarget: "adrenal",
      mechanismLabel: "副腎に直接ACTHを投与して\n副腎の反応を評価",
    },
  },

  {
    id: "dexamethasone-suppression",
    name: "デキサメタゾン抑制試験",
    tagline: "コルチゾールの自律分泌を見抜く",
    essence: "フィードバック制御の正常性",
    color: "violet",
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
      {
        time: "前日 23:00",
        action: "デキサメタゾン 1 mg 内服",
        isKey: true,
        note: "患者自身が内服 → 確認が重要",
      },
      {
        time: "翌朝 8:00",
        action: "コルチゾール採血（ACTH同時採血も可）",
        isKey: true,
      },
    ],

    judgments: [
      {
        parameter: "翌朝コルチゾール",
        unit: "μg/dL",
        threshold: "1.8",
        isNormalAbove: false,
        normalLabel: "正常（抑制あり）",
        abnormalLabel: "抑制不十分 → クッシング疑い",
        note: "感度高・特異度低。偽陽性多い → 陽性なら精密検査へ",
      },
    ],

    normalInterpretation:
      "DEXのフィードバックが正常に効き、ACTH分泌↓ → コルチゾール↓。クッシング症候群は否定的。",
    abnormalInterpretation:
      "フィードバックが効かずコルチゾールが抑制されない → 自律分泌を疑い、UFC・深夜唾液コルチゾール・2日法などで確定診断へ。",

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

    reportPhrase:
      "デキサメタゾン抑制試験でコルチゾールが ___μg/dL と【抑制あり／抑制不十分】でした。",

    hormoneFlow: {
      axis: "HPA",
      highlightTarget: "feedback",
      mechanismLabel: "DEXがフィードバックを模倣\n→ 正常なら抑制される経路を評価",
    },
  },

  {
    id: "crh-test",
    name: "CRH試験",
    tagline: "下垂体がCRHに反応できるかを確認する",
    essence: "下垂体の応答力",
    color: "teal",
    status: "coming-soon",
    what: "",
    indications: [],
    preparations: [],
    timeline: [],
    judgments: [],
    normalInterpretation: "",
    abnormalInterpretation: "",
    cautions: [],
    contraindications: [],
    pitfalls: [],
    reportPhrase: "",
    hormoneFlow: { axis: "HPA", highlightTarget: "pituitary", mechanismLabel: "" },
  },

  {
    id: "insulin-hypoglycemia",
    name: "インスリン低血糖試験",
    tagline: "視床下部の緊急反応を総合評価する",
    essence: "視床下部の危機対応能力",
    color: "red",
    status: "coming-soon",
    what: "",
    indications: [],
    preparations: [],
    timeline: [],
    judgments: [],
    normalInterpretation: "",
    abnormalInterpretation: "",
    cautions: [],
    contraindications: [],
    pitfalls: [],
    reportPhrase: "",
    hormoneFlow: { axis: "HPA", highlightTarget: "hypothalamus", mechanismLabel: "" },
  },

  {
    id: "trh-test",
    name: "TRH試験",
    tagline: "TSH分泌能（下垂体甲状腺軸）を評価する",
    essence: "下垂体TSH分泌能",
    color: "emerald",
    status: "coming-soon",
    what: "",
    indications: [],
    preparations: [],
    timeline: [],
    judgments: [],
    normalInterpretation: "",
    abnormalInterpretation: "",
    cautions: [],
    contraindications: [],
    pitfalls: [],
    reportPhrase: "",
    hormoneFlow: { axis: "HPT", highlightTarget: "pituitary", mechanismLabel: "" },
  },
];
