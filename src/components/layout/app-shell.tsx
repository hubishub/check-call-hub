"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  BookOpen,
  ClipboardList,
  FileImage,
  Home,
  Menu,
  Moon,
  PhoneCall,
  RefreshCw,
  Sun,
  Truck,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { appNav } from "@/data/site";
import { DemoBanner } from "@/components/ui/demo-banner";
import { useHubStore } from "@/store/hub-store";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  "/app/queue": PhoneCall,
  "/app/log": ClipboardList,
  "/app/loads": Truck,
  "/app/pod": FileImage,
  "/app/escalations": AlertTriangle,
  "/app/handoffs": BookOpen,
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // CCH-008: Escape closes the mobile nav and returns focus to the opener.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);
  const resetDemo = useHubStore((s) => s.resetDemo);
  const setHydrated = useHubStore((s) => s.setHydrated);

  useEffect(() => {
    setMounted(true);
    setHydrated(true);
  }, [setHydrated]);

  const dark = resolvedTheme === "dark";

  return (
    <div className="flex min-h-screen bg-surface text-fg">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-surface-raised md:flex">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white dark:bg-teal-800">
            <PhoneCall className="h-4 w-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold">Check-Call Hub</div>
            <div className="text-[10px] uppercase tracking-wider text-fg-subtle">Ops desk</div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="App">
          {appNav.map((item) => {
            const Icon = icons[item.href] ?? PhoneCall;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  active
                    ? "bg-teal-100 text-teal-900 dark:bg-teal-500/20 dark:text-teal-200"
                    : "text-fg-muted hover:bg-surface-sunken hover:text-fg"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {item.label}
              </Link>
            );
          })}
          <div className="my-2 border-t border-border" />
          <Link
            href="/"
            className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted hover:bg-surface-sunken hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Home className="h-4 w-4" aria-hidden />
            Marketing site
          </Link>
          <button
            type="button"
            onClick={() => resetDemo()}
            className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-fg-muted hover:bg-surface-sunken hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Reset demo data
          </button>
        </nav>
        <div className="border-t border-border p-3 text-[10px] text-fg-subtle">
          Portfolio demo · Sample data only
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <DemoBanner />
        <header className="flex h-12 items-center justify-between gap-3 border-b border-border px-4">
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-expanded={mobileOpen}
              ref={menuButtonRef}
              aria-controls="app-mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <span className="text-sm font-semibold">Check-Call Hub</span>
          </div>
          <p className="hidden text-sm text-fg-muted md:block">
            Structured check-calls · POD · escalations · handoffs
          </p>
          <button
            type="button"
            onClick={() => setTheme(dark ? "light" : "dark")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label={mounted ? (dark ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
            aria-pressed={mounted ? dark : undefined}
          >
            {mounted && dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        {mobileOpen && (
          <nav
            id="app-mobile-nav"
            className="border-b border-border bg-surface-raised px-3 py-2 md:hidden"
            aria-label="App mobile"
          >
            <ul className="flex flex-col gap-1">
              {appNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-3 text-sm text-fg-muted hover:bg-surface-sunken"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
