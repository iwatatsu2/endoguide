// 無料ツール → 症例トレーニングへの入口（endoguide）。
// 対応する症例がある場所にだけ置く。タイトルは症例側の表記そのまま（~/Desktop/Claude-Projects/revenue-report/check_entries.py が照合・URLの200も確認）。
// utm: utm_source=endoguide / utm_medium=tool / utm_campaign=<場所>
export type TrainingCase = { app: 'dm' | 'endo'; title: string; free: boolean; url: string };

export const TRAINING_CASES: Record<string, TrainingCase> = {
  // クッシング症候群
  "cortisol-diurnal": {
    app: 'endo',
    title: "高血圧も糖尿も肥満も別々に治療中——幅広い赤紫の線条と立ち上がれない脚を、ひとつの病気として読めるか",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-cushing-45?utm_source=endoguide&utm_medium=tool&utm_campaign=test-cortisol-diurnal',
  },
  // クッシング症候群
  "dexamethasone-suppression": {
    app: 'endo',
    title: "高血圧も糖尿も肥満も別々に治療中——幅広い赤紫の線条と立ち上がれない脚を、ひとつの病気として読めるか",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-cushing-45?utm_source=endoguide&utm_medium=tool&utm_campaign=test-dexamethasone-suppression',
  },
  // クッシング症候群
  "high-dose-dst": {
    app: 'endo',
    title: "高血圧も糖尿も肥満も別々に治療中——幅広い赤紫の線条と立ち上がれない脚を、ひとつの病気として読めるか",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-cushing-45?utm_source=endoguide&utm_medium=tool&utm_campaign=test-high-dose-dst',
  },
  // クッシング症候群
  "24h-ufc": {
    app: 'endo',
    title: "高血圧も糖尿も肥満も別々に治療中——幅広い赤紫の線条と立ち上がれない脚を、ひとつの病気として読めるか",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-cushing-45?utm_source=endoguide&utm_medium=tool&utm_campaign=test-24h-ufc',
  },
  // クッシング症候群
  "crh-test": {
    app: 'endo',
    title: "高血圧も糖尿も肥満も別々に治療中——幅広い赤紫の線条と立ち上がれない脚を、ひとつの病気として読めるか",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-cushing-45?utm_source=endoguide&utm_medium=tool&utm_campaign=test-crh-test',
  },
  // クッシング症候群
  "ddavp-cushing": {
    app: 'endo',
    title: "高血圧も糖尿も肥満も別々に治療中——幅広い赤紫の線条と立ち上がれない脚を、ひとつの病気として読めるか",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-cushing-45?utm_source=endoguide&utm_medium=tool&utm_campaign=test-ddavp-cushing',
  },
  // 副腎不全・副腎クリーゼ
  "rapid-acth": {
    app: 'endo',
    title: "深夜、ステロイドを3日止めた関節リウマチの58歳がショックで運ばれてきた——採血は出していい、でも結果は待てるか？",
    free: true,
    url: 'https://endo-compass-training.vercel.app/case/endo-adrenal-crisis-58?utm_source=endoguide&utm_medium=tool&utm_campaign=test-rapid-acth',
  },
  // 褐色細胞腫
  "urine-metanephrine": {
    app: 'endo',
    title: "BP232/128で頭痛・動悸・大汗の45歳——頻脈を見てβ遮断に手が伸びる、その一手が血圧クリーゼを爆発させる",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-pheochromocytoma-crisis-45?utm_source=endoguide&utm_medium=tool&utm_campaign=test-urine-metanephrine',
  },
  // 原発性アルドステロン症
  "captopril-test": {
    app: 'endo',
    title: "薬を3剤足しても下がらない高血圧＋健診で低カリウム——『本態性』で片づける前にARRを測れるか",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-primary-aldosteronism-38?utm_source=endoguide&utm_medium=tool&utm_campaign=test-captopril-test',
  },
  // 原発性アルドステロン症
  "saline-infusion-pa": {
    app: 'endo',
    title: "薬を3剤足しても下がらない高血圧＋健診で低カリウム——『本態性』で片づける前にARRを測れるか",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-primary-aldosteronism-38?utm_source=endoguide&utm_medium=tool&utm_campaign=test-saline-infusion-pa',
  },
  // 先端巨大症
  "ogtt-gh": {
    app: 'endo',
    title: "『指輪がきつい、靴のサイズが上がった』——いびきと新規の糖尿病を別々に扱う前に、昔の写真と見比べられるか",
    free: false,
    url: 'https://endo-compass-training.vercel.app/case/endo-acromegaly-48?utm_source=endoguide&utm_medium=tool&utm_campaign=test-ogtt-gh',
  },
  // 75gOGTT → 妊娠糖尿病症例（DM）
  "ogtt-75g": {
    app: 'dm',
    title: "妊娠24週でひっかかった32歳——血糖の“合格ライン”が、昨日までと違う",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/dm-gdm-pregnancy-32?utm_source=endoguide&utm_medium=tool&utm_campaign=test-ogtt-75g',
  },
  // Cペプチド → 糖尿病の成因鑑別症例（DM）
  "glucagon-cpeptide": {
    app: 'dm',
    title: "口渇と体重減少5kgの42歳非肥満男性——「2型と決めつけない」タイプ診断",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/dm-type-dx-42?utm_source=endoguide&utm_medium=tool&utm_campaign=test-glucagon-cpeptide',
  },
  // インスリノーマ → 空腹時低血糖の鑑別症例（DM）
  "fasting-test-insulinoma": {
    app: 'dm',
    title: "糖尿病でもないのに朝ふらつく52歳——非糖尿病者の反復する空腹時低血糖を追う",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/dm-hypoglycemia-workup-52?utm_source=endoguide&utm_medium=tool&utm_campaign=test-fasting-test-insulinoma',
  },
  // インスリノーマ → 空腹時低血糖の鑑別症例（DM）
  "glucagon-insulinoma": {
    app: 'dm',
    title: "糖尿病でもないのに朝ふらつく52歳——非糖尿病者の反復する空腹時低血糖を追う",
    free: false,
    url: 'https://dm-compass-training.vercel.app/case/dm-hypoglycemia-workup-52?utm_source=endoguide&utm_medium=tool&utm_campaign=test-glucagon-insulinoma',
  },
};
