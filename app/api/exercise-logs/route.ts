import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const patientId = searchParams.get("patientId");

  if (!patientId) {
    return NextResponse.json({ error: "patientIdが必要です" }, { status: 400 });
  }

  const logs = await prisma.exerciseLog.findMany({
    where: { patientId },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(logs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { patientId, date, exerciseType, duration, steps, sets, achieved, note } = body;

  if (!patientId || !date || !exerciseType) {
    return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
  }

  const log = await prisma.exerciseLog.create({
    data: {
      patientId,
      date: new Date(date),
      exerciseType,
      duration: duration ? parseInt(duration) : null,
      steps: steps ? parseInt(steps) : null,
      sets: sets ? parseInt(sets) : null,
      achieved: achieved ?? false,
      note: note ?? null,
    },
  });
  return NextResponse.json(log, { status: 201 });
}
