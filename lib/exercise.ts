// 佐藤祐造「糖尿病運動療法指導マニュアル」準拠
// 歩行10000歩の消費カロリー: 体重(kg) × 5.25 kcal (近似値)
// ステップ運動: 6 METs
// バイク: 4 METs

export function calcCalories10000Steps(weight: number): number {
  return Math.round(weight * 5.25);
}

// 必要運動時間(分) = 消費カロリー / (METs × 体重) × 60
export function calcExerciseMinutes(weight: number, mets: number): number {
  const calories = calcCalories10000Steps(weight);
  return Math.round((calories / (mets * weight)) * 60);
}

export function calcGoals(weight: number) {
  const calories = calcCalories10000Steps(weight);
  const stepMinutes = calcExerciseMinutes(weight, 6); // ステップ運動6METs
  const bikeMinutes = calcExerciseMinutes(weight, 4); // バイク4METs

  return {
    calories,
    walking: {
      type: "WALKING" as const,
      label: "歩行",
      target: 10000,
      unit: "歩",
      mets: 3,
    },
    step: {
      type: "STEP" as const,
      label: "ステップ運動",
      totalMinutes: stepMinutes,
      setsMinutes: Math.ceil(stepMinutes / 3), // 3セット分割
      sets: 3,
      unit: "分 × 3回",
      mets: 6,
    },
    bike: {
      type: "BIKE" as const,
      label: "バイク",
      totalMinutes: bikeMinutes,
      setsMinutes: Math.ceil(bikeMinutes / 3), // 3セット分割
      sets: 3,
      unit: "分 × 3回",
      mets: 4,
    },
  };
}
