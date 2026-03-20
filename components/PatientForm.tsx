"use client";

import { useState } from "react";

type Props = {
  onSubmit: (name: string, weight: number) => void;
  onCancel: () => void;
};

export default function PatientForm({ onSubmit, onCancel }: Props) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !weight) return;
    onSubmit(name, parseFloat(weight));
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h3 className="font-bold text-gray-700 mb-3">患者登録</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">患者名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: 山田 太郎"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">体重 (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="例: 65"
            min="30"
            max="200"
            step="0.1"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
          >
            登録
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
