import Link from "next/link";

export default function LoadNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-mono text-sm text-fg-subtle">404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Load not found</h1>
      <p className="mt-2 text-sm text-fg-muted">
        That load id isn&apos;t in the demo board. Demo loads are fictional sample data.
      </p>
      <Link
        href="/app/loads"
        className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 dark:bg-teal-800 dark:hover:bg-teal-700"
      >
        ← Back to loads
      </Link>
    </div>
  );
}
