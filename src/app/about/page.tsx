import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const b = site.builder;
  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-4 py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300">
          About the builder
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{b.fullName}</h1>
        <p className="mt-2 text-lg text-fg-muted">
          {b.title} · {b.company}
        </p>
        <p className="mt-1 text-sm text-fg-subtle">{b.location}</p>

        {b.openToWork && (
          <p className="mt-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200">
            Open to Work — Mohali/Chandigarh onsite or hybrid · remote US/EU freight ops
          </p>
        )}

        <div className="prose-hub mt-10 space-y-4">
          <p>
            Check-Call Hub is a portfolio product grounded in how I actually run US 53&apos; dry-van
            long-haul desks from India overnight — covering Pacific business hours so the morning
            board is not a scavenger hunt.
          </p>
          <p>
            At Ajit Transport LLC (current) and previously King Spade LLC, check-call discipline was
            the difference between a quiet broker relationship and a claim. Every call captures four
            facts: location, ETA vs appointment, delay risk, and what the driver needs next hour.
          </p>
          <p>
            This site is <strong className="text-fg">not</strong> a live TMS. Career metrics below are
            proof from delivered loads — not analytics invented by the demo app.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-border bg-surface-raised p-6" aria-labelledby="proof">
          <h2 id="proof" className="text-lg font-semibold">
            Verified career proof
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-wider text-fg-subtle">Delivered loads</dt>
              <dd className="text-2xl font-bold text-teal-800 dark:text-teal-300">{site.proof.loads}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-fg-subtle">Revenue</dt>
              <dd className="text-2xl font-bold text-teal-800 dark:text-teal-300">{site.proof.revenue}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-fg-subtle">Avg / load</dt>
              <dd className="text-2xl font-bold text-teal-800 dark:text-teal-300">{site.proof.avgLoad}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-fg-subtle">{site.proof.period} · {site.proof.note}</p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <a
            href={b.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white dark:bg-teal-800"
          >
            LinkedIn
          </a>
          <a href={`mailto:${b.email}`} className="rounded-lg border border-border px-4 py-2 font-semibold">
            Email
          </a>
          <Link href="/playbooks" className="rounded-lg border border-border px-4 py-2 font-semibold">
            Read playbooks
          </Link>
        </div>
      </div>
    </MarketingShell>
  );
}
