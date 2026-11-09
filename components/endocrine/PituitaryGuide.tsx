"use client";
import { useState } from "react";

type Disease = "先端巨大症" | "高PRL血症" | "クッシング病" | "前葉機能低下症" | "尿崩症" | "TSH産生腫瘍" | "偶発腫・卒中";

const DISEASES: Disease[] = ["先端巨大症", "高PRL血症", "クッシング病", "前葉機能低下症", "尿崩症", "TSH産生腫瘍", "偶発腫・卒中"];

export default function PituitaryGuide() {
  const [d, setD] = useState<Disease>("先端巨大症");

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 px-1">下垂体疾患の診断基準（厚労省 間脳下垂体機能障害調査研究班 診療ガイドライン2023年版の「診断の手引き」に準拠・要点）</p>

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
            <p>① 手足の容積の増大</p>
            <p>② 先端巨大症様顔貌（眉弓部の膨隆・鼻や口唇の肥大・下顎の突出など）</p>
            <p>③ 巨大舌</p>
          </Block>
          <Block tone="blue" title="Ⅱ 検査所見">
            <p>① GH分泌の過剰：<Em>75gOGTTでGHが正常域（底値 0.4 ng/mL未満）まで抑制されない</Em></p>
            <p>② 血中IGF-1の高値（健常者の年齢・性別基準値で判定）</p>
            <p>③ MRIまたはCTで下垂体腫瘍（腺腫）を認める</p>
            <p className="text-gray-500">GH値はキットごとの補正式（成長科学協会）で補正して判定</p>
          </Block>
          <Block tone="gray" title="Ⅲ 副症候・参考所見">
            <p>発汗過多・頭痛・視力/視野障害・月経異常・睡眠時無呼吸・耐糖能異常・高血圧・不正咬合・変形性関節症・手根管症候群・頭蓋骨/手足X線の異常（heel pad 22mm以上など）</p>
          </Block>
          <Verdict>
            <p><Em>確実例</Em>：Ⅰのいずれか ＋ Ⅱのすべて</p>
            <p className="text-gray-400 mt-1">OGTTでGHが正常域に抑制される・症候が軽微でも、IGF-1高値なら画像検査を行い総合的に診断（原典の附記）</p>
          </Verdict>
          <Point title="判定がずれる状況（原典の注）">
            <p><Em>GHが抑制されにくい（偽陽性）</Em>：糖尿病・肝疾患・腎疾患・甲状腺機能亢進症・褐色細胞腫・低栄養・思春期/青年期</p>
            <p><Em>IGF-1が高値を示さない（偽陰性）</Em>：栄養障害・肝疾患・腎疾患・甲状腺機能低下症・コントロール不良の糖尿病</p>
            <p>妊娠後期はhPLの影響でIGF-1が高値になりうる</p>
            <p className="text-gray-400">（参考・原典外）2024年国際コンセンサス：典型徴候＋IGF-1が基準上限の約1.3倍超ならOGTTは必須でない</p>
          </Point>
          <Block tone="green" title="治療効果の判定（原典）">
            <p><span className="text-green-300 font-semibold">手術の寛解</span>：IGF-1が年齢・性別基準範囲内 ＋ OGTTでGH底値 &lt;0.4 ng/mL ＋ 臨床的活動性なし（IGF-1は術後3〜6か月で判定）</p>
            <p><span className="text-green-300 font-semibold">薬物治療のコントロール良好</span>：IGF-1が基準範囲内 ＋ ランダムGH &lt;1 ng/mL ＋ 臨床的活動性なし</p>
            <p>ソマトスタチンアナログ治療中はOGTTを使わない／<Em>ペグビソマント中はGHが治療指標にならない</Em>（IGF-1で判定）</p>
            <p>第一選択は手術（経蝶形骨洞手術）</p>
          </Block>
        </div>
      )}

      {/* ── 高PRL血症 ── */}
      {d === "高PRL血症" && (
        <div className="space-y-3">
          <Block tone="pink" title="Ⅰ 主症候">
            <p><span className="text-pink-300 font-semibold">女性</span>：月経不順・無月経・不妊・乳汁分泌</p>
            <p><span className="text-pink-300 font-semibold">男性</span>：性欲低下・インポテンス・女性化乳房・乳汁分泌</p>
            <p><span className="text-pink-300 font-semibold">共通</span>：頭痛・視力視野障害（器質的視床下部・下垂体病変による）</p>
          </Block>
          <Block tone="blue" title="Ⅱ 検査所見">
            <p>血中PRLの上昇（睡眠・ストレス・性交・運動で上がるため<Em>複数回測定し、いずれも施設基準値以上</Em>を確認）</p>
          </Block>
          <Verdict>
            <p><Em>高PRL血症 確実例</Em>：Ⅰのいずれか ＋ Ⅱ</p>
            <p className="text-gray-400 mt-1">→ 次に原因を鑑別（下の順番で）</p>
          </Verdict>
          <Block tone="yellow" title="Ⅲ 原因の鑑別（この順番）">
            <p>1. <Em>薬剤</Em>（腫瘍以外で最多）：ドパミン受容体拮抗薬（メトクロプラミド等）・抗精神病薬（スルピリド・リスペリドン・オランザピン等）・抗うつ薬（三環系・SSRI）・α-メチルドパ・ベラパミル・H2遮断薬・エストロゲン製剤（経口避妊薬）・麻薬 → 可能なら2週間休薬して再検（抗精神病薬は処方医と相談）</p>
            <p>2. 原発性甲状腺機能低下症（FT4↓・TSH↑）</p>
            <p>3. 1・2を除外してからトルコ鞍部のMRI/CT</p>
            <p className="pl-3">異常あり：プロラクチノーマ（腫瘍の実質容積とPRL値がおおむね相関）／GH-PRL同時産生腫瘍／視床下部・下垂体茎病変（非機能性腫瘍・頭蓋咽頭腫・ラトケ嚢胞・下垂体炎など）</p>
            <p className="pl-3">異常なし：マクロプロラクチン血症・慢性腎不全・胸壁疾患 → 該当なければ視床下部の機能性異常</p>
          </Block>
          <Point title="測定の落とし穴">
            <p><Em>マクロプロラクチン血症</Em>：高PRL血症の15〜25%。症候はない。PEG法・ゲルろ過で証明</p>
            <p><Em>フック効果</Em>：マクロプロラクチノーマで見かけ上PRLが低く出る（大きい腫瘍なのにPRLが軽度高値なら希釈して再測定）</p>
            <p>治療：プロラクチノーマは薬物療法（カベルゴリン 週1回0.25mgから漸増・上限1mg/回）が基本</p>
          </Point>
        </div>
      )}

      {/* ── クッシング病 ── */}
      {d === "クッシング病" && (
        <div className="space-y-3">
          <Block tone="orange" title="Ⅰ 主症候（一つ以上）">
            <p><span className="text-orange-300 font-semibold">特異的</span>：満月様顔貌・中心性肥満または水牛様脂肪沈着・赤紫色皮膚線条（幅1cm以上）・皮膚の菲薄化と皮下溢血・近位筋萎縮による筋力低下・小児の肥満を伴う成長遅延</p>
            <p><span className="text-orange-300 font-semibold">非特異的</span>：高血圧・月経異常・座瘡・多毛・浮腫・耐糖能異常・骨粗鬆症・色素沈着・精神障害</p>
          </Block>
          <Block tone="blue" title="Ⅱ 検査所見">
            <p>① 血中ACTHとコルチゾール（早朝8〜10時・30分安静後に同時測定）がともに高値〜正常（ACTHが抑制されていない）</p>
            <p>② 24時間尿中遊離コルチゾールが高値（一般に <Em>70 μg/日以上</Em>／2022年4月からCLIA法で従来より幾分低値）</p>
          </Block>
          <Block tone="gray" title="Ⅲ スクリーニング検査">
            <p>① 一晩少量（<Em>0.5mg</Em>）デキサメタゾン抑制試験：翌朝コルチゾールが抑制されない（<Em>≥5 μg/dL でクッシング病を疑う</Em>、≥3 μg/dL でサブクリニカルを疑う）</p>
            <p>② 深夜睡眠時の血中コルチゾール <Em>≥5 μg/dL</Em>（周期性があるので可能なら複数日）</p>
            <p className="text-gray-400">（補助）DDAVP 4μg静注でACTHが前値の1.5倍以上 ※検査目的は保険適用外</p>
            <p className="text-gray-500">米国ガイドラインは1mg DSTでカットオフ1.8 μg/dL。CYP3A4誘導薬（リファンピシン・カルバマゼピン・フェニトイン）で偽陽性</p>
          </Block>
          <Block tone="purple" title="Ⅳ 確定診断検査（異所性ACTH症候群との鑑別）">
            <p>① CRH試験（100μg）：ACTH頂値が前値の<Em>1.5倍以上</Em></p>
            <p>② 一晩大量（8mg）デキサメタゾン抑制試験：コルチゾールが前値の<Em>半分以下</Em></p>
            <p>③ MRIで下垂体腫瘍（3テスラ推奨）</p>
            <p>④ 選択的下錐体静脈洞サンプリング：ACTHの中枢/末梢比 <Em>≥2（CRH刺激後 ≥3）</Em>。<span className="text-yellow-300">MRIで腫瘍を認めない時は必ず行う</span></p>
            <p className="text-gray-500">10mm以上の腫瘍・著明な高コルチゾール血症では①②が反応しないことあり</p>
          </Block>
          <Verdict>
            <p><Em>確実例</Em>：Ⅰのいずれか ＋ Ⅱ・Ⅲのすべて ＋〔Ⅳ①または②〕かつ〔Ⅳ③または④〕</p>
            <p className="mt-1">または Ⅰのいずれか ＋ Ⅱ・Ⅲのすべて ＋ 病理でACTH陽性／TPIT陽性</p>
            <p className="mt-1"><Em>疑い例</Em>：Ⅰのいずれか ＋ Ⅱ・Ⅲのすべて</p>
          </Verdict>
          <Point title="注意">
            <p>偽性クッシング（アルコール過量・CKD・うつ・高度肥満・コントロール不良糖尿病）の鑑別。IPSSでは区別できない</p>
            <p>高コルチゾール血症が重度なら確定診断検査より治療を優先</p>
          </Point>
        </div>
      )}

      {/* ── 前葉機能低下症 ── */}
      {d === "前葉機能低下症" && (
        <div className="space-y-3">
          <Block tone="red" title="ACTH分泌低下症">
            <p><span className="text-red-300 font-semibold">症候</span>：易疲労感・脱力感・食欲不振/体重減少・消化器症状・血圧低下・精神症状・発熱・低血糖症状・関節痛</p>
            <p>① 血中コルチゾール 正常低値〜低値</p>
            <p>② 尿中遊離コルチゾール 正常低値〜低値</p>
            <p>③ 血中ACTHは高値ではない（10 pg/mL以下が多いが、正常〜軽度高値の例もある）</p>
            <p>④ CRH試験・ITT（血糖45 mg/dL以下で有効刺激）でACTH・コルチゾールが低〜無反応（<Em>コルチゾール反応 &lt;18 μg/dL</Em> で反応不良を疑う）</p>
            <p>⑤ 迅速ACTH試験（250μg）でコルチゾールは低反応が多い</p>
            <p className="text-green-300">確実例：症候1つ以上 ＋ ①〜④（⑤があればより確実）</p>
            <p className="text-gray-500">除外：グルココルチコイド使用（内服・注射・外用・吸入・点眼・関節内）。原因として免疫チェックポイント阻害薬が増加</p>
          </Block>
          <Block tone="teal" title="TSH分泌低下症（中枢性甲状腺機能低下症）">
            <p><span className="text-teal-300 font-semibold">症候</span>：耐寒能低下・不活発・皮膚乾燥・徐脈・脱毛・発育障害</p>
            <p>① 甲状腺ホルモン（特にFT4）低値</p>
            <p>② <Em>TSHは低値〜軽度高値</Em>（腫瘍性では基準値内が多い＝TSHだけ見ると見逃す）</p>
            <p>③ 間脳下垂体の器質性疾患・頭蓋内疾患の既往/治療歴・周産期異常</p>
            <p>④ TRH試験でTSHが低〜無反応、または遷延/遅延反応</p>
            <p className="text-green-300">確実例：症候1つ以上 ＋ ①②③、または 症候1つ以上 ＋ ①② ＋ ④（ほぼ確実例：①②）</p>
            <p className="text-gray-500">非甲状腺疾患（low T3症候群）を除外</p>
          </Block>
          <Block tone="indigo" title="ゴナドトロピン分泌低下症">
            <p><span className="text-indigo-300 font-semibold">症候</span>：二次性徴の欠如（男子15歳以上・女子14歳以上）/進行停止・月経異常・性欲低下/ED/不妊・陰毛腋毛の脱落/性器萎縮</p>
            <p>① LH・FSHは高値ではない ② LHRH等の刺激試験で低〜無反応 ③ 性ホルモン低値</p>
            <p className="text-green-300">確実例：症候のいずれか ＋ ①〜③すべて</p>
            <p className="text-gray-500">除外：薬剤・高度肥満・神経性やせ症</p>
          </Block>
          <Block tone="sky" title="成人GH分泌不全症">
            <p>前提：小児期発症（成長障害）または頭蓋内器質性疾患の合併/既往/治療歴・周産期異常</p>
            <p>GH頂値：<Em>ITT・アルギニン・グルカゴン ≤3 ng/mL</Em>／<Em>GHRP-2 ≤9 ng/mL</Em></p>
            <p><span className="text-sky-300 font-semibold">重症</span>（GH補充の保険適用）：ITT等 <Em>≤1.8 ng/mL</Em>（GHRP-2は ≤9）</p>
            <p>原則2種類の試験で基準を満たす。器質性疾患等があり、GHを含め複数の下垂体ホルモン分泌低下があれば1種類で可</p>
            <p className="text-gray-500">まずITTかGHRP-2。ITTは虚血性心疾患・痙攣発作で禁忌。甲状腺機能低下・高齢・肥満などで偽性低反応</p>
          </Block>
          <Block tone="pink" title="PRL分泌低下症">
            <p>産褥期の乳汁分泌低下 ＋ PRL基礎値低下（複数回）＋ TRH試験でPRL低〜無反応</p>
          </Block>
          <Point title="補充の順番（最重要）">
            <p><Em>ACTH欠損があれば、甲状腺ホルモンより先にヒドロコルチゾンを開始</Em>（逆だと副腎クリーゼを誘発）</p>
            <p>副腎不全の症状が明らかなら検査より治療を優先</p>
          </Point>
        </div>
      )}

      {/* ── 尿崩症 ── */}
      {d === "尿崩症" && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 px-1">原典の名称は「バソプレシン分泌低下症（中枢性尿崩症）」。学会は「AVP欠乏症」への名称変更を提唱</p>
          <Block tone="cyan" title="Ⅰ 主症候">
            <p>① 口渇 ② 多飲 ③ 多尿</p>
          </Block>
          <Block tone="blue" title="Ⅱ 検査所見">
            <p>① 尿量：成人 <Em>≥3,000 mL/日 または ≥40 mL/kg</Em>（小児 ≥2,000 mL/m²）</p>
            <p>② 尿浸透圧 <Em>≤300 mOsm/kg</Em></p>
            <p>③ 高張食塩水負荷（5%・0.05 mL/kg/分・120分）で血漿浸透圧が高くてもAVP分泌が低下（Na–AVP回帰直線の傾き &lt;0.1、またはNa 149 mEq/L時の推定AVP &lt;1.0 pg/mL）</p>
            <p>④ 水制限試験（体重3%減少または6.5時間で終了）でも尿浸透圧が300 mOsm/kgを超えない</p>
            <p>⑤ バソプレシン負荷（ピトレシン5単位皮下注）で尿量が減り、尿浸透圧 ≥300 mOsm/kg に上昇<span className="text-gray-500">（水制限試験の後に行う。デスモプレシンでの代用は水中毒の危険があり推奨されない）</span></p>
          </Block>
          <Block tone="gray" title="Ⅲ 参考所見">
            <p>血清Naは正常上限か、やや上回ることが多い</p>
            <p>MRI T1強調で下垂体後葉の輝度低下（高齢者は尿崩症でなくても低下しうる）</p>
          </Block>
          <Verdict>
            <p><Em>確実例</Em>：Ⅰのすべて ＋〔Ⅱ①②③〕または〔Ⅱ①②④⑤〕</p>
            <p className="text-yellow-300 mt-1">⚠️ 著明な脱水（Na ≥150 mEq/Lなど）では高張食塩水負荷・水制限を行わない。尿量が非常に多い（10,000 mL/日など）時は高張食塩水負荷を優先</p>
          </Verdict>
          <div className="rounded-xl border border-gray-700 bg-gray-800/40 p-3 text-xs">
            <p className="font-bold text-white mb-2">多尿の鑑別</p>
            <div className="grid grid-cols-3 gap-2">
              <Mini title="中枢性尿崩症" tone="text-cyan-300" lines={["高張食塩水でAVP↑なし", "バソプレシンで尿濃縮↑"]} />
              <Mini title="腎性尿崩症" tone="text-yellow-300" lines={["バソプレシンに無反応", "リチウム・高Ca・低K・腎疾患"]} />
              <Mini title="心因性多飲" tone="text-gray-300" lines={["高張食塩水でAVP↑", "水制限で尿濃縮↑"]} />
            </div>
          </div>
          <Point title="治療の注意">
            <p>デスモプレシン開始後は<Em>水中毒・低Na血症</Em>に注意（飲水指導と血清Naフォロー）</p>
          </Point>
        </div>
      )}

      {/* ── TSH産生腫瘍 ── */}
      {d === "TSH産生腫瘍" && (
        <div className="space-y-3">
          <Block tone="teal" title="Ⅰ 主症候">
            <p>① 甲状腺中毒症状（動悸・頻脈・発汗増加・体重減少／軽微〜中等症が多い）</p>
            <p>② びまん性甲状腺腫大</p>
            <p>③ 腫瘍による症状（頭痛・視野障害）</p>
          </Block>
          <Block tone="blue" title="Ⅱ 検査所見">
            <p>① <Em>FT4高値にもかかわらずTSHは正常値〜軽度高値</Em>（SITSH）</p>
            <p>② 画像で下垂体腫瘍</p>
            <p>③ 摘出腫瘍の免疫染色でTSHβまたはTSH陽性</p>
          </Block>
          <Block tone="gray" title="Ⅲ 参考所見">
            <p>TRH試験でTSHは無〜低反応（頂値が前値の<Em>2倍以下</Em>）の例が多い</p>
            <p>GH・PRLの同時過剰、他の前葉ホルモン低下を伴うことがある</p>
          </Block>
          <Verdict>
            <p><Em>確実例</Em>：Ⅰのいずれか ＋ Ⅱのすべて</p>
            <p className="mt-1"><Em>ほぼ確実例</Em>：Ⅰのいずれか ＋ Ⅱ①②</p>
            <p className="text-gray-400 mt-1">鑑別：甲状腺ホルモン不応症</p>
          </Verdict>
          <Point title="見かけ上のSITSH・不応症との鑑別">
            <p>家族性異常アルブミン性高サイロキシン血症・抗T4/T3抗体・異種抗体（抗マウスIgG抗体など）・アミオダロン内服</p>
            <p>不応症はTHRβ遺伝子診断が役立つが、<Em>既知の変異がない不応症</Em>や、<Em>非機能性下垂体腫瘍を偶然合併する不応症</Em>もあり鑑別は容易でない</p>
          </Point>
        </div>
      )}

      {/* ── 偶発腫・下垂体卒中 ── */}
      {d === "偶発腫・卒中" && (
        <div className="space-y-3">
          <Block tone="gray" title="下垂体偶発腫（インシデンタローマ）">
            <p><span className="text-white font-semibold">内分泌検査</span>（早朝空腹時の基礎値）：GH・IGF-1・PRL・TSH・FT4・ACTH・コルチゾール・LH・FSH・テストステロン（男）/E2（女）→ 必要時に負荷試験</p>
            <p><span className="text-white font-semibold">眼科的検査</span>で視機能障害の有無</p>
            <p><span className="text-white font-semibold">非機能性の方針</span>：視神経・視交叉の圧迫＋視機能障害 → 手術推奨／接触・圧迫だが障害なし → 相対的手術適応／海綿静脈洞・蝶形骨洞への浸潤や増大、下垂体機能低下症がある例は年齢などを考慮して手術を提案／それ以外は原則経過観察</p>
            <p><span className="text-white font-semibold">経過観察</span>：3か月後 → その6か月後 → 以後1年ごとにMRIとホルモン基礎値。増大が明らかなら手術を考慮</p>
          </Block>
          <Block tone="red" title="下垂体卒中（救急）">
            <p><span className="text-red-300 font-semibold">症候</span>：突然の激しい頭痛・視力/視野障害・眼球運動障害（複視・眼瞼下垂）・嘔吐・意識障害</p>
            <p><span className="text-red-300 font-semibold">画像</span>：MRI（腺腫内の出血・梗塞）</p>
            <p><Em>急性副腎不全を想定し、採血後すぐにヒドロコルチゾンを投与（結果を待たない）</Em></p>
            <p>視力低下・意識障害が進む例は脳神経外科と緊急減圧を検討</p>
            <p className="text-gray-500">※ 下垂体卒中は原典に独立した診断の手引きはない（一般的な対応）</p>
          </Block>
        </div>
      )}

      <div className="rounded-xl bg-gray-900/60 border border-gray-800 p-3 text-xs text-gray-500 space-y-1">
        <p>出典：厚生労働科学研究費補助金 間脳下垂体機能障害に関する調査研究班『間脳下垂体機能障害と先天性腎性尿崩症および関連疾患の診療ガイドライン2023年版』（日本内分泌学会雑誌 Vol.99 Suppl. 2023）。「原典外」と記した項目のみ他資料（Acromegaly国際コンセンサス2024など）。</p>
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
