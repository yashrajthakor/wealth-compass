import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Target, Eye, Heart, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { VALUES, TEAM } from "@/lib/site-data";

export const Route = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [
      { title: "Who We Are — Rudrans Systematic Investment" },
      { name: "description", content: "Meet the team behind RSI — Dharmitsinh Solanki and Suresh Sharma. Our mission, vision, values and investment philosophy." },
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
    "Long-term wealth creation through disciplined investing",
    "Goal-based planning — every rupee has a purpose",
    "Risk management as a non-negotiable discipline",
    "Consistency and patience over speculation",
  ];

  return (
    <SiteLayout>
      {/* Hero with background image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
            alt="Team at work"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-deep/80" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-40 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-gold">Who We Are</div>
            <h1 className="mt-5 font-display text-5xl md:text-7xl leading-[0.95] text-white max-w-4xl">
              A wealth partner, not just a <em className="italic text-brand-gold">distributor.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              Rudrans Systematic Investment was founded with a simple conviction: most Indian families don't need more products, they need clearer plans. We exist to deliver that clarity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 md:grid-cols-2">
          <Card
            icon={Target}
            title="Our Mission"
            body="To help individuals and families achieve financial confidence through disciplined investing and informed financial planning — with complete transparency and zero conflict of interest."
          />
          <Card
            icon={Eye}
            title="Our Vision"
            body="To become the most trusted wealth-creation partner for every family we serve — across goals, generations and life stages — so that financial anxiety becomes a thing of the past."
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="border-y border-border bg-brand-bg py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Our Team</div>
            <h2 className="mt-5 font-display text-5xl md:text-6xl text-ink">
              Experts who put your <em className="italic text-brand">goals first.</em>
            </h2>
            <p className="mt-5 text-ink-muted">
              Every client relationship is backed by years of specialised expertise, genuine care and an unwavering commitment to your financial well-being.
            </p>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="rounded-3xl border border-border bg-card overflow-hidden shadow-soft"
              >
                <div className="grid md:grid-cols-5">
                  {/* Photo */}
                  <div className="md:col-span-2">
                    {member.image ? (
                      <div className="h-72 md:h-full overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="h-72 md:h-full bg-gradient-to-br from-brand/20 via-brand-soft to-brand-gold/20 grid place-items-center">
                        <div className="text-center">
                          <div className="font-display text-7xl text-brand/40">
                            {member.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink-muted">Photo Coming Soon</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="md:col-span-3 p-8 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-brand">{member.role}</div>
                      <h3 className="mt-2 font-display text-3xl text-ink">{member.name}</h3>
                      <p className="mt-4 text-sm text-ink-muted leading-relaxed">{member.bio}</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {member.credentials.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest bg-brand-bg border border-border rounded-full px-3 py-1.5 text-brand"
                        >
                          <Award className="size-3" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
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
                className="bg-card p-8 text-center hover:bg-brand-soft transition group"
              >
                <div className="font-display text-5xl text-brand/20 group-hover:text-brand/40 transition">0{i + 1}</div>
                <div className="mt-4 font-display text-2xl text-ink">{v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="border-y border-border bg-brand-bg py-24">
        <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">
              Investment Philosophy
            </div>
            <h2 className="mt-5 font-display text-5xl md:text-6xl text-ink">
              Compounding rewards <em className="italic text-brand">patience.</em>
            </h2>
            <p className="mt-6 text-ink-muted leading-relaxed max-w-md">
              We don't chase momentum or try to time the market. We design portfolios that survive volatility, reward discipline and let time do its quiet, powerful work. Our clients don't speculate — they build.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all"
            >
              Talk to us about your philosophy <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="space-y-4">
            {philosophy.map((p) => (
              <li key={p} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-brand/30 hover:shadow-soft transition">
                <CheckCircle2 className="size-5 text-brand shrink-0" />
                <span className="font-display text-xl text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-5xl md:text-6xl text-ink">
            Ready to work with <em className="italic text-brand">trusted advisors</em>?
          </h2>
          <p className="mt-6 text-ink-muted max-w-xl mx-auto">
            Book a free, no-obligation consultation with Dharmitsinh and the RSI team. We'll listen first, then plan.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white shadow-glass hover:bg-brand-deep transition"
          >
            Book a Free Consultation <ArrowRight className="size-4" />
          </Link>
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
