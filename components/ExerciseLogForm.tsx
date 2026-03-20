"use client";

import { useState } from "react";

type Goals = {
  step: { setsMinutes: number; sets: number; totalMinutes: number };
  bike: { setsMinutes: number; sets: number; totalMinutes: number };
};

type Props = {
  goals: Goals;
  onSubmit: (log: {
    exerciseType: string;
    duration?: number;
    steps?: number;
    sets?: number;
    achieved: boolean;
    note?: string;
  }) => void;
  onCancel: () => void;
};

export default function ExerciseLogForm({ goals, onSubmit, onCancel }: Props) {
  const [exerciseType, setExerciseType] = useState("WALKING");
  const [steps, setSteps] = useState("");
  const [duration, setDuration] = useState("");
  const [sets, setSets] = useState("3");

  function calcAchieved(): boolean {
    if (exerciseType === "WALKING") {
      return parseInt(steps) >= 10000;
    } else if (exerciseType === "STEP") {
      return parseInt(duration) >= goals.step.setsMinutes && parseInt(sets) >= goals.step.sets;
    } else {
      return parseInt(duration) >= goals.bike.setsMinutes && parseInt(sets) >= goals.bike.sets;
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const achieved = calcAchieved();
    onSubmit({
      exerciseType,
      steps: exerciseType === "WALKING" ? parseInt(steps) : undefined,
      duration: exerciseType !== "WALKING" ? parseInt(duration) : undefined,
      sets: exerciseType !== "WALKING" ? parseInt(sets) : undefined,
      achieved,
    });
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-bold text-gray-700 mb-4">運動記録</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 種目選択 */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">運動の種類</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "WALKING", label: "🚶 歩行", desc: "1万歩" },
              { value: "STEP", label: "🪜 ステップ", desc: `${goals.step.setsMinutes}分×3` },
              { value: "BIKE", label: "🚴 バイク", desc: `${goals.bike.setsMinutes}分×3` },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setExerciseType(opt.value)}
                className={`p-2 rounded-lg border text-center text-sm ${
                  exerciseType === opt.value
                    ? "border-blue-500 bg-blue-50 text-blue-700 font-bold"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                <div>{opt.label}</div>
                <div className="text-xs text-gray-400">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 歩数入力 */}
        {exerciseType === "WALKING" && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">歩数</label>
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              placeholder="例: 8500"
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        )}

        {/* 時間・セット入力 */}
        {exerciseType !== "WALKING" && (
          <>
            <div>
              <label className="block text-sm text-gray-600 mb-1">1セットの時間 (分)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder={exerciseType === "STEP" ? `目標: ${goals.step.setsMinutes}分` : `目標: ${goals.bike.setsMinutes}分`}
                min="1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">セット数</label>
              <input
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                placeholder="目標: 3回"
                min="1"
                max="10"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
          >
            記録する
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}
