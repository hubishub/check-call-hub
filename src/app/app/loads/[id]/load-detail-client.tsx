"use client";

import Link from "next/link";
import { RiskBadge, StatusBadge } from "@/components/ui/badges";
import { formatCurrency, formatWhen } from "@/lib/utils";
import { useHubStore } from "@/store/hub-store";

export function LoadDetailClient({ id }: { id: string }) {
  const loads = useHubStore((s) => s.loads);
  const checkCalls = useHubStore((s) => s.checkCalls);
  const escalations = useHubStore((s) => s.escalations);
  const setLoadRisk = useHubStore((s) => s.setLoadRisk);
  const updateEscalationStatus = useHubStore((s) => s.updateEscalationStatus);

  const load = loads.find((l) => l.id === id);
  if (!load) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-xl font-bold">Load not found</h1>
        <Link href="/app/loads" className="mt-4 inline-block text-teal-800 dark:text-teal-300">
          ← Back to loads
        </Link>
      </div>
    );
  }

  const timeline = checkCalls
    .filter((c) => c.loadId === load.id)
    .slice()
    .sort((a, b) => +new Date(b.at) - +new Date(a.at));
  const loadEsc = escalations.filter((e) => e.loadId === load.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/app/loads" className="text-sm text-teal-800 dark:text-teal-300">
        ← Loads
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-mono text-2xl font-bold">{load.ref}</h1>
          <p className="mt-1 text-fg-muted">
            {load.originCity}, {load.originState} → {load.destCity}, {load.destState} ·{" "}
            {load.miles} mi · {formatCurrency(load.rate)}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <StatusBadge status={load.status} />
            <RiskBadge risk={load.risk} />
          </div>
        </div>
        <Link
          href="/app/log"
          className="rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white dark:bg-teal-800"
        >
          Log call on this load
        </Link>
      </div>

      <dl className="mt-6 grid gap-4 rounded-2xl border border-border bg-surface-raised p-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase text-fg-subtle">Driver / unit</dt>
          <dd className="text-sm">
            {load.driverName} · {load.truckUnit}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-fg-subtle">Shipper / broker</dt>
          <dd className="text-sm">
            {load.shipper} · {load.broker}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-fg-subtle">Commodity</dt>
          <dd className="text-sm">
            {load.commodity} · {load.weight.toLocaleString()} lbs
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-fg-subtle">Notes</dt>
          <dd className="text-sm text-fg-muted">{load.notes}</dd>
        </div>
      </dl>

      <section className="mt-8" aria-labelledby="appts">
        <h2 id="appts" className="text-lg font-semibold">
          Appointments
        </h2>
        <ul className="mt-3 space-y-2">
          {load.appointments.map((a) => (
            <li key={a.type + a.facility} className="rounded-xl border border-border p-3 text-sm">
              <span className="font-medium capitalize">{a.type}</span> — {a.facility}, {a.city},{" "}
              {a.state}
              <span className="mt-1 block text-xs text-fg-muted">
                {formatWhen(a.windowStart)} – {formatWhen(a.windowEnd)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="timeline">
        <h2 id="timeline" className="text-lg font-semibold">
          Check-call timeline
        </h2>
        <ol className="mt-3 space-y-3">
          {timeline.map((c) => (
            <li key={c.id} className="rounded-2xl border border-border bg-surface-raised p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-fg-subtle">
                <span>
                  {formatWhen(c.at)} · {c.stage.replace(/_/g, " ")} · {c.type.replace(/_/g, " ")}
                </span>
                <span>{c.createdBy}</span>
              </div>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-fg-subtle">Location</dt>
                  <dd>{c.location}</dd>
                </div>
                <div>
                  <dt className="text-xs text-fg-subtle">ETA vs appointment</dt>
                  <dd>{c.etaVsAppointment}</dd>
                </div>
                <div>
                  <dt className="text-xs text-fg-subtle">Delay risk</dt>
                  <dd>{c.delayRisk}</dd>
                </div>
                <div>
                  <dt className="text-xs text-fg-subtle">Next hour need</dt>
                  <dd>{c.nextHourNeed}</dd>
                </div>
              </dl>
            </li>
          ))}
          {timeline.length === 0 && (
            <li className="text-sm text-fg-muted">No check-calls yet — log the first one.</li>
          )}
        </ol>
      </section>

      <section className="mt-8" aria-labelledby="esc">
        <h2 id="esc" className="text-lg font-semibold">
          Escalations on this load
        </h2>
        <ul className="mt-3 space-y-3">
          {loadEsc.map((e) => (
            <li key={e.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{e.title}</p>
                <StatusBadge status={e.status} />
              </div>
              <p className="mt-2 text-sm text-fg-muted">{e.detail}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {e.status !== "resolved" && (
                  <button
                    type="button"
                    onClick={() => updateEscalationStatus(e.id, "resolved")}
                    className="inline-flex min-h-11 items-center rounded-lg border border-border px-3 py-2 text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Mark resolved
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setLoadRisk(load.id, "critical")}
                  className="inline-flex min-h-11 items-center rounded-lg border border-border px-3 py-2 text-xs font-medium"
                >
                  Raise load to critical
                </button>
              </div>
            </li>
          ))}
          {loadEsc.length === 0 && (
            <li className="text-sm text-fg-muted">No escalations linked.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
