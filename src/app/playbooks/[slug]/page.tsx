import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { getPlaybook, playbooks } from "@/data/playbooks";

export function generateStaticParams() {
  return playbooks.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPlaybook(params.slug);
  return { title: p?.title ?? "Playbook" };
}

export default function PlaybookPage({ params }: { params: { slug: string } }) {
  const playbook = getPlaybook(params.slug);
  if (!playbook) notFound();

  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-14">
        <Link href="/playbooks" className="text-sm text-teal-800 dark:text-teal-300">
          ← All playbooks
        </Link>
        <p className="mt-4 text-xs text-fg-subtle">
          {playbook.readingMinutes} min read · {playbook.audience}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{playbook.title}</h1>
        <p className="mt-3 text-lg text-fg-muted">{playbook.description}</p>
        <div className="prose-hub mt-10">
          {playbook.sections.map((s) => (
            <section key={s.heading} className="mt-8">
              <h2>{s.heading}</h2>
              {s.body.split("\n\n").map((para) => (
                <p key={para.slice(0, 40)} className="mt-3 whitespace-pre-line">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </MarketingShell>
  );
}
