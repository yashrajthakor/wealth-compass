import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Target, Eye, Heart } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { VALUES } from "@/lib/site-data";

export const Route = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [
      { title: "Who We Are — Rudrans Systematic Investment" },
      { name: "description", content: "Our mission, vision, values and investment philosophy at RSI." },
      { property: "og:title", content: "Who We Are — Rudrans Systematic Investment" },
      { property: "og:description", content: "Trust, integrity and long-term wealth creation define how we work." },
      { property: "og:url", content: "/who-we-are" },
    ],
    links: [{ rel: "canonical", href: "/who-we-are" }],
  }),
  component: WhoWeAre,
});

function WhoWeAre() {
  const philosophy = [
    "Long-term wealth creation",
    "Goal-based investing",
    "Risk management as a discipline",
    "Consistency over speculation",
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Who We Are"
        title={<>A wealth partner, not just a <em className="italic text-brand">distributor</em>.</>}
        subtitle="Rudrans Systematic Investment was founded with a simple conviction: most Indian families don't need more products, they need clearer plans. We exist to deliver that clarity."
      />

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-2">
          <Card icon={Target} title="Mission" body="To help individuals and families achieve financial confidence through disciplined investing and informed financial planning." />
          <Card icon={Eye} title="Vision" body="To become a trusted wealth-creation partner for every family we serve — across goals, generations and life stages." />
        </div>
      </section>

      <section className="border-y border-border bg-brand-bg py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Core Values</div>
          <h2 className="mt-5 font-display text-5xl md:text-6xl text-ink max-w-2xl">
            The principles behind every decision.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-card p-8 text-center"
              >
                <div className="font-display text-5xl text-brand">0{i + 1}</div>
                <div className="mt-4 font-display text-2xl text-ink">{v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">
              Investment Philosophy
            </div>
            <h2 className="mt-5 font-display text-5xl md:text-6xl text-ink">
              Compounding rewards <em className="italic text-brand">patience</em>.
            </h2>
            <p className="mt-6 text-ink-muted leading-relaxed max-w-md">
              We don't chase momentum or time the market. We design portfolios that survive volatility
              and let time do its quiet work.
            </p>
          </div>
          <ul className="space-y-4">
            {philosophy.map((p) => (
              <li key={p} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <Heart className="size-5 text-brand" />
                <span className="font-display text-xl text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}

function Card({ icon: Icon, title, body }: { icon: typeof Target; title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-10 shadow-soft">
      <Icon className="size-8 text-brand" />
      <h3 className="mt-6 font-display text-4xl text-ink">{title}</h3>
      <p className="mt-4 text-ink-muted leading-relaxed">{body}</p>
    </div>
  );
}
