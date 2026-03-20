"use client";

type Patient = {
  id: string;
  name: string;
  weight: number;
  createdAt: string;
};

type Props = {
  patients: Patient[];
  onSelect: (patient: Patient) => void;
  onDelete: (id: string) => void;
};

export default function PatientList({ patients, onSelect, onDelete }: Props) {
  if (patients.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-2">🏃</p>
        <p>患者が登録されていません</p>
        <p className="text-sm">「患者登録」から追加してください</p>
      </div>
    );
  }

  function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    if (confirm("この患者を削除しますか？\n運動記録もすべて削除されます。")) {
      onDelete(id);
    }
  }

  return (
    <div className="space-y-3">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="bg-white rounded-xl shadow flex items-center"
        >
          <button
            onClick={() => onSelect(patient)}
            className="flex-1 p-4 text-left flex items-center justify-between hover:bg-blue-50 rounded-l-xl transition-colors"
          >
            <div>
              <p className="font-bold text-gray-800">{patient.name}</p>
              <p className="text-sm text-gray-500">体重: {patient.weight} kg</p>
            </div>
            <span className="text-blue-500 text-xl">›</span>
          </button>
          <button
            onClick={(e) => handleDelete(e, patient.id)}
            className="px-4 py-4 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-r-xl transition-colors text-xl"
            title="削除"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}
