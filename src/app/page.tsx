import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  FileImage,
  Moon,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { site } from "@/data/site";

const features = [
  {
    icon: PhoneCall,
    title: "Cadence engine",
    body: "Prioritize trucks inside appointment risk windows — not generic hourly pings.",
  },
  {
    icon: ClipboardList,
    title: "Four-field structured log",
    body: "Location, ETA vs appointment, delay risk, next-hour need — every call, every time.",
  },
  {
    icon: FileImage,
    title: "POD / media inbox",
    body: "Track pending, received, attached, and rejected paperwork without burying it in chat.",
  },
  {
    icon: AlertTriangle,
    title: "Escalation board",
    body: "Missed ETA, detention, HOS pressure, equipment — with owners and severity.",
  },
  {
    icon: Moon,
    title: "Overnight handoffs",
    body: "India overnight → Pacific morning notes written as if the next person has zero context.",
  },
  {
    icon: ShieldCheck,
    title: "Broker-ready tone",
    body: "Templates for SMS and email that lead with facts and a clear ask.",
  },
];

export default function HomePage() {
  return (
    <MarketingShell>
      <section className="border-b border-border bg-gradient-to-b from-teal-50/80 to-surface dark:from-teal-950/30 dark:to-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300">
              Specialized dispatch product
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-fg sm:text-5xl">
              Check-calls that protect the next appointment
            </h1>
            <p className="mt-4 text-lg text-fg-muted">{site.tagline}</p>
            <p className="mt-3 text-fg-muted">{site.productOneLiner}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/app/queue"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-teal-800"
              >
                Open demo app <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-sm font-semibold text-fg hover:bg-surface-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Product deep dive
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-fg-subtle">
              <span className="rounded-full border border-border px-2.5 py-1">US / EU fleet desks</span>
              <span className="rounded-full border border-border px-2.5 py-1">India overnight / Mohali–Chandigarh hiring</span>
              <span className="rounded-full border border-border px-2.5 py-1">53&apos; dry-van</span>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
              Doctrine — every call captures
            </p>
            <ol className="mt-4 space-y-3">
              {site.doctrine.map((item, i) => (
                <li key={item} className="flex gap-3 rounded-xl bg-surface-sunken p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white dark:bg-teal-800">
                    {i + 1}
                  </span>
                  <span className="text-sm text-fg">{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-fg-subtle">
              From Harinder&apos;s check-call playbook — remote dispatch only works when the call is a
              status, not a vibe.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-raised" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 id="proof-heading" className="text-sm font-semibold uppercase tracking-wider text-fg-subtle">
            Career proof (builder) — not product analytics
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border p-4">
              <p className="text-2xl font-bold text-teal-800 dark:text-teal-300">{site.proof.loads}</p>
              <p className="text-sm text-fg-muted">Delivered loads</p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-2xl font-bold text-teal-800 dark:text-teal-300">{site.proof.revenue}</p>
              <p className="text-sm text-fg-muted">Freight revenue</p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-2xl font-bold text-teal-800 dark:text-teal-300">{site.proof.avgLoad}</p>
              <p className="text-sm text-fg-muted">Avg / load · {site.proof.period}</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-fg-subtle">{site.proof.note}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-3xl font-bold tracking-tight">
          Built for the desk that lives in check-calls
        </h2>
        <p className="mt-2 max-w-2xl text-fg-muted">
          FreightOps is a full command center. Check-Call Hub is narrower on purpose — cadence,
          structured logs, POD, escalations, and shift handoffs.
        </p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.title} className="rounded-2xl border border-border bg-surface-raised p-5">
                <Icon className="h-5 w-5 text-teal-700 dark:text-teal-400" aria-hidden />
                <h3 className="mt-3 font-semibold text-fg">{f.title}</h3>
                <p className="mt-2 text-sm text-fg-muted">{f.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-border bg-surface-sunken">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Dual-market CTAs</h2>
            <p className="mt-2 text-fg-muted">
              US/EU fleet desks that need overnight coverage discipline — and India G&A / dispatch
              hiring in Mohali–Chandigarh that wants proven remote ops.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/markets"
              className="rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white dark:bg-teal-800"
            >
              See markets
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-sm font-semibold"
            >
              About the builder
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
