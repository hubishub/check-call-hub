"use client";

import Link from "next/link";
import { useState } from "react";
import { RiskBadge, StatusBadge } from "@/components/ui/badges";
import { formatWhen } from "@/lib/utils";
import type { EscalationStatus } from "@/lib/types";
import { useHubStore } from "@/store/hub-store";

const filters: (EscalationStatus | "all")[] = ["all", "open", "watching", "resolved"];

export default function EscalationsPage() {
  const escalations = useHubStore((s) => s.escalations);
  const updateEscalationStatus = useHubStore((s) => s.updateEscalationStatus);
  const [filter, setFilter] = useState<EscalationStatus | "all">("all");

  const list =
    filter === "all" ? escalations : escalations.filter((e) => e.status === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">Escalations board</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Open risks: missed ETA, detention, HOS pressure, weather, equipment.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Escalation filters">
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium capitalize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active
                  ? "bg-teal-700 text-white dark:bg-teal-800"
                  : "border border-border text-fg-muted"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {list.map((e) => (
          <li key={e.id} className="rounded-2xl border border-border bg-surface-raised p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/app/loads/${e.loadId}`}
                className="font-mono text-sm font-semibold text-teal-800 dark:text-teal-300"
              >
                {e.loadRef}
              </Link>
              <RiskBadge risk={e.severity} />
              <StatusBadge status={e.status} />
              <StatusBadge status={e.kind} />
            </div>
            <h2 className="mt-3 font-semibold">{e.title}</h2>
            <p className="mt-2 text-sm text-fg-muted">{e.detail}</p>
            <p className="mt-2 text-xs text-fg-subtle">
              Owner {e.owner} · opened {formatWhen(e.openedAt)}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(["open", "watching", "resolved"] as EscalationStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={e.status === s}
                  onClick={() => updateEscalationStatus(e.id, s)}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 py-2 text-xs capitalize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    e.status === s
                      ? "bg-teal-100 text-teal-900 dark:bg-teal-500/20 dark:text-teal-200"
                      : "border border-border text-fg-muted"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
