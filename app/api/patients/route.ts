import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(patients);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, weight } = body;

  if (!name || !weight) {
    return NextResponse.json({ error: "名前と体重は必須です" }, { status: 400 });
  }

  const patient = await prisma.patient.create({
    data: { name, weight: parseFloat(weight) },
  });
  return NextResponse.json(patient, { status: 201 });
}
