# Check-Call Hub

Specialized portfolio product for **check-call discipline**, POD/media, escalations, and overnight shift handoffs — aimed at US dry-van desks and India overnight / Mohali–Chandigarh hiring audiences.

Distinct from **FreightOps** (full command center): this app goes deep on the check-call workflow only.

**Public portfolio demo** — interactive Next.js app with marketing, `/app` desk demo, playbooks, templates, and docs. Demo data only; not connected to live TMS / Sheets / ELD.

## Stack

- Next.js 14 App Router · TypeScript · Tailwind CSS · next-themes · Zustand (localStorage)

## Port

**3003** (Career HQ 3000 · FreightOps 3001 · Epocharium 3002)

```bash
npm install
npm run dev      # next dev -p 3003
npm run build
npm start        # next start -p 3003
```

## Routes

### Marketing
- `/` — product story, features, dual-market CTAs, career proof strip
- `/product` — feature deep dive
- `/markets` — US/EU vs India G&A / dispatch hiring
- `/pricing` — demo tiers (Starter / Desk / Fleet) — clearly labeled demo
- `/compare` — vs chat-only vs full TMS (honest)
- `/about` — builder Harinder Sidhu + Open to Work

### App (interactive demo)
- `/app` → redirects to `/app/queue`
- `/app/queue` — risk-prioritized check-call queue
- `/app/log` — structured four-field log form
- `/app/loads` · `/app/loads/[id]` — demo loads + timeline
- `/app/pod` — POD/media inbox
- `/app/escalations` — open risk board
- `/app/handoffs` — overnight handoff composer

### Knowledge
- `/playbooks` · `/playbooks/[slug]` — cadence, escalation, overnight-handoff, broker-update-tone
- `/templates` — call scripts + broker SMS/email (copy buttons)
- `/docs` · `/docs/[slug]` — architecture, data-model, demo-caveats

## Hard rules

- **Demo data only** — banner on `/app/*`; not connected to live TMS / Sheets / ELD
- **Never write** to the ORIGINAL Dispatch sheet or related ops-check originals
- Career metrics on About are CV proof (1,762 loads / $3.93M / $2,233 avg) — not product analytics

## A11y

Skip link, landmarks, `focus-visible`, `aria-pressed` filters, labeled forms with `aria-invalid`, dual-theme contrast, `prefers-reduced-motion`.

## License

Portfolio demo — source on GitHub for review. Not a production SaaS.
