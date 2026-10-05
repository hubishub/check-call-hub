import { cn } from "@/lib/utils";
import type { EscalationKind, EscalationStatus, LoadStatus, PodStatus, RiskLevel } from "@/lib/types";

const riskStyles: Record<RiskLevel, string> = {
  low: "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-300",
  watch: "bg-amber-100 text-amber-950 dark:bg-amber-500/15 dark:text-amber-200",
  high: "bg-orange-100 text-orange-950 dark:bg-orange-500/20 dark:text-orange-200",
  critical: "bg-rose-100 text-rose-950 dark:bg-rose-500/20 dark:text-rose-200",
};

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize", riskStyles[risk])}>
      {risk}
    </span>
  );
}

// CCH-012: explicit display labels — no naive title-casing ("Hos Pressure", "Missed Eta").
const STATUS_LABELS: Record<LoadStatus | PodStatus | EscalationStatus | EscalationKind, string> = {
  // Load status
  dispatched: "Dispatched",
  at_pickup: "At pickup",
  loaded: "Loaded",
  in_transit: "In transit",
  at_delivery: "At delivery",
  delivered: "Delivered",
  exception: "Exception",
  // POD status
  pending: "Pending",
  received: "Received",
  attached: "Attached",
  rejected: "Rejected",
  // Escalation status
  open: "Open",
  watching: "Watching",
  resolved: "Resolved",
  // Escalation kind
  missed_eta: "Missed ETA",
  detention: "Detention",
  hos_pressure: "HOS pressure",
  weather: "Weather",
  equipment: "Equipment",
  broker_escalation: "Broker escalation",
};

export function statusLabel(status: string): string {
  const known = (STATUS_LABELS as Record<string, string>)[status];
  if (known) return known;
  const text = String(status).replace(/_/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function StatusBadge({
  status,
}: {
  status: LoadStatus | PodStatus | EscalationStatus | EscalationKind | string;
}) {
  return (
    <span className="inline-flex whitespace-nowrap rounded-full bg-surface-sunken px-2 py-0.5 text-xs font-medium text-fg-muted">
      {statusLabel(String(status))}
    </span>
  );
}
