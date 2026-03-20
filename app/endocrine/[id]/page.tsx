import { notFound } from "next/navigation";
import { endocrineTests } from "@/data/endocrineTests";
import TestDetail from "@/components/endocrine/TestDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return endocrineTests
    .filter((t) => t.status === "available")
    .map((t) => ({ id: t.id }));
}

export default async function TestDetailPage({ params }: Props) {
  const { id } = await params;
  const test = endocrineTests.find((t) => t.id === id);

  if (!test || test.status !== "available") notFound();

  return <TestDetail test={test} />;
}
