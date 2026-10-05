import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";

export const metadata: Metadata = { title: "Product" };

const modules = [
  {
    title: "Cadence engine",
    body: `Risk windows drive the queue — appointment proximity, HOS pressure, broker asks, and new drivers float to the top. Dispatchers work the list instead of guessing who to call next. Filters by risk, status, and due-soon keep the board honest under volume.`,
  },
  {
    title: "Structured check-call log",
    body: `Every log requires the four doctrine fields: location, ETA vs appointment, delay risk, and next-hour need — plus load, driver, type, and stage. Calls written only in chat disappear at shift change. Calls in the log survive handoffs.`,
  },
  {
    title: "POD / media inbox",
    body: `Pending → received → attached (or rejected). Seal photos, BOLs, and delivery PODs get a status the day desk can trust without digging through SMS threads.`,
  },
  {
    title: "Escalations board",
    body: `Open risks with kind, severity, owner, and status: missed ETA, detention, HOS pressure, weather, equipment, broker escalation. Escalate early — with a plan — not after the gate closes.`,
  },
  {
    title: "Overnight handoffs",
    body: `Composer + saved notes list. CRITICAL / HIGH / WATCH / CLEAN grouping. Load refs and open risks called out so India overnight → Pacific morning is not a scavenger hunt.`,
  },
  {
    title: "Templates & playbooks",
    body: `Call scripts and broker SMS/email drafts with copy buttons. Playbooks for cadence, escalation, handoffs, and broker tone — grounded in real dry-van desk practice.`,
  },
];

export default function ProductPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300">
          Product
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Deep feature breakdown</h1>
        <p className="mt-3 max-w-2xl text-lg text-fg-muted">
          Check-Call Hub is not a thin landing page. It is a working demo of the workflow a remote
          dry-van desk runs every night: who to call, what to log, what to escalate, and how to hand
          off cleanly.
        </p>

        <div className="mt-12 space-y-8">
          {modules.map((m, i) => (
            <article
              key={m.title}
              className="grid gap-4 rounded-2xl border border-border bg-surface-raised p-6 md:grid-cols-[3rem_1fr]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-900 dark:bg-teal-500/20 dark:text-teal-200">
                {i + 1}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{m.title}</h2>
                <p className="mt-2 text-fg-muted leading-relaxed">{m.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/app/queue"
            className="rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white dark:bg-teal-800"
          >
            Try the demo app
          </Link>
          <Link
            href="/compare"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold"
          >
            Compare vs chat / TMS
          </Link>
        </div>
      </div>
    </MarketingShell>
  );
}
