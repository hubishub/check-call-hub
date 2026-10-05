import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { CopyButton } from "@/components/ui/copy-button";
import { templates } from "@/data/templates";

export const metadata: Metadata = { title: "Templates" };

const labels = {
  call_script: "Call scripts",
  broker_sms: "Broker SMS",
  broker_email: "Broker email",
} as const;

export default function TemplatesPage() {
  const groups = (["call_script", "broker_sms", "broker_email"] as const).map((cat) => ({
    cat,
    items: templates.filter((t) => t.category === cat),
  }));

  return (
    <MarketingShell>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-4xl font-bold tracking-tight">Templates</h1>
        <p className="mt-3 max-w-2xl text-fg-muted">
          Copy-ready call scripts and broker SMS/email drafts. Replace braces with live load details.
          Demo only — no send integration.
        </p>

        <div className="mt-10 space-y-12">
          {groups.map((g) => (
            <section key={g.cat} aria-labelledby={`cat-${g.cat}`}>
              <h2 id={`cat-${g.cat}`} className="text-xl font-semibold">
                {labels[g.cat]}
              </h2>
              <ul className="mt-4 grid gap-5 lg:grid-cols-2">
                {g.items.map((t) => (
                  <li key={t.id} className="rounded-2xl border border-border bg-surface-raised p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-fg">{t.title}</h3>
                      <CopyButton text={t.body} label={`Copy ${t.title}`} />
                    </div>
                    <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-surface-sunken p-3 font-mono text-xs text-fg-muted">
                      {t.body}
                    </pre>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </MarketingShell>
  );
}
