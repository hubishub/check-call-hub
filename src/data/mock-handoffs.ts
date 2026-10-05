import type { HandoffNote } from "@/lib/types";

export const MOCK_HANDOFFS: HandoffNote[] = [
  {
    id: "ho-1",
    shift: "India overnight → US Pacific morning (Oct 5)",
    author: "Desk A — Harinder / overnight coverage",
    createdAt: "2026-10-05T06:55:00-07:00",
    body: `Board summary for day desk:

CRITICAL
- CCH-3301 (James / T-03): HOS thin into Sacramento FCFS. Early gate requested; if denied, broker must move appt before 04:30 PT — still open as of handoff.
- CCH-4488 (Olivia / T-11): Air-line leak near Tomah WI. Re-power path drafted with Landstar; decide by 04:00 CT if not rolling.

HIGH
- CCH-8821 (Elena / T-07): Detention clock at Desert Paper Mills. TQL notified with start time — chase updated delivery flexibility.

WATCH
- CCH-5560: Revised ETA late side KC — broker already updated.
- CCH-2155: I-84 weather — projecting on-time.

CLEAN
- CCH-7740, CCH-1200, CCH-4419 mid-transit on plan.
- CCH-6677 delivered; POD received, attach remaining.
- CCH-9012 post-dispatch confirmation still due before Atlanta pickup.`,
    loadRefs: ["CCH-3301", "CCH-4488", "CCH-8821", "CCH-5560", "CCH-2155"],
    openRisks: [
      "CCH-3301 HOS vs FCFS",
      "CCH-4488 equipment / re-power",
      "CCH-8821 detention",
    ],
  },
  {
    id: "ho-2",
    shift: "US day → India overnight (Oct 4)",
    author: "Desk B — day coverage",
    createdAt: "2026-10-04T18:30:00-07:00",
    body: `Overnight asks:
- Keep mid-transit cadence on CCH-4419 (Denver 08:00).
- Confirm CCH-7740 rolling after LA pickup.
- CCH-6677 should deliver Memphis afternoon — chase POD.
- No new tenders held overnight unless RPM clears floor.`,
    loadRefs: ["CCH-4419", "CCH-7740", "CCH-6677"],
    openRisks: ["None critical at handoff"],
  },
];
