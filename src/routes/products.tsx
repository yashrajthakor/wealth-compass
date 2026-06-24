import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { PRODUCTS } from "@/lib/site-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Rudrans Systematic Investment" },
      { name: "description", content: "Mutual funds, SIPs, ELSS, insurance and retirement solutions curated for Indian investors." },
      { property: "og:title", content: "Products — Rudrans Systematic Investment" },
      { property: "og:description", content: "A curated set of growth, protection and income instruments." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

function Products() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Products"
        title={<>A curated <em className="italic text-brand">universe</em> of instruments.</>}
        subtitle="Each product fits a role in a complete plan — growth, protection, tax efficiency or income."
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 space-y-6">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="grid gap-8 rounded-3xl border border-border bg-card p-10 md:grid-cols-12"
            >
              <div className="md:col-span-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand">
                  Product {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-display text-4xl text-ink">{p.title}</h3>
              </div>
              <div className="md:col-span-5">
                <p className="text-ink-muted leading-relaxed">{p.overview}</p>
                <ul className="mt-5 space-y-2">
                  {p.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-ink">
                      <Check className="size-4 text-brand" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-3 md:border-l md:pl-8 border-border">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
                  Suited for
                </div>
                <p className="mt-3 font-display text-xl text-brand-deep leading-snug">{p.suited}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
