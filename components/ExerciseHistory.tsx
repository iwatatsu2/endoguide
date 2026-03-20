"use client";

type ExerciseLog = {
  id: string;
  date: string;
  exerciseType: string;
  duration: number | null;
  steps: number | null;
  sets: number | null;
  achieved: boolean;
};

type Props = {
  logs: ExerciseLog[];
};

const TYPE_LABEL: Record<string, string> = {
  WALKING: "🚶 歩行",
  STEP: "🪜 ステップ運動",
  BIKE: "🚴 バイク",
};

function formatLog(log: ExerciseLog): string {
  if (log.exerciseType === "WALKING") {
    return `${log.steps?.toLocaleString() ?? "-"} 歩`;
  }
  return `${log.duration}分 × ${log.sets}回`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}（${["日","月","火","水","木","金","土"][d.getDay()]}）`;
}

// 直近14日間の達成状況を集計
function buildWeeklyStats(logs: ExerciseLog[]) {
  const stats: { date: string; achieved: boolean }[] = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toDateString();
    const dayLogs = logs.filter((l) => new Date(l.date).toDateString() === dateStr);
    stats.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      achieved: dayLogs.some((l) => l.achieved),
    });
  }
  return stats;
}

export default function ExerciseHistory({ logs }: Props) {
  const weeklyStats = buildWeeklyStats(logs);
  const achievedCount = weeklyStats.filter((s) => s.achieved).length;

  return (
    <div className="space-y-4">
      {/* 2週間の達成カレンダー */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-bold text-gray-700 mb-3">
          直近14日間 <span className="text-green-600">{achievedCount}/14日 達成</span>
        </h3>
        <div className="grid grid-cols-7 gap-1">
          {weeklyStats.map((s, i) => (
            <div key={i} className="text-center">
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs ${
                s.achieved ? "bg-green-400 text-white" : "bg-gray-100 text-gray-400"
              }`}>
                {s.achieved ? "✓" : ""}
              </div>
              <div className="text-xs text-gray-400 mt-1">{s.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 記録一覧 */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-bold text-gray-700 mb-3">記録履歴</h3>
        {logs.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">記録がありません</p>
        ) : (
          <div className="space-y-2">
            {logs.slice(0, 20).map((log) => (
              <div key={log.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-700">{TYPE_LABEL[log.exerciseType]}</p>
                  <p className="text-xs text-gray-400">{formatDate(log.date)} · {formatLog(log)}</p>
                </div>
                <span className={`text-sm font-bold ${log.achieved ? "text-green-500" : "text-gray-300"}`}>
                  {log.achieved ? "✅" : "未達成"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
