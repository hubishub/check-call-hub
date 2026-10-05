import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { docs } from "@/data/docs";

export const metadata: Metadata = { title: "Docs" };

export default function DocsIndexPage() {
  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-bold tracking-tight">Docs</h1>
        <p className="mt-3 max-w-2xl text-fg-muted">
          Architecture, data model, and demo caveats for reviewers.
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {docs.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/docs/${d.slug}`}
                className="block h-full rounded-2xl border border-border bg-surface-raised p-5 hover:border-teal-700/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <h2 className="font-semibold">{d.title}</h2>
                <p className="mt-2 text-sm text-fg-muted">{d.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MarketingShell>
  );
}
