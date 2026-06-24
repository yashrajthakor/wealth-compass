import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
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
  ChevronDown,
  CheckCircle2,
  Users,
  Award,
  BarChart3,
  Star,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SERVICES, PRODUCTS, ARTICLES, TESTIMONIALS, JOURNEY, SITE } from "@/lib/site-data";
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
      <TrustBar />
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

/* ---------- Hero Slides Data ---------- */
const HERO_SLIDES = [
  {
    eyebrow: "Your Wealth, Your Future",
    headline: ["Helping Indian families", "build", "multi-generational wealth."],
    accent: "build",
    sub: "Disciplined SIP planning, curated mutual funds, and comprehensive insurance — all under one trusted roof in Surat.",
    cta: "Start Your SIP Today",
    bg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80",
  },
  {
    eyebrow: "Think Beyond Limits",
    headline: ["Turn ₹500/month into", "your", "financial freedom."],
    accent: "your",
    sub: "Small, consistent investments compound into life-changing wealth over time. Rupee-cost averaging, expert fund selection and goal-linked planning — all working together for you.",
    cta: "Calculate Your Returns",
    bg: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80",
  },
  {
    eyebrow: "Expert-Led Advisory",
    headline: ["Personalized plans.", "Zero jargon.", "Real results."],
    accent: "Real results.",
    sub: "Every portfolio is built around your goals — retirement, children's education, home purchase, or legacy creation. We listen first, then plan.",
    cta: "Book Free Consultation",
    bg: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&q=80",
  },
  {
    eyebrow: "Complete Financial Protection",
    headline: ["Grow wealth.", "Protect your", "family's future."],
    accent: "family's future.",
    sub: "From ELSS tax-saving funds to term insurance and health covers — a holistic approach that builds and protects your family simultaneously.",
    cta: "Explore Our Solutions",
    bg: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=1600&q=80",
  },
];

/* ---------- Hero ---------- */
function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % HERO_SLIDES.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const slide = HERO_SLIDES[current];

  const scrollToContent = () => {
    const el = document.getElementById("trust-bar");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden">
      {/* Full-bleed background image per slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current + "-bg"}
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src={slide.bg}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-deep/75" />
        </motion.div>
      </AnimatePresence>

      {/* Main content */}
      <div className="mx-auto flex-1 grid max-w-7xl gap-12 px-6 pt-16 pb-10 lg:grid-cols-2 lg:items-center w-full">
        {/* Left — text */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current + "-text"}
              initial={{ opacity: 0, y: direction * 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -30 }}
              transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.22em] text-brand-gold backdrop-blur-sm">
                <Sparkles className="size-3" /> {slide.eyebrow}
              </div>

              <h1 className="mt-7 font-display text-5xl md:text-6xl lg:text-[5rem] leading-[0.97] text-white">
                {slide.headline.map((line, i) =>
                  line === slide.accent ? (
                    <em key={i} className="text-brand-gold not-italic font-display italic">
                      {line}{" "}
                    </em>
                  ) : (
                    <span key={i}>{line} </span>
                  )
                )}
              </h1>

              <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">{slide.sub}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-gold px-7 py-4 text-sm font-semibold text-brand-deep shadow-glass transition hover:bg-white"
                >
                  {slide.cta}
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/who-we-are"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white hover:bg-white/20 backdrop-blur-sm transition"
                >
                  Learn About RSI
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide dots */}
          <div className="mt-10 flex items-center gap-3">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`transition-all rounded-full ${
                  i === current
                    ? "w-8 h-2 bg-brand-gold"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
            <span className="ml-2 font-mono text-[10px] text-white/40 uppercase tracking-widest">
              {String(current + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Right — rotating cards */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current + "-card"}
              initial={{ opacity: 0, x: direction * 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -40, scale: 0.97 }}
              transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
              className="w-full max-w-sm"
            >
              <HeroCard index={current} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Auto-scroll cue */}
      <div className="flex justify-center pb-8">
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition group"
          aria-label="Scroll down"
        >
          <span className="font-mono text-[9px] uppercase tracking-widest">Explore More</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown className="size-5" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}

/* Hero rotating info card */
function HeroCard({ index }: { index: number }) {
  const cards = [
    /* Card 0 — SIP snapshot */
    <div className="rounded-3xl border border-border bg-card shadow-glass p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">SIP Portfolio Snapshot</div>
        <span className="text-[10px] font-mono bg-green-50 text-green-600 border border-green-200 rounded-full px-2 py-0.5">Live</span>
      </div>
      <div className="space-y-3">
        {[
          { fund: "Large Cap Fund", growth: "+18.4%", color: "bg-brand" },
          { fund: "Flexi Cap Fund", growth: "+24.1%", color: "bg-brand-gold" },
          { fund: "ELSS Tax Saver", growth: "+21.7%", color: "bg-brand-deep" },
        ].map((f) => (
          <div key={f.fund} className="flex items-center gap-3">
            <div className={`h-2 rounded-full ${f.color}`} style={{ width: `${parseFloat(f.growth) * 3}px` }} />
            <div className="flex-1 flex justify-between text-sm">
              <span className="text-ink-muted">{f.fund}</span>
              <span className="font-semibold text-green-600">{f.growth}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-border flex items-center justify-between">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">Total Invested</div>
          <div className="font-display text-2xl text-ink">₹18,00,000</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">Current Value</div>
          <div className="font-display text-2xl text-brand">₹26,40,000</div>
        </div>
      </div>
    </div>,

    /* Card 1 — SIP calculator preview */
    <div className="rounded-3xl bg-brand-deep text-white shadow-glass p-8 space-y-5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gold">₹5,000/month SIP · 10 years</div>
      <div className="text-center py-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">Grows Into</div>
        <div className="font-display text-6xl text-brand-gold mt-2">₹11.6L</div>
        <div className="font-mono text-[10px] text-white/40 mt-2">At 12% annualized returns</div>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10">
        {[
          { label: "Invested", val: "₹6L" },
          { label: "Gain", val: "₹5.6L" },
          { label: "Return", val: "93.4%" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-xl text-white">{s.val}</div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-white/40 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      <Link to="/resources" className="block text-center text-[11px] font-mono uppercase tracking-widest text-brand-gold hover:text-white transition pt-1">
        Try Full Calculator →
      </Link>
    </div>,

    /* Card 2 — services */
    <div className="rounded-3xl border border-border bg-card shadow-glass p-8 space-y-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-brand">What We Offer</div>
      <div className="space-y-3">
        {[
          { icon: TrendingUp, label: "SIP & Mutual Fund Advisory", badge: "Most Popular" },
          { icon: ShieldCheck, label: "Insurance Planning", badge: "Essential" },
          { icon: Target, label: "Goal-Based Financial Planning", badge: "Personalized" },
          { icon: RefreshCw, label: "Portfolio Review & Rebalancing", badge: "Quarterly" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl bg-brand-bg hover:bg-brand-soft transition">
            <s.icon className="size-4 text-brand shrink-0" />
            <span className="text-sm text-ink flex-1">{s.label}</span>
            <span className="text-[9px] font-mono uppercase tracking-wide text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-full">{s.badge}</span>
          </div>
        ))}
      </div>
    </div>,

    /* Card 3 — trust stats */
    <div className="rounded-3xl border border-border bg-card shadow-glass p-8 space-y-6">
      <div className="font-mono text-[10px] uppercase tracking-widest text-brand">RSI By Numbers</div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Users, val: "240+", label: "Happy Investors" },
          { icon: Award, val: "8+ Yrs", label: "Advisory Experience" },
          { icon: BarChart3, val: "94.2%", label: "Goal Achievement" },
          { icon: Star, val: "4.9/5", label: "Client Satisfaction" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-brand-bg p-4 text-center">
            <s.icon className="size-5 text-brand mx-auto mb-2" />
            <div className="font-display text-2xl text-ink">{s.val}</div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-ink-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-sm text-ink-muted border-t border-border pt-4">
        <CheckCircle2 className="size-4 text-green-500 shrink-0" />
        SEBI-registered · ARN certified mutual fund distributor
      </div>
    </div>,
  ];

  return cards[index] ?? cards[0];
}

/* ---------- Trust Bar ---------- */
function TrustBar() {
  const items = [
    { icon: CheckCircle2, text: "SEBI Regulated" },
    { icon: Award, text: "ARN Certified" },
    { icon: Users, text: "240+ Investors" },
    { icon: TrendingUp, text: "₹12 Cr+ AUM" },
    { icon: Star, text: "4.9★ Rated" },
    { icon: ShieldCheck, text: "Zero Hidden Fees" },
  ];
  return (
    <div id="trust-bar" className="border-y border-border bg-brand-soft/40">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {items.map((it) => (
            <div key={it.text} className="flex items-center gap-2 text-sm text-ink-muted">
              <it.icon className="size-4 text-brand shrink-0" />
              <span className="font-medium">{it.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Why Choose ---------- */
function WhyChoose() {
  const items = [
    { icon: Compass, title: "Personalized Guidance", desc: "Every plan begins with your story — your goals, risk tolerance, and life stage — not a one-size-fits-all template." },
    { icon: Target, title: "Goal-Based Planning", desc: "Investments precisely engineered around the milestones you're building toward — be it a home, education, or retirement." },
    { icon: Eye, title: "Transparent Advisory", desc: "Honest conversations, zero jargon, no hidden agendas. You always know where your money is and why." },
    { icon: RefreshCw, title: "Consistent Reviews", desc: "Periodic portfolio audits and disciplined rebalancing ensure your strategy stays aligned with your evolving goals." },
    { icon: ShieldCheck, title: "Complete Protection", desc: "Term, health and family-protection strategies sized precisely to your real-world responsibilities and income." },
    { icon: TrendingUp, title: "Long-Term Wealth Focus", desc: "We champion the power of compounding over speculation — because time in the market always beats timing the market." },
  ];
  return (
    <section className="border-y border-border bg-brand-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Why Choose RSI"
          title="A calmer, smarter way to grow wealth."
          subtitle="Six commitments that shape every client relationship and every portfolio we build."
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
              <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Founder · RSI · Surat</div>
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
            Cultivating growth, <em className="italic text-brand">creating prosperity.</em>
          </h2>
          <div className="mt-8 space-y-5 text-base text-ink-muted leading-relaxed">
            <p>
              At Rudrans Systematic Investment, we believe that every Indian family deserves access to professional,
              unbiased financial guidance. Our mission is simple: help you build wealth systematically,
              protect what you've built, and achieve the life you've envisioned.
            </p>
            <p>
              With over 8 years of experience and 240+ satisfied investor families across Surat and Gujarat,
              we specialize in goal-based financial planning, mutual fund distribution, SIP advisory,
              and comprehensive insurance solutions — all tailored to your unique financial journey.
            </p>
            <p>
              We earn standard AMC distributor commissions, so you pay zero advisory fees. Our success is
              measured by yours.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { val: "240+", label: "Investor Families" },
              { val: "8+", label: "Years Experience" },
              { val: "₹12Cr+", label: "Assets Managed" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-brand-bg p-4 text-center border border-border">
                <div className="font-display text-3xl text-brand">{s.val}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-ink-muted mt-1">{s.label}</div>
              </div>
            ))}
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
            eyebrow="What We Do"
            title="End-to-end financial advisory."
            subtitle="From your first SIP to a fully orchestrated, multi-generational wealth plan."
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
          eyebrow="Product Universe"
          title="A curated set of instruments."
          subtitle="Each product plays a specific role — growth, protection, tax efficiency or steady income."
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
                {p.benefits && (
                  <ul className={`mt-4 space-y-1 ${dark ? "text-white/60" : "text-ink-muted"}`}>
                    {p.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className={`size-3 shrink-0 ${dark ? "text-brand-gold" : "text-brand"}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
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
  const invested = monthly * months;
  const gains = fv - invested;
  const formatted = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(fv));
  const investedFmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(invested));
  const gainsFmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(gains));

  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-brand-deep p-10 md:p-16 text-white relative">
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand-gold">
                SIP Wealth Calculator
              </div>
              <h2 className="mt-5 font-display text-5xl leading-[1]">
                See your money <em className="italic text-brand-gold">multiply.</em>
              </h2>
              <p className="mt-5 text-white/60 max-w-md">
                Small, consistent contributions compound into life-changing wealth. Adjust the sliders and watch your future grow.
              </p>
              <div className="mt-10 space-y-7">
                <SliderInput
                  label="Monthly Investment"
                  value={`₹ ${monthly.toLocaleString("en-IN")}`}
                  min={500}
                  max={100000}
                  step={500}
                  v={monthly}
                  onChange={setMonthly}
                />
                <SliderInput
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
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 flex flex-col justify-center space-y-6">
              <div className="text-center">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                  Estimated Future Value
                </div>
                <div className="mt-3 font-display text-6xl md:text-7xl text-brand-gold">
                  ₹ {formatted}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white/40">Total Invested</div>
                  <div className="font-display text-2xl text-white mt-1">₹ {investedFmt}</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white/40">Total Gains</div>
                  <div className="font-display text-2xl text-brand-gold mt-1">₹ {gainsFmt}</div>
                </div>
              </div>
              <p className="text-center text-[10px] font-mono uppercase tracking-widest text-white/30">
                Assuming 12% annualized returns · Not a guaranteed return
              </p>
              <Link
                to="/resources"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-deep hover:bg-white transition"
              >
                Advanced Calculators <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderInput({
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
            subtitle="Clear, jargon-free perspectives on building wealth that lasts. Because informed investors make better decisions."
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
          subtitle="Real words from families and professionals partnering with RSI across Surat and Gujarat."
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
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="size-3 fill-brand-gold text-brand-gold" />
                ))}
              </div>
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
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand mb-6">Start Today</div>
            <h2 className="font-display text-5xl md:text-6xl leading-[1] text-ink">
              Ready to build your <em className="italic text-brand">financial future</em>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ink-muted">
              Take the first step toward your goals with expert, zero-fee guidance and a structured
              investment plan tailored to your life — from Surat's trusted wealth partner.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-white shadow-glass hover:bg-brand-deep transition"
              >
                Book a Free Consultation <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-8 py-4 text-sm font-semibold text-ink hover:bg-accent transition"
              >
                Explore Calculators
              </Link>
            </div>
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
