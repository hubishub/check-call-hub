"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CheckCallStage, CheckCallType } from "@/lib/types";
import { useHubStore } from "@/store/hub-store";

const types: CheckCallType[] = [
  "scheduled",
  "driver_initiated",
  "broker_ask",
  "exception",
  "handoff",
];
const stages: CheckCallStage[] = [
  "post_dispatch",
  "pre_pickup",
  "at_pickup",
  "mid_transit",
  "pre_delivery",
  "delivered",
];

export default function LogCallPage() {
  const loads = useHubStore((s) => s.loads);
  const addCheckCall = useHubStore((s) => s.addCheckCall);
  const router = useRouter();

  const activeLoads = useMemo(
    () => loads.filter((l) => l.status !== "delivered"),
    [loads]
  );

  const [loadId, setLoadId] = useState(activeLoads[0]?.id ?? loads[0]?.id ?? "");
  const selected = loads.find((l) => l.id === loadId);
  const [type, setType] = useState<CheckCallType>("scheduled");
  const [stage, setStage] = useState<CheckCallStage>("mid_transit");
  const [location, setLocation] = useState("");
  const [eta, setEta] = useState("");
  const [delayRisk, setDelayRisk] = useState("");
  const [nextHour, setNextHour] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!loadId) e.loadId = "Select a load.";
    if (!location.trim()) e.location = "Location is required.";
    if (!eta.trim()) e.eta = "ETA vs appointment is required.";
    if (!delayRisk.trim()) e.delayRisk = "Delay risk is required (use “None” if clear).";
    if (!nextHour.trim()) e.nextHour = "Next-hour need is required (use “None” if clear).";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate() || !selected) return;
    addCheckCall({
      loadId,
      driverName: selected.driverName,
      type,
      stage,
      location: location.trim(),
      etaVsAppointment: eta.trim(),
      delayRisk: delayRisk.trim(),
      nextHourNeed: nextHour.trim(),
      notes: notes.trim() || undefined,
    });
    setSaved(true);
    setLocation("");
    setEta("");
    setDelayRisk("");
    setNextHour("");
    setNotes("");
    setTimeout(() => router.push(`/app/loads/${loadId}`), 600);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">Log check-call</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Four doctrine fields are required. Chat-only updates do not count.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
        <div>
          <label htmlFor="loadId" className="block text-sm font-medium">
            Load
          </label>
          <select
            id="loadId"
            value={loadId}
            onChange={(e) => setLoadId(e.target.value)}
            aria-invalid={!!errors.loadId}
            aria-describedby={errors.loadId ? "err-loadId" : undefined}
            className="mt-1 w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm"
          >
            {loads.map((l) => (
              <option key={l.id} value={l.id}>
                {l.ref} — {l.driverName} ({l.originCity}→{l.destCity})
              </option>
            ))}
          </select>
          {errors.loadId && (
            <p id="err-loadId" className="mt-1 text-sm text-danger">
              {errors.loadId}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="type" className="block text-sm font-medium">
              Call type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as CheckCallType)}
              className="mt-1 w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm"
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="stage" className="block text-sm font-medium">
              Stage
            </label>
            <select
              id="stage"
              value={stage}
              onChange={(e) => setStage(e.target.value as CheckCallStage)}
              className="mt-1 w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm"
            >
              {stages.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(
          [
            ["location", "1) Location (city / mile marker)", location, setLocation, errors.location],
            ["eta", "2) ETA vs appointment", eta, setEta, errors.eta],
            ["delayRisk", "3) Delay risk", delayRisk, setDelayRisk, errors.delayRisk],
            ["nextHour", "4) What driver needs next hour", nextHour, setNextHour, errors.nextHour],
          ] as const
        ).map(([id, label, value, setter, err]) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-medium">
              {label}
            </label>
            <textarea
              id={id}
              rows={2}
              value={value}
              onChange={(e) => setter(e.target.value)}
              aria-invalid={!!err}
              aria-describedby={err ? `err-${id}` : undefined}
              className="mt-1 w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm"
            />
            {err && (
              <p id={`err-${id}`} className="mt-1 text-sm text-danger">
                {err}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="notes" className="block text-sm font-medium">
            Extra notes (optional)
          </label>
          <textarea
            id="notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="min-h-11 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 dark:bg-teal-800 dark:hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Save check-call
          </button>
          {saved && (
            <p role="status" className="text-sm text-success">
              Saved — opening load timeline…
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
