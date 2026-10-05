import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { playbooks } from "@/data/playbooks";

export const metadata: Metadata = { title: "Playbooks" };

export default function PlaybooksIndexPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-bold tracking-tight">Playbooks</h1>
        <p className="mt-3 max-w-2xl text-fg-muted">
          Operating doctrine for check-call cadence, escalation, overnight handoffs, and broker tone —
          written for dry-van desks that cover US hours from India overnight.
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {playbooks.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/playbooks/${p.slug}`}
                className="block h-full rounded-2xl border border-border bg-surface-raised p-5 transition hover:border-teal-700/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <p className="text-xs text-fg-subtle">
                  {p.readingMinutes} min · {p.audience}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-fg">{p.title}</h2>
                <p className="mt-2 text-sm text-fg-muted">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MarketingShell>
  );
}
