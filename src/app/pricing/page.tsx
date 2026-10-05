import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";

export const metadata: Metadata = { title: "Pricing" };

const tiers = [
  {
    name: "Starter",
    price: "$0",
    blurb: "Solo dispatcher learning structured logs.",
    features: ["Queue + log (demo)", "3 playbooks", "Templates library", "Local-only persistence"],
  },
  {
    name: "Desk",
    price: "$149",
    blurb: "Small multi-dispatcher desk with handoffs.",
    features: [
      "Everything in Starter",
      "Escalations board",
      "POD inbox",
      "Overnight handoff composer",
      "Demo roles (day / night)",
    ],
    highlight: true,
  },
  {
    name: "Fleet",
    price: "$499",
    blurb: "Fleet lead evaluating process before a TMS RFP.",
    features: [
      "Everything in Desk",
      "Compare packs for TMS RFPs",
      "Audit-style check-call export (demo)",
      "Priority support (illustrative)",
    ],
  },
];

export default function PricingPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-xl border border-amber-700/30 bg-amber-100 px-4 py-3 text-sm text-amber-950 dark:border-amber-400/20 dark:bg-amber-950/40 dark:text-amber-100">
          <strong>Demo pricing only.</strong> These tiers illustrate product packaging for portfolio
          review. Nothing is billable; no checkout; no live entitlements.
        </div>
        <h1 className="mt-8 text-4xl font-bold tracking-tight">Pricing (illustrative)</h1>
        <p className="mt-3 max-w-2xl text-fg-muted">
          Three demo tiers so reviewers can see how a specialized check-call product might package
          relative to a full TMS.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <article
              key={t.name}
              className={`rounded-2xl border p-6 ${
                t.highlight
                  ? "border-teal-700 bg-surface-raised shadow-md dark:border-teal-500"
                  : "border-border bg-surface-raised"
              }`}
            >
              {t.highlight && (
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                  Most reviewed
                </p>
              )}
              <h2 className="mt-1 text-xl font-semibold">{t.name}</h2>
              <p className="mt-2 text-3xl font-bold">
                {t.price}
                <span className="text-sm font-normal text-fg-subtle"> / mo demo</span>
              </p>
              <p className="mt-2 text-sm text-fg-muted">{t.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-fg-muted">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-teal-700 dark:text-teal-400" aria-hidden>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/app/queue"
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-teal-700 px-3 py-2 text-sm font-semibold text-white dark:bg-teal-800"
              >
                Open demo
              </Link>
            </article>
          ))}
        </div>
      </div>
    </MarketingShell>
  );
}
