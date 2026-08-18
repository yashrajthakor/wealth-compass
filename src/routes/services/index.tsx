import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Rudrans Systematic Investment" },
      { name: "description", content: "Financial architecture, SIP advisory, mutual fund distribution, insurance, tax and retirement planning — tailored for families." },
      { property: "og:title", content: "Services — Rudrans Systematic Investment" },
      { property: "og:description", content: "Achieve financial success with services tailored to your goals and life stage." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      {/* Hero with background image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
            alt="Financial advisory"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-deep/80" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-40 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-gold">Services</div>
            <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[0.95] text-white max-w-4xl">
              Achieve financial success with <em className="italic text-brand-gold">tailored services.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              From building optimal investment strategies to protecting your family's future — our experts guide you through every step of your financial journey with focused, personalised services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro banner */}
      <section className="bg-brand-bg border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-display text-4xl text-ink">Covering All Your Financial Needs</h2>
          <p className="mt-4 max-w-2xl mx-auto text-ink-muted">
            From building optimal investment portfolios to drafting a comprehensive protection plan, our experts guide you through every financial decision with effective, targeted advice.
          </p>
        </div>
      </section>

      {/* Services list — alternating layout */}
      <section className="py-8">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-2 lg:items-center border-b border-border last:border-b-0 ${i % 2 === 1 ? "" : ""}`}
          >
            {/* Image */}
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative overflow-hidden rounded-3xl shadow-glass">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full aspect-[4/3] object-cover transition hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">{s.tagline}</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-ink leading-[1]">{s.title}</h2>
              <p className="mt-5 text-ink-muted leading-relaxed">{s.overview}</p>
              <ul className="mt-6 space-y-2">
                {s.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-ink">
                    <CheckCircle2 className="size-4 text-brand shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep transition"
                >
                  Learn More <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-ink hover:bg-accent transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-brand-deep py-20 text-white text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-5xl">Ready to get started?</h2>
          <p className="mt-5 text-white/60 max-w-xl mx-auto">Book a free consultation and let us build a plan around your goals — at zero advisory fee.</p>
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
