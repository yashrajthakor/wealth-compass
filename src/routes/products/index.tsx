import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PRODUCTS } from "@/lib/site-data";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Rudrans Systematic Investment" },
      { name: "description", content: "Mutual funds, SIP, ELSS, health insurance, life insurance, retirement and child planning solutions — curated for investors." },
      { property: "og:title", content: "Products — Rudrans Systematic Investment" },
      { property: "og:description", content: "Targeted investment solutions to scale your net worth and secure your future." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SiteLayout>
      {/* Hero with background image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1600&q=80"
            alt="Investment products"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-deep/80" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-40 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-gold">Products</div>
            <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[0.95] text-white max-w-4xl">
              Targeted solutions to <em className="italic text-brand-gold">optimise your investments.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              Scale your net worth and secure your future with a carefully curated set of investment and protection instruments — each serving a specific role in your financial plan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-brand-bg border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="font-display text-4xl text-ink">Your Path to Financial Freedom</h2>
          <p className="mt-4 max-w-2xl mx-auto text-ink-muted">
            Discover a suite of investment solutions designed to bring you closer to multi-generational wealth. From optimising asset allocation to finding diversified investment options, our products cover everything you need.
          </p>
        </div>
      </section>

      {/* Products list — alternating layout */}
      <section className="py-8">
        {PRODUCTS.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-2 lg:items-center border-b border-border last:border-b-0"
          >
            {/* Image */}
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative overflow-hidden rounded-3xl shadow-glass">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full aspect-[4/3] object-cover transition hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white/60">Min. Investment</div>
                  <div className="font-display text-xl text-white">{p.minInvestment}</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">{p.tagline}</div>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-ink leading-[1]">{p.title}</h2>
              <p className="mt-5 text-ink-muted leading-relaxed">{p.overview}</p>
              <ul className="mt-6 space-y-2">
                {p.benefits.slice(0, 4).map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-ink">
                    <CheckCircle2 className="size-4 text-brand shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
              {/* Meta pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest bg-brand-bg border border-border rounded-full px-3 py-1.5 text-ink-muted">
                  Risk: {p.riskLevel}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest bg-brand-bg border border-border rounded-full px-3 py-1.5 text-ink-muted">
                  Horizon: {p.horizon}
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep transition"
                >
                  Learn More <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-ink hover:bg-accent transition"
                >
                  Invest Now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-brand-deep py-20 text-white text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-5xl">Not sure which product is right for you?</h2>
          <p className="mt-5 text-white/60 max-w-xl mx-auto">Our advisors help you match the right instruments to your goals, risk tolerance and time horizon — at zero advisory fee.</p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-sm font-semibold text-brand-deep hover:bg-white transition"
          >
            Get a Product Recommendation <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
