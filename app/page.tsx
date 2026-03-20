"use client";

import { useState, useEffect } from "react";
import PatientForm from "@/components/PatientForm";
import PatientList from "@/components/PatientList";
import ExerciseDashboard from "@/components/ExerciseDashboard";

type Patient = {
  id: string;
  name: string;
  weight: number;
  createdAt: string;
};

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(data);
  }

  async function handleAddPatient(name: string, weight: number) {
    await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, weight }),
    });
    setShowForm(false);
    fetchPatients();
  }

  async function handleDeletePatient(id: string) {
    await fetch(`/api/patients/${id}`, { method: "DELETE" });
    fetchPatients();
  }

  if (selectedPatient) {
    return (
      <ExerciseDashboard
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-700 text-white px-4 py-4">
        <h1 className="text-xl font-bold">糖尿病運動療法サポート</h1>
        <p className="text-blue-200 text-sm">佐藤祐造マニュアル準拠</p>
      </header>

      <main className="max-w-lg mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-700">患者一覧</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            ＋ 患者登録
          </button>
        </div>

        {showForm && (
          <PatientForm
            onSubmit={handleAddPatient}
            onCancel={() => setShowForm(false)}
          />
        )}

        <PatientList
          patients={patients}
          onSelect={setSelectedPatient}
          onDelete={handleDeletePatient}
        />
      </main>
    </div>
  );
}
