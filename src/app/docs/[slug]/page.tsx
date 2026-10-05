import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { docs, getDoc } from "@/data/docs";

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = getDoc(params.slug);
  return { title: d?.title ?? "Docs" };
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = getDoc(params.slug);
  if (!doc) notFound();

  return (
    <MarketingShell>
      <article className="mx-auto max-w-3xl px-4 py-14">
        <Link href="/docs" className="text-sm text-teal-800 dark:text-teal-300">
          ← All docs
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">{doc.title}</h1>
        <p className="mt-3 text-lg text-fg-muted">{doc.description}</p>
        <div className="prose-hub mt-10">
          {doc.sections.map((s) => (
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
