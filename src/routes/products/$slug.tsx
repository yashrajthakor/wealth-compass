import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PRODUCTS } from "@/lib/site-data";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) return {};
    return {
      meta: [
        { title: `${product.title} — RSI Products` },
        { name: "description", content: product.overview.slice(0, 155) },
        { property: "og:title", content: `${product.title} — Rudrans Systematic Investment` },
        { property: "og:url", content: `/products/${product.slug}` },
      ],
      links: [{ rel: "canonical", href: `/products/${product.slug}` }],
    };
  },
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return product;
  },
  component: ProductDetail,
});

function ProductDetail() {
  const product = Route.useLoaderData();

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={product.heroImage} alt={product.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-brand-deep/85" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-40 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-2 text-white/50 font-mono text-[10px] uppercase tracking-widest mb-4">
              <Link to="/products" className="hover:text-white transition">Products</Link>
              <ChevronRight className="size-3" />
              <span className="text-white">{product.title}</span>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-gold">{product.tagline}</div>
            <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.95] text-white max-w-4xl">{product.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Quick stats bar */}
      <div className="border-b border-border bg-brand-bg">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-wrap gap-8">
            {[
              { label: "Min. Investment", val: product.minInvestment },
              { label: "Risk Level", val: product.riskLevel },
              { label: "Recommended Horizon", val: product.horizon },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">{s.label}</div>
                <div className="font-display text-lg text-ink mt-0.5">{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overview + suited */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">What is it?</div>
              <h2 className="mt-4 font-display text-4xl text-ink">About this product</h2>
              <p className="mt-5 text-lg text-ink-muted leading-relaxed">{product.overview}</p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Why Choose This</div>
              <p className="mt-4 text-ink-muted leading-relaxed">{product.whyChoose}</p>
            </div>
          </div>
          <div className="space-y-4 h-fit">
            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="font-mono text-[10px] uppercase tracking-widest text-brand">Key Benefits</div>
              <ul className="mt-4 space-y-3">
                {product.benefits.map((b: string) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-ink">
                    <CheckCircle2 className="size-4 text-brand shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8">
              <div className="font-mono text-[10px] uppercase tracking-widest text-brand">Suited For</div>
              <p className="mt-3 text-sm text-ink leading-relaxed">{product.suited}</p>
            </div>
            <Link
              to="/contact"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-deep transition"
            >
              Start Investing <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Types / Sub-products */}
      {product.types && product.types.length > 0 && (
        <section className="border-y border-border bg-brand-bg py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Types & Variants</div>
            <h2 className="mt-4 font-display text-4xl text-ink">Choose what fits you</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {product.types.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl border border-border bg-card p-6 hover:border-brand/30 hover:shadow-soft transition"
                >
                  <div className="font-display text-3xl text-brand/20">0{i + 1}</div>
                  <h3 className="mt-3 font-display text-xl text-ink">{t.name}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Related Products</div>
          <h2 className="mt-4 font-display text-4xl text-ink">Complete your portfolio</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3).map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card hover:border-brand/30 hover:shadow-soft transition"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl text-ink group-hover:text-brand transition">{p.title}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{p.tagline}</p>
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
          <h2 className="font-display text-5xl">Ready to invest in {product.title}?</h2>
          <p className="mt-5 text-white/60">Book a free consultation — our advisor will guide you through the right approach for your goals.</p>
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
