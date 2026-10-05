"use client";

import Link from "next/link";
import { RiskBadge, StatusBadge } from "@/components/ui/badges";
import { formatCurrency } from "@/lib/utils";
import { useHubStore } from "@/store/hub-store";

export default function LoadsPage() {
  const loads = useHubStore((s) => s.loads);
  const checkCalls = useHubStore((s) => s.checkCalls);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold tracking-tight">Demo loads</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Fictional US 53&apos; dry-van loads with last-call summaries.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface-sunken">
            <tr>
              <th scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">
                Ref
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Lane
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Driver
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Status
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Risk
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Last call
              </th>
              <th scope="col" className="px-4 py-3 font-semibold">
                Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {loads.map((l) => {
              const last = checkCalls.find((c) => c.id === l.lastCheckCallId);
              return (
                <tr key={l.id} className="border-t border-border">
                  <td className="whitespace-nowrap px-4 py-3">
                    <Link
                      href={`/app/loads/${l.id}`}
                      className="whitespace-nowrap font-mono font-semibold text-teal-800 hover:underline dark:text-teal-300"
                    >
                      {l.ref}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-fg-muted">
                    {l.originCity}, {l.originState} → {l.destCity}, {l.destState}
                  </td>
                  <td className="px-4 py-3">
                    {l.driverName}
                    <span className="block text-xs text-fg-subtle">{l.truckUnit}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="px-4 py-3">
                    <RiskBadge risk={l.risk} />
                  </td>
                  <td className="max-w-xs px-4 py-3 text-xs text-fg-muted">
                    {last ? last.location : "—"}
                  </td>
                  <td className="px-4 py-3 tabular-nums">{formatCurrency(l.rate)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
