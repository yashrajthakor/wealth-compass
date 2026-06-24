import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Compass,
  Target,
  Eye,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SERVICES, PRODUCTS, ARTICLES, TESTIMONIALS, JOURNEY, SITE } from "@/lib/site-data";
import heroImg from "@/assets/hero-dashboard.jpg";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rudrans Systematic Investment — Smart Wealth Creation" },
      {
        name: "description",
        content:
          "Build financial confidence with disciplined SIPs, mutual funds and protection planning. RSI helps Indian families turn consistent investing into generational wealth.",
      },
      { property: "og:title", content: "Rudrans Systematic Investment — Smart Wealth Creation" },
      {
        property: "og:description",
        content: "Modern wealth advisory built on discipline, transparency and long-term vision.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <WhyChoose />
      <About />
      <Journey />
      <ServicesSection />
      <ProductsSection />
      <Calculator />
      <Knowledge />
      <Testimonials />
      <FinalCTA />
    </SiteLayout>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-32 size-[500px] rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 -right-20 size-[600px] rounded-full bg-brand-gold/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 pt-20 pb-28 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand/5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.22em] text-brand">
            <Sparkles className="size-3" /> {SITE.tagline}
          </div>
          <h1 className="mt-8 font-display text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] text-ink">
            Your partner in <em className="text-brand not-italic font-display italic">smart wealth</em> creation.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-muted leading-relaxed">
            Helping individuals and families build financial confidence through disciplined investing,
            SIP planning, mutual funds and insurance solutions.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white shadow-glass transition hover:bg-brand-deep"
            >
              Start Your Investment Journey
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-sm font-semibold text-ink hover:bg-accent"
            >
              Talk To Advisor
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-glass">
            <img
              src={heroImg}
              alt="Wealth dashboard visualization"
              width={1280}
              height={1280}
              className="aspect-square w-full object-cover"
            />
          </div>

          <FloatingStat
            label="Goal Achievement"
            value="94.2%"
            className="absolute -top-6 -left-6"
            delay={0.4}
          />
          <FloatingStat
            label="Wealth Growth"
            value="+22.4%"
            tone="dark"
            className="absolute -bottom-6 -right-4"
            delay={0.8}
          />
          <FloatingStat
            label="SIP Investors"
            value="240+"
            className="absolute top-1/2 -right-8 hidden md:block"
            delay={0.6}
          />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingStat({
  label,
  value,
  className = "",
  tone = "light",
  delay = 0,
}: {
  label: string;
  value: string;
  className?: string;
  tone?: "light" | "dark";
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={`${className} animate-float`}
    >
      <div
        className={`rounded-2xl px-5 py-4 shadow-glass ${
          tone === "dark"
            ? "bg-brand-deep text-white"
            : "glass-panel text-ink"
        }`}
      >
        <div
          className={`font-mono text-[10px] uppercase tracking-widest ${
            tone === "dark" ? "text-white/60" : "text-ink-muted"
          }`}
        >
          {label}
        </div>
        <div
          className={`font-display text-2xl ${
            tone === "dark" ? "text-brand-gold" : "text-brand"
          }`}
        >
          {value}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Why Choose ---------- */
function WhyChoose() {
  const items = [
    { icon: Compass, title: "Personalized Guidance", desc: "Every plan starts with your story, not a template." },
    { icon: Target, title: "Goal-Based Planning", desc: "Investments engineered around the life you're building." },
    { icon: Eye, title: "Transparent Advisory", desc: "Honest conversations, no jargon, no hidden agendas." },
    { icon: RefreshCw, title: "Consistent Reviews", desc: "Periodic portfolio audits and disciplined rebalancing." },
    { icon: ShieldCheck, title: "Insurance Protection", desc: "Cover the downside so your wealth can grow upside." },
    { icon: TrendingUp, title: "Long-Term Wealth Focus", desc: "Compounding wins over speculation, every time." },
  ];
  return (
    <section className="border-y border-border bg-brand-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Rudrans"
          title="A calmer way to grow wealth."
          subtitle="Six commitments that shape every relationship and every portfolio we build."
        />
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="group bg-card p-8 transition hover:bg-brand-soft"
            >
              <it.icon className="size-7 text-brand transition group-hover:scale-110" />
              <h3 className="mt-5 font-display text-2xl text-ink">{it.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section className="py-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-5"
        >
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-glass">
              <img
                src={founderImg}
                alt="Dharmitsinh Solanki, Founder"
                width={1024}
                height={1280}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-panel rounded-2xl px-6 py-4 shadow-glass">
              <div className="font-display text-xl text-brand-deep">Dharmitsinh Solanki</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Founder · RSI</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-7"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">About Rudrans</div>
          <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[1] text-ink max-w-xl">
            Building wealth through <em className="italic text-brand">discipline</em> and vision.
          </h2>
          <div className="mt-8 space-y-5 text-base text-ink-muted leading-relaxed">
            <p>
              At Rudrans Systematic Investment, we believe successful investing is built on consistency,
              informed decisions and long-term planning.
            </p>
            <p>
              We work closely with individuals and families to design financial strategies that align with
              their goals, helping them create wealth, manage risk and achieve greater financial confidence.
            </p>
          </div>
          <Link
            to="/who-we-are"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all"
          >
            Read our philosophy <ArrowUpRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Journey ---------- */
function Journey() {
  return (
    <section className="border-y border-border bg-brand-deep py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-gold">
            The Wealth Cycle
          </div>
          <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[1]">
            Five stages from <em className="italic text-brand-gold">ambition to abundance</em>.
          </h2>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-5">
          {JOURNEY.map((j, i) => (
            <motion.div
              key={j.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="relative"
            >
              <div className="font-display text-5xl text-white/20">0{i + 1}</div>
              <div className="mt-3 font-display text-2xl text-white">{j.step}</div>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{j.desc}</p>
              {i < JOURNEY.length - 1 && (
                <div className="absolute top-7 -right-5 hidden md:block text-brand-gold/40">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function ServicesSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="What we do"
            title="End-to-end advisory."
            subtitle="From the first SIP to a fully orchestrated wealth plan."
          />
          <Link
            to="/services"
            className="text-sm font-semibold text-brand hover:underline underline-offset-4"
          >
            All services →
          </Link>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.slice(0, 8).map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-brand">0{i + 1}</div>
              <h3 className="mt-4 font-display text-2xl text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Products ---------- */
function ProductsSection() {
  return (
    <section className="border-y border-border bg-brand-bg py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Product universe"
          title="A curated set of instruments."
          subtitle="Each product fits a role — growth, protection, tax efficiency or income."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-12">
          {PRODUCTS.slice(0, 7).map((p, i) => {
            const span = i === 0 ? "md:col-span-8" : i === 1 ? "md:col-span-4" : i === 2 ? "md:col-span-4" : i === 3 ? "md:col-span-4" : i === 4 ? "md:col-span-4" : "md:col-span-6";
            const dark = i === 1 || i === 4;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className={`${span} ${dark ? "bg-brand-deep text-white" : "glass-panel"} rounded-3xl p-7 transition hover:-translate-y-1`}
              >
                <div className={`font-mono text-[10px] uppercase tracking-widest ${dark ? "text-brand-gold" : "text-brand"}`}>
                  Product 0{i + 1}
                </div>
                <h3 className={`mt-3 font-display text-3xl ${dark ? "text-white" : "text-ink"}`}>
                  {p.title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${dark ? "text-white/70" : "text-ink-muted"}`}>
                  {p.overview}
                </p>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link to="/products" className="text-sm font-semibold text-brand hover:underline underline-offset-4">
            Explore all products →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Calculator ---------- */
function Calculator() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(15);
  const rate = 0.12;
  const months = years * 12;
  const monthlyRate = rate / 12;
  const fv = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const formatted = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(fv));

  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-brand-deep p-10 md:p-16 text-white relative">
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-gold">
                Mini SIP Calculator
              </div>
              <h2 className="mt-5 font-display text-5xl leading-[1]">
                See your future <em className="italic text-brand-gold">stack up</em>.
              </h2>
              <p className="mt-5 text-white/60 max-w-md">
                Small, consistent contributions compound into substantial wealth. Try it.
              </p>
              <div className="mt-10 space-y-7">
                <Slider
                  label="Monthly Investment"
                  value={`₹ ${monthly.toLocaleString("en-IN")}`}
                  min={500}
                  max={100000}
                  step={500}
                  v={monthly}
                  onChange={setMonthly}
                />
                <Slider
                  label="Time Horizon"
                  value={`${years} Years`}
                  min={1}
                  max={30}
                  step={1}
                  v={years}
                  onChange={setYears}
                />
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center flex flex-col justify-center">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                Estimated Future Value
              </div>
              <div className="mt-3 font-display text-6xl md:text-7xl text-brand-gold">
                ₹ {formatted}
              </div>
              <p className="mt-6 text-[10px] font-mono uppercase tracking-widest text-white/40">
                Assuming 12% annualized returns
              </p>
              <Link
                to="/resources"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-deep hover:bg-white transition"
              >
                Full Calculators <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label, value, min, max, step, v, onChange,
}: {
  label: string; value: string; min: number; max: number; step: number; v: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">{label}</span>
        <span className="font-display text-xl text-brand-gold">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-gold"
      />
    </div>
  );
}

/* ---------- Knowledge ---------- */
function Knowledge() {
  return (
    <section className="border-t border-border bg-brand-bg py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <SectionHeading
            eyebrow="Knowledge Center"
            title="Investor education."
            subtitle="Clear, jargon-free perspectives on building wealth that lasts."
          />
          <Link to="/resources" className="text-sm font-semibold text-brand hover:underline underline-offset-4">
            All articles →
          </Link>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {ARTICLES.slice(0, 3).map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-brand/15 via-brand-soft to-brand-gold/15 grid place-items-center text-7xl font-display text-brand/30 transition group-hover:scale-[1.02]">
                {i === 0 ? "↗" : i === 1 ? "₹" : "△"}
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                {a.read}
              </div>
              <h3 className="mt-2 font-display text-2xl text-ink group-hover:text-brand transition">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{a.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Investor Stories"
          title="Trust, earned over years."
          subtitle="Real words from families and professionals partnering with RSI."
        />
      </div>
      <div className="mt-16 relative">
        <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((t, i) => (
            <div
              key={i}
              className="w-[380px] shrink-0 rounded-3xl border border-border bg-card p-8 shadow-soft"
            >
              <div className="font-display text-4xl text-brand leading-none">"</div>
              <p className="mt-3 text-base leading-relaxed text-ink">{t.quote}</p>
              <div className="mt-6 pt-5 border-t border-border">
                <div className="font-display text-lg text-ink">{t.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-[2.5rem] border border-border bg-card p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-32 -left-32 size-80 bg-brand/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 size-80 bg-brand-gold/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-5xl md:text-6xl leading-[1] text-ink">
              Ready to build your <em className="italic text-brand">financial future</em>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink-muted">
              Take the first step toward your goals with expert guidance and a structured investment plan
              tailored to your life.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white shadow-glass hover:bg-brand-deep transition"
            >
              Book a Consultation <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section Heading ---------- */
function SectionHeading({
  eyebrow, title, subtitle,
}: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">{eyebrow}</div>
      <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[1] text-ink">{title}</h2>
      {subtitle && <p className="mt-5 text-ink-muted">{subtitle}</p>}
    </div>
  );
}
