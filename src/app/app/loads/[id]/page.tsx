import { notFound } from "next/navigation";
import { MOCK_LOADS } from "@/data/mock-loads";
import { LoadDetailClient } from "./load-detail-client";

// CCH-005: server wrapper — unknown load ids return a real HTTP 404 instead of a soft 200.
// Demo loads are a fixed mock set (store has no "add load"), so the server can validate ids.
export function generateStaticParams() {
  return MOCK_LOADS.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const load = MOCK_LOADS.find((l) => l.id === params.id);
  return { title: load ? `${load.ref} · Loads` : "Load not found" };
}

export default function LoadDetailPage({ params }: { params: { id: string } }) {
  const load = MOCK_LOADS.find((l) => l.id === params.id);
  if (!load) notFound();
  return <LoadDetailClient id={load.id} />;
}
