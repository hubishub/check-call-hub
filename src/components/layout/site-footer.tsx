import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-sunken">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-fg">{site.name}</p>
          <p className="mt-2 text-sm text-fg-muted">
            Specialized product for check-call discipline, POD/media, escalations, and overnight
            handoffs. Portfolio demo — not a live TMS.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/product" className="text-fg-muted hover:text-fg">Product</Link></li>
            <li><Link href="/compare" className="text-fg-muted hover:text-fg">Compare</Link></li>
            <li><Link href="/playbooks" className="text-fg-muted hover:text-fg">Playbooks</Link></li>
            <li><Link href="/docs" className="text-fg-muted hover:text-fg">Docs</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">Builder</p>
          <p className="mt-3 text-sm text-fg-muted">
            {site.builder.name} · {site.builder.title}
          </p>
          <p className="mt-1 text-sm text-fg-muted">{site.builder.location}</p>
          <a
            href={site.builder.linkedin}
            className="mt-2 inline-block text-sm text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-fg-subtle">
        Portfolio demo · Sample data only · No live TMS/Sheets connection · © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
