export type Playbook = {
  slug: string;
  title: string;
  description: string;
  readingMinutes: number;
  audience: string;
  sections: { heading: string; body: string }[];
};

export const playbooks: Playbook[] = [
  {
    slug: "cadence",
    title: "Check-call cadence that works under load",
    description:
      "Load-tied rhythm — not generic hourly pings — for US dry-van desks covering Pacific hours from India overnight.",
    readingMinutes: 8,
    audience: "Dispatch desks · fleet ops",
    sections: [
      {
        heading: "Why cadence is an operating system",
        body: `Check-calls are how a dry-van desk discovers reality before the broker, the shipper, or the detention clock does. A missed appointment usually starts as a quiet problem hours earlier: traffic, a slow shipper, a tired driver, a yard that will not open until morning.

On a US long-haul desk covering Pacific hours from India overnight, cadence is also how handoffs stay honest. The morning board should not be a scavenger hunt.`,
      },
      {
        heading: "The six checkpoints",
        body: `1. Post-dispatch confirmation — rate con notes, appointment windows, special instructions, empty/next plan.
2. Pre-pickup window — enough lead time to re-power if the truck will not make it.
3. At pickup / rolling — loaded, seal if required, weight if available, first ETA to delivery.
4. Mid-transit — especially multi-day hauls; catch HOS and weather before they corner you.
5. Pre-delivery — appointment, lumper/detention risk, receiver quirks.
6. Delivered + paperwork — POD path, OS&D notes, next empty time.

When volume is high, prioritize: trucks inside appointment risk windows, new drivers, chronic detention lanes, and any load the broker already asked about.`,
      },
      {
        heading: "The four facts (never optional)",
        body: `Every call captures:
1) Current location (city / mile marker)
2) Updated ETA vs appointment
3) Any delay risk (traffic, weather, equipment)
4) What the driver needs from the desk in the next hour

"I'm fine" is not a check-call. If #2 slipped and #3 is quiet, escalate early — not after the gate closes.`,
      },
    ],
  },
  {
    slug: "escalation",
    title: "Escalation without panic",
    description:
      "When to escalate, who to notify, and how to keep drivers calm while brokers get facts and a plan.",
    readingMinutes: 7,
    audience: "Dispatchers · desk leads",
    sections: [
      {
        heading: "Escalate early when",
        body: `• The revised ETA will miss the appointment window.
• Detention hours are accumulating and the broker has not been notified.
• The driver reports unsafe pressure to break HOS.
• The load needs a re-power decision before the market window closes.
• Equipment issues threaten the next legal drive period.`,
      },
      {
        heading: "Tone that earns trust",
        body: `Drivers should hear calm ownership: "Thanks — I'm updating the broker with this ETA and I'll come back with options."

Brokers should hear facts and a plan, not excuses: location, revised ETA, cause, next action, and when you will update again.

Never escalate in a way that leaves the driver alone at a dark warehouse with no follow-up time.`,
      },
      {
        heading: "Desk checklist",
        body: `1. Log the four facts in the structured log (not only chat).
2. Open or update an escalation card with owner + severity.
3. Notify broker / shipper with a single clear message.
4. Set the next check time explicitly.
5. Put the open risk on the overnight handoff if unresolved.`,
      },
    ],
  },
  {
    slug: "overnight-handoff",
    title: "Overnight / multi-dispatcher handoffs",
    description:
      "Write handoffs as if the next person has zero context — the backbone of India overnight covering US business hours.",
    readingMinutes: 6,
    audience: "Remote desks · India G&A dispatch hiring",
    sections: [
      {
        heading: "Why handoffs fail",
        body: `Chat threads scroll. Tribal knowledge walks out when the shift ends. A remote desk only works when the next person can open one note and know: what is live, what is risky, and what was already promised.`,
      },
      {
        heading: "Required handoff fields",
        body: `• Truck / driver / load ID
• Last known location + time
• Appointment commitments
• Open risks (detention, weather, HOS, broker attitude)
• Next action already promised to someone
• What the day desk should not redo`,
      },
      {
        heading: "India overnight → Pacific morning pattern",
        body: `Group the board: CRITICAL / HIGH / WATCH / CLEAN. Put broker names and clock times in the critical block. Link POD status for delivered loads. Never leave a "we should probably call" without an owner and a time.`,
      },
    ],
  },
  {
    slug: "broker-update-tone",
    title: "Broker update tone that sticks",
    description:
      "SMS and email patterns for ETA changes, detention, and re-power — clear asks, no drama.",
    readingMinutes: 5,
    audience: "Dispatchers · broker relations",
    sections: [
      {
        heading: "Principles",
        body: `Lead with the load ref and the decision you need. Put ETA and cause in the first two lines. Offer one preferred option and one fallback. Say when you will update next. Avoid blame language toward shippers or drivers.`,
      },
      {
        heading: "ETA slip template (structure)",
        body: `Ref → Current location → Revised ETA vs appointment → Cause → Ask (confirm window / approve detention / move appt) → Next update time.

Example structure only — customize per broker relationship. See Templates for copy-ready drafts.`,
      },
      {
        heading: "What not to do",
        body: `Do not dump a paragraph of GPS history. Do not wait until the gate closes. Do not promise an ETA you have not confirmed with the driver in the last check-call.`,
      },
    ],
  },
];

export function getPlaybook(slug: string) {
  return playbooks.find((p) => p.slug === slug);
}
