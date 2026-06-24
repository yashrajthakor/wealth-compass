import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Rudrans Systematic Investment" },
      { name: "description", content: "Financial planning, SIP advisory, mutual fund distribution, insurance, tax and retirement planning." },
      { property: "og:title", content: "Services — Rudrans Systematic Investment" },
      { property: "og:description", content: "End-to-end advisory across every stage of your financial life." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

function Services() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title={<>End-to-end advisory across <em className="italic text-brand">every life stage</em>.</>}
        subtitle="One relationship, one disciplined plan, every financial decision handled."
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="group bg-card p-10 transition hover:bg-brand-soft"
              >
                <div className="flex items-start gap-6">
                  <div className="font-display text-5xl text-brand/30 group-hover:text-brand transition">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-ink">{s.title}</h3>
                    <p className="mt-3 text-ink-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
