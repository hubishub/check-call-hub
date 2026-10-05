"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RiskBadge, StatusBadge } from "@/components/ui/badges";
import { formatWhen } from "@/lib/utils";
import type { RiskLevel } from "@/lib/types";
import { useHubStore } from "@/store/hub-store";

const riskOrder: Record<RiskLevel, number> = {
  critical: 0,
  high: 1,
  watch: 2,
  low: 3,
};

const filters: { id: RiskLevel | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "critical", label: "Critical" },
  { id: "high", label: "High" },
  { id: "watch", label: "Watch" },
  { id: "low", label: "Low" },
];

export default function QueuePage() {
  const loads = useHubStore((s) => s.loads);
  const checkCalls = useHubStore((s) => s.checkCalls);
  const [riskFilter, setRiskFilter] = useState<RiskLevel | "all">("all");
  const [statusOnlyActive, setStatusOnlyActive] = useState(true);

  const queue = useMemo(() => {
    return loads
      .filter((l) => (riskFilter === "all" ? true : l.risk === riskFilter))
      .filter((l) => (statusOnlyActive ? l.status !== "delivered" : true))
      .slice()
      .sort((a, b) => riskOrder[a.risk] - riskOrder[b.risk]);
  }, [loads, riskFilter, statusOnlyActive]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Check-call queue</h1>
          <p className="mt-1 text-sm text-fg-muted">
            Prioritized by risk window — work critical and high first.
          </p>
        </div>
        <Link
          href="/app/log"
          className="rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white dark:bg-teal-800"
        >
          Log a call
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label="Risk filters">
        {filters.map((f) => {
          const active = riskFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setRiskFilter(f.id)}
              className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active
                  ? "bg-teal-700 text-white dark:bg-teal-800"
                  : "border border-border bg-surface-raised text-fg-muted hover:text-fg"
              }`}
            >
              {f.label}
            </button>
          );
        })}
        <button
          type="button"
          aria-pressed={statusOnlyActive}
          onClick={() => setStatusOnlyActive((v) => !v)}
          className={`ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            statusOnlyActive
              ? "border-2 border-teal-700 bg-teal-100 text-teal-900 dark:border-teal-300 dark:bg-teal-500/20 dark:text-teal-100"
              : "border-2 border-dashed border-border-strong bg-transparent text-fg-muted hover:text-fg"
          }`}
        >
          {/* CCH-011: explicit on/off cue beyond aria-pressed */}
          <span
            aria-hidden
            className={`inline-flex h-4 w-4 items-center justify-center rounded border text-[10px] font-bold leading-none ${
              statusOnlyActive
                ? "border-teal-700 bg-teal-700 text-white dark:border-teal-300 dark:bg-teal-300 dark:text-teal-950"
                : "border-border-strong bg-transparent text-transparent"
            }`}
          >
            ✓
          </span>
          Hide delivered
        </button>
      </div>

      <ul className="mt-6 space-y-3">
        {queue.map((load) => {
          const last = checkCalls.find((c) => c.id === load.lastCheckCallId);
          return (
            <li key={load.id}>
              <Link
                href={`/app/loads/${load.id}`}
                className="block rounded-2xl border border-border bg-surface-raised p-4 transition hover:border-teal-700/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-semibold">{load.ref}</span>
                      <RiskBadge risk={load.risk} />
                      <StatusBadge status={load.status} />
                    </div>
                    <p className="mt-1 text-sm text-fg">
                      {load.originCity}, {load.originState} → {load.destCity}, {load.destState}
                    </p>
                    <p className="mt-1 text-xs text-fg-subtle">
                      {load.driverName} · {load.truckUnit} · {load.broker}
                    </p>
                  </div>
                  <div className="text-right text-xs text-fg-muted">
                    {load.nextCheckDue && <p>Next due {formatWhen(load.nextCheckDue)}</p>}
                    {last && <p className="mt-1 max-w-xs">Last: {last.location}</p>}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
        {queue.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-fg-muted">
            No loads match these filters.
          </li>
        )}
      </ul>
    </div>
  );
}
