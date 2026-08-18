import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { NAV, SITE } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-brand-deep text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl text-white">RSI</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              Rudrans Systematic Investment
            </span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            A modern wealth-creation partner helping families build financial confidence through
            disciplined investing, mutual funds and protection planning.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gold">
            {SITE.tagline}
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Navigate
          </div>
          <ul className="space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-white/70 hover:text-white transition">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4 space-y-4 text-sm">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            Reach us
          </div>
          <div className="flex items-start gap-3 text-white/70">
            <MapPin className="size-4 mt-0.5 shrink-0 text-brand-gold" />
            <span>
              {SITE.address.line1},<br />
              {SITE.address.line2},<br />
              {SITE.address.city}
            </span>
          </div>
          <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-3 text-white/70 hover:text-white">
            <Phone className="size-4 text-brand-gold" /> {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-white/70 hover:text-white break-all">
            <Mail className="size-4 text-brand-gold" /> {SITE.email}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-center justify-between gap-3 px-6 py-6 text-[11px] uppercase tracking-widest text-white/40">
          <span>© {new Date().getFullYear()} Rudrans Systematic Investment</span>
          <span>Mutual fund investments are subject to market risks.</span>
        </div>
      </div>
    </footer>
  );
}
