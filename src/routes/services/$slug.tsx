import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) return {};
    return {
      meta: [
        { title: `${service.title} — RSI Services` },
        { name: "description", content: service.overview.slice(0, 155) },
        { property: "og:title", content: `${service.title} — Rudrans Systematic Investment` },
        { property: "og:url", content: `/services/${service.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${service.slug}` }],
    };
  },
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return service;
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const service = Route.useLoaderData();

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={service.heroImage} alt={service.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-brand-deep/85" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-40 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/50 font-mono text-[10px] uppercase tracking-widest mb-4">
              <Link to="/services" className="hover:text-white transition">Services</Link>
              <ChevronRight className="size-3" />
              <span className="text-white">{service.title}</span>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-gold">{service.tagline}</div>
            <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.95] text-white max-w-4xl">{service.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Overview</div>
            <h2 className="mt-4 font-display text-4xl text-ink">What this service covers</h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">{service.overview}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 space-y-4 h-fit">
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand">Best suited for</div>
            <p className="text-ink leading-relaxed">{service.suited}</p>
            <div className="pt-4 border-t border-border">
              <Link
                to="/contact"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep transition"
              >
                Get This Service <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-border bg-brand-bg py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">What's Included</div>
          <h2 className="mt-4 font-display text-4xl text-ink">Key features & deliverables</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.highlights.map((h: string, i: number) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <CheckCircle2 className="size-5 text-brand shrink-0 mt-0.5" />
                <span className="text-sm text-ink leading-relaxed">{h}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">How It Works</div>
          <h2 className="mt-4 font-display text-4xl text-ink">Our step-by-step process</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-5">
            {service.process.map((p: { step: string; desc: string }, i: number) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <div className="font-display text-5xl text-brand/15">0{i + 1}</div>
                <div className="mt-2 font-display text-xl text-ink">{p.step}</div>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.desc}</p>
                {i < service.process.length - 1 && (
                  <div className="absolute top-6 -right-3 hidden md:block text-border text-xl">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faq && service.faq.length > 0 && (
        <section className="border-t border-border bg-brand-bg py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">FAQ</div>
            <h2 className="mt-4 font-display text-4xl text-ink">Common questions</h2>
            <div className="mt-10 space-y-4">
              {service.faq.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Related Services</div>
          <h2 className="mt-4 font-display text-4xl text-ink">You might also need</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3).map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card hover:border-brand/30 hover:shadow-soft transition"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-ink group-hover:text-brand transition">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{s.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand">
                      Learn more <ArrowRight className="size-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-deep py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-5xl">Start with {service.title}</h2>
          <p className="mt-5 text-white/60">Book a free consultation — no obligation, no fee. Just clarity on your next financial step.</p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-sm font-semibold text-brand-deep hover:bg-white transition"
          >
            Book Free Consultation <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-brand-bg transition"
      >
        <span className="font-display text-lg text-ink">{q}</span>
        <ChevronDown className={`size-5 text-brand shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 text-ink-muted leading-relaxed border-t border-border pt-4">{a}</div>
      )}
    </div>
  );
}
