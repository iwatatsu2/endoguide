"use client";

import { useState, useEffect } from "react";
import { calcGoals } from "@/lib/exercise";
import ExerciseLogForm from "@/components/ExerciseLogForm";
import ExerciseHistory from "@/components/ExerciseHistory";

type Patient = {
  id: string;
  name: string;
  weight: number;
};

type ExerciseLog = {
  id: string;
  date: string;
  exerciseType: string;
  duration: number | null;
  steps: number | null;
  sets: number | null;
  achieved: boolean;
  note: string | null;
};

type Props = {
  patient: Patient;
  onBack: () => void;
};

export default function ExerciseDashboard({ patient, onBack }: Props) {
  const [logs, setLogs] = useState<ExerciseLog[]>([]);
  const [showForm, setShowForm] = useState(false);
  const goals = calcGoals(patient.weight);

  useEffect(() => {
    fetchLogs();
  }, [patient.id]);

  async function fetchLogs() {
    const res = await fetch(`/api/exercise-logs?patientId=${patient.id}`);
    const data = await res.json();
    setLogs(data);
  }

  async function handleAddLog(log: {
    exerciseType: string;
    duration?: number;
    steps?: number;
    sets?: number;
    achieved: boolean;
    note?: string;
  }) {
    await fetch("/api/exercise-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: patient.id,
        date: new Date().toISOString(),
        ...log,
      }),
    });
    setShowForm(false);
    fetchLogs();
  }

  const todayLogs = logs.filter((l) => {
    const today = new Date().toDateString();
    return new Date(l.date).toDateString() === today;
  });
  const todayAchieved = todayLogs.some((l) => l.achieved);

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-700 text-white px-4 py-4">
        <button onClick={onBack} className="text-blue-200 text-sm mb-1">
          ← 患者一覧
        </button>
        <h1 className="text-xl font-bold">{patient.name} さん</h1>
        <p className="text-blue-200 text-sm">体重: {patient.weight} kg</p>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-4">
        {/* 今日の状況 */}
        <div className={`rounded-xl shadow p-4 text-center ${todayAchieved ? "bg-green-100 border-2 border-green-400" : "bg-white"}`}>
          <p className="text-3xl mb-1">{todayAchieved ? "✅" : "🎯"}</p>
          <p className="font-bold text-lg text-gray-700">
            {todayAchieved ? "今日の目標達成！" : "今日の運動を記録しよう"}
          </p>
          <p className="text-gray-500 text-sm">
            1日1万歩相当の運動を目標にしましょう
          </p>
        </div>

        {/* 運動目標カード */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold text-gray-700 mb-3">
            個別目標 <span className="text-blue-500 text-sm font-normal">（体重 {patient.weight}kg 基準）</span>
          </h2>
          <p className="text-xs text-gray-400 mb-3">
            消費カロリー目標: {goals.calories} kcal（1万歩相当）
          </p>
          <div className="space-y-3">
            <GoalCard
              emoji="🚶"
              label="① 歩行"
              description="1万歩"
              mets={3}
              highlight
            />
            <GoalCard
              emoji="🪜"
              label="② ステップ運動"
              description={`${goals.step.setsMinutes}分 × ${goals.step.sets}回 = ${goals.step.totalMinutes}分`}
              mets={6}
            />
            <GoalCard
              emoji="🚴"
              label="③ バイク"
              description={`${goals.bike.setsMinutes}分 × ${goals.bike.sets}回 = ${goals.bike.totalMinutes}分`}
              mets={4}
            />
          </div>
          <p className="text-xs text-gray-400 mt-3">
            ①②③のいずれか1つを達成で目標クリア
          </p>
        </div>

        {/* 記録ボタン */}
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg shadow"
        >
          ＋ 運動を記録する
        </button>

        {showForm && (
          <ExerciseLogForm
            goals={goals}
            onSubmit={handleAddLog}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* 履歴 */}
        <ExerciseHistory logs={logs} />
      </main>
    </div>
  );
}

function GoalCard({
  emoji,
  label,
  description,
  mets,
  highlight,
}: {
  emoji: string;
  label: string;
  description: string;
  mets: number;
  highlight?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg ${highlight ? "bg-blue-50" : "bg-gray-50"}`}>
      <span className="text-2xl">{emoji}</span>
      <div className="flex-1">
        <p className="font-bold text-gray-700 text-sm">{label}</p>
        <p className="text-blue-600 font-medium">{description}</p>
      </div>
      <span className="text-xs text-gray-400">{mets} METs</span>
    </div>
  );
}
