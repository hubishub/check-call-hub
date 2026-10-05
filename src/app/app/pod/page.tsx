"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/ui/badges";
import { formatWhen } from "@/lib/utils";
import type { PodStatus } from "@/lib/types";
import { useHubStore } from "@/store/hub-store";

const statuses: (PodStatus | "all")[] = ["all", "pending", "received", "attached", "rejected"];

export default function PodPage() {
  const pods = useHubStore((s) => s.pods);
  const updatePodStatus = useHubStore((s) => s.updatePodStatus);
  const [filter, setFilter] = useState<PodStatus | "all">("all");

  const list = filter === "all" ? pods : pods.filter((p) => p.status === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">POD / media inbox</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Mock uploads — change status to simulate desk workflow. No real file storage.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="POD status filters">
        {statuses.map((s) => {
          const active = filter === s;
          return (
            <button
              key={s}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(s)}
              className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium capitalize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                active
                  ? "bg-teal-700 text-white dark:bg-teal-800"
                  : "border border-border text-fg-muted"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      <ul className="mt-6 space-y-3">
        {list.map((p) => (
          <li key={p.id} className="rounded-2xl border border-border bg-surface-raised p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-sm font-semibold">
                  {p.loadRef} · {p.fileName}
                </p>
                <p className="mt-1 text-sm text-fg-muted">{p.notes}</p>
                <p className="mt-1 text-xs text-fg-subtle">{formatWhen(p.uploadedAt)}</p>
              </div>
              <StatusBadge status={p.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["pending", "received", "attached", "rejected"] as PodStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={p.status === s}
                  onClick={() => updatePodStatus(p.id, s)}
                  className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 py-2 text-xs capitalize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    p.status === s
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
        {list.length === 0 && (
          <li className="text-sm text-fg-muted">No items for this filter.</li>
        )}
      </ul>
    </div>
  );
}
