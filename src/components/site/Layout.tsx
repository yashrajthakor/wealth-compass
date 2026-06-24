import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { Loader } from "./Loader";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Loader />
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-brand-bg">
      <div className="absolute -top-32 -right-32 size-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">{eyebrow}</div>
        <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-ink max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg text-ink-muted leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
