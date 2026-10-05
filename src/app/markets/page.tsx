import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";

export const metadata: Metadata = { title: "Markets" };

export default function MarketsPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300">
          Markets
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">US/EU desks & India overnight talent</h1>
        <p className="mt-3 max-w-2xl text-lg text-fg-muted">
          One product story, two hiring and ops audiences — the same check-call discipline that keeps
          Pacific mornings calm.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface-raised p-6">
            <h2 className="text-2xl font-semibold">US / EU fleet desks</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Long-haul 53&apos; dry-van operations that need overnight coverage without losing board
              hygiene. Check-Call Hub models how a remote desk surfaces appointment risk, detention,
              and HOS pressure before brokers escalate. Useful for carriers evaluating process —
              and for operators who want portfolio proof of desk systems thinking.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-fg-muted">
              <li>Risk-prioritized queue tied to appointments</li>
              <li>Escalation ownership before claims</li>
              <li>POD inbox that survives shift change</li>
              <li>Honest compare vs full TMS (we are not one)</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-border bg-surface-raised p-6">
            <h2 className="text-2xl font-semibold">India G&A / dispatch hiring</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Mohali–Chandigarh corridor and broader India logistics hiring for overnight desks that
              cover US business hours. This product demonstrates the operating rhythm — cadence,
              structured logs, handoff notes — that separates &quot;I&apos;m fine&quot; chat from real
              remote coverage.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-fg-muted">
              <li>Overnight → morning handoff composer</li>
              <li>Playbooks for cadence and broker tone</li>
              <li>Open to Work: onsite Mohali/Chandigarh + remote US/EU</li>
              <li>Builder story grounded in Ajit Transport / King Spade experience</li>
            </ul>
          </article>
        </div>

        <div className="mt-10 rounded-2xl border border-teal-800/20 bg-teal-50 p-6 dark:border-teal-400/20 dark:bg-teal-950/40">
          <h2 className="text-lg font-semibold text-teal-950 dark:text-teal-100">
            How this pairs with FreightOps
          </h2>
          <p className="mt-2 text-sm text-teal-950/80 dark:text-teal-100/80">
            FreightOps Demo shows a broader command center (board, drivers, analytics). Check-Call Hub
            is the specialized slice hiring managers ask about first: &quot;How do you run check-calls
            and handoffs from India overnight?&quot; See{" "}
            <Link href="/compare" className="underline underline-offset-2">
              Compare
            </Link>{" "}
            for an honest breakdown.
          </p>
        </div>
      </div>
    </MarketingShell>
  );
}
