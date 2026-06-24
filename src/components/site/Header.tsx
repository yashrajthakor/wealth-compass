import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV } from "@/lib/site-data";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-9 text-sm font-medium md:flex">
          {NAV.slice(1).map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative transition-colors hover:text-brand ${
                  active ? "text-brand" : "text-ink-muted"
                }`}
              >
                {n.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-brand-deep hover:shadow-glass"
          >
            Book Consultation
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-full border border-border p-2 text-ink"
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col px-6 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-ink"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
