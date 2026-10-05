import Link from "next/link";

export function DemoBanner() {
  return (
    <div
      role="status"
      className="border-b border-amber-700/30 bg-amber-100 px-4 py-2 text-center text-sm text-amber-950 dark:border-amber-400/20 dark:bg-amber-950/50 dark:text-amber-100"
    >
      <strong className="font-semibold">Demo data only</strong> — not connected to a live
      TMS, ELD, or Google Sheets.{" "}
      <Link
        href="/docs/demo-caveats"
        className="underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Read caveats
      </Link>
    </div>
  );
}
