"use client";

import { FormEvent, useState } from "react";
import { formatWhen } from "@/lib/utils";
import { useHubStore } from "@/store/hub-store";

export default function HandoffsPage() {
  const handoffs = useHubStore((s) => s.handoffs);
  const addHandoff = useHubStore((s) => s.addHandoff);

  const [shift, setShift] = useState("India overnight → US Pacific morning");
  const [author, setAuthor] = useState("Desk A — overnight coverage");
  const [body, setBody] = useState("");
  const [loadRefs, setLoadRefs] = useState("");
  const [openRisks, setOpenRisks] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);

  function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!shift.trim()) e.shift = "Shift label required.";
    if (!author.trim()) e.author = "Author required.";
    if (!body.trim() || body.trim().length < 40)
      e.body = "Write a real handoff (at least ~40 characters).";
    setErrors(e);
    if (Object.keys(e).length) return;

    addHandoff({
      shift: shift.trim(),
      author: author.trim(),
      body: body.trim(),
      loadRefs: loadRefs
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      openRisks: openRisks
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
    setBody("");
    setLoadRefs("");
    setOpenRisks("");
    setOk(true);
    setTimeout(() => setOk(false), 2500);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">Overnight handoffs</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Write as if the next person has zero context — CRITICAL / HIGH / WATCH / CLEAN.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-2xl border border-border bg-surface-raised p-5"
        noValidate
      >
        <h2 className="font-semibold">Compose handoff</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="shift" className="block text-sm font-medium">
              Shift
            </label>
            <input
              id="shift"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              aria-invalid={!!errors.shift}
              aria-describedby={errors.shift ? "err-shift" : undefined}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            />
            {errors.shift && (
              <p id="err-shift" className="mt-1 text-sm text-danger">
                {errors.shift}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium">
              Author
            </label>
            <input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              aria-invalid={!!errors.author}
              aria-describedby={errors.author ? "err-author" : undefined}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
            />
            {errors.author && (
              <p id="err-author" className="mt-1 text-sm text-danger">
                {errors.author}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium">
            Handoff body
          </label>
          <textarea
            id="body"
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            aria-invalid={!!errors.body}
            aria-describedby={errors.body ? "err-body" : "hint-body"}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 font-mono text-sm placeholder:italic placeholder:text-fg-subtle"
            placeholder={"CRITICAL\n- CCH-xxxx …\n\nHIGH\n…"}
          />
          <p id="hint-body" className="mt-1 text-xs text-fg-subtle">
            Include truck/driver/load, last location, appointments, open risks, next promised action.
          </p>
          {errors.body && (
            <p id="err-body" className="mt-1 text-sm text-danger">
              {errors.body}
            </p>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="refs" className="block text-sm font-medium">
              Load refs (comma-separated)
            </label>
            <input
              id="refs"
              value={loadRefs}
              onChange={(e) => setLoadRefs(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm placeholder:italic placeholder:text-fg-subtle"
              placeholder="CCH-3301, CCH-4488"
            />
          </div>
          <div>
            <label htmlFor="risks" className="block text-sm font-medium">
              Open risks (comma-separated)
            </label>
            <input
              id="risks"
              value={openRisks}
              onChange={(e) => setOpenRisks(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm placeholder:italic placeholder:text-fg-subtle"
              placeholder="HOS vs FCFS, detention"
            />
          </div>
        </div>
        <button
          type="submit"
          className="min-h-11 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 dark:bg-teal-800 dark:hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Save handoff note
        </button>
        {ok && (
          <p role="status" className="text-sm text-success">
            Handoff saved to demo store.
          </p>
        )}
      </form>

      <section className="mt-10" aria-labelledby="saved">
        <h2 id="saved" className="text-lg font-semibold">
          Saved notes
        </h2>
        <ul className="mt-4 space-y-4">
          {handoffs.map((h) => (
            <li key={h.id} className="rounded-2xl border border-border bg-surface-raised p-5">
              <p className="text-sm font-semibold">{h.shift}</p>
              <p className="mt-1 text-xs text-fg-subtle">
                {h.author} · {formatWhen(h.createdAt)}
              </p>
              <pre className="mt-3 whitespace-pre-wrap font-sans text-sm text-fg-muted">{h.body}</pre>
              {(h.loadRefs.length > 0 || h.openRisks.length > 0) && (
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {h.loadRefs.map((r) => (
                    <span key={r} className="rounded-full bg-surface-sunken px-2 py-0.5 font-mono">
                      {r}
                    </span>
                  ))}
                  {h.openRisks.map((r) => (
                    <span
                      key={r}
                      className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-950 dark:bg-amber-500/20 dark:text-amber-100"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
