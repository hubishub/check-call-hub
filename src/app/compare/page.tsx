import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/marketing-shell";

export const metadata: Metadata = { title: "Compare" };

const rows = [
  {
    dim: "Primary job",
    chat: "Conversation",
    hub: "Check-call discipline + handoffs",
    tms: "Full order-to-cash / planning",
  },
  {
    dim: "Structured four-field log",
    chat: "Rare / tribal",
    hub: "Required in UI",
    tms: "Varies; often free-text notes",
  },
  {
    dim: "Risk-prioritized call queue",
    chat: "No",
    hub: "Yes (demo)",
    tms: "Sometimes via exception modules",
  },
  {
    dim: "POD / media status",
    chat: "Buried in threads",
    hub: "Inbox with statuses",
    tms: "Usually strong when configured",
  },
  {
    dim: "Overnight handoff artifact",
    chat: "Scrollback",
    hub: "First-class composer",
    tms: "Often custom reports",
  },
  {
    dim: "Load planning / rating",
    chat: "No",
    hub: "Out of scope (by design)",
    tms: "Core strength",
  },
  {
    dim: "Accounting / settlements",
    chat: "No",
    hub: "Out of scope",
    tms: "Core strength",
  },
  {
    dim: "Best when…",
    chat: "Ad-hoc team chat",
    hub: "You need desk process proof",
    tms: "You need system of record",
  },
];

export default function ComparePage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-bold tracking-tight">Honest compare</h1>
        <p className="mt-3 max-w-2xl text-lg text-fg-muted">
          Check-Call Hub vs chat-only desks vs a full TMS. We are not pretending to replace your TMS —
          we specialize the workflow chat usually destroys.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-surface-sunken text-fg">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Dimension
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Chat-only
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-teal-900 dark:text-teal-200">
                  Check-Call Hub
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Full TMS
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.dim} className="border-t border-border">
                  <th scope="row" className="px-4 py-3 font-medium text-fg">
                    {r.dim}
                  </th>
                  <td className="px-4 py-3 text-fg-muted">{r.chat}</td>
                  <td className="px-4 py-3 font-medium text-fg">{r.hub}</td>
                  <td className="px-4 py-3 text-fg-muted">{r.tms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface-raised p-5">
            <h2 className="font-semibold">vs FreightOps (sibling portfolio app)</h2>
            <p className="mt-2 text-sm text-fg-muted">
              FreightOps is a broader command-center demo (board, drivers, analytics). Check-Call Hub
              goes deeper on check-calls, POD, escalations, and handoffs with a distinct teal/slate
              product identity.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface-raised p-5">
            <h2 className="font-semibold">What we will not claim</h2>
            <p className="mt-2 text-sm text-fg-muted">
              Live ELD integration, settlements, customer portals, or production uptime. This is a
              portfolio product with demo data — see Docs → Demo caveats.
            </p>
          </div>
        </div>
      </div>
    </MarketingShell>
  );
}
