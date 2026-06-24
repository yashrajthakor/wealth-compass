import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, FileText, Download } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { ARTICLES, FAQS } from "@/lib/site-data";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Calculators, Articles & FAQs | RSI" },
      { name: "description", content: "SIP, lumpsum and retirement calculators, investor articles and frequently asked questions." },
      { property: "og:title", content: "Resources — Rudrans Systematic Investment" },
      { property: "og:description", content: "Tools, articles and answers to help you invest with confidence." },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

function Resources() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Resources"
        title={<>Calculators, articles & <em className="italic text-brand">honest answers</em>.</>}
        subtitle="Free tools and clear writing to help you make better financial decisions."
      />

      <Calculators />
      <Articles />
      <Downloads />
      <FAQ />
    </SiteLayout>
  );
}

function Calculators() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Calculators</div>
        <h2 className="mt-4 font-display text-5xl md:text-6xl text-ink max-w-3xl">
          Make the numbers <em className="italic text-brand">work for you</em>.
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <SIPCalc />
          <LumpsumCalc />
          <RetirementCalc />
        </div>
      </div>
    </section>
  );
}

function CalcShell({
  title, children, result,
}: { title: string; children: React.ReactNode; result: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-7 flex flex-col">
      <div className="font-display text-2xl text-ink">{title}</div>
      <div className="mt-5 space-y-5 flex-1">{children}</div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          Estimated Value
        </div>
        <div className="mt-2 font-display text-4xl text-brand">{result}</div>
      </div>
    </div>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="font-mono uppercase tracking-widest text-ink-muted">{label}</span>
        <span className="font-display text-base text-brand-deep">{value}</span>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));
}

function SIPCalc() {
  const [m, setM] = useState(10000);
  const [y, setY] = useState(15);
  const r = 0.12 / 12;
  const n = y * 12;
  const fv = m * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return (
    <CalcShell title="SIP Calculator" result={`₹ ${fmt(fv)}`}>
      <Field label="Monthly Investment" value={`₹ ${m.toLocaleString("en-IN")}`}>
        <input type="range" min={500} max={100000} step={500} value={m} onChange={(e) => setM(+e.target.value)} className="w-full accent-brand" />
      </Field>
      <Field label="Years" value={`${y} yrs`}>
        <input type="range" min={1} max={30} step={1} value={y} onChange={(e) => setY(+e.target.value)} className="w-full accent-brand" />
      </Field>
    </CalcShell>
  );
}

function LumpsumCalc() {
  const [a, setA] = useState(500000);
  const [y, setY] = useState(10);
  const fv = a * Math.pow(1 + 0.12, y);
  return (
    <CalcShell title="Lumpsum Calculator" result={`₹ ${fmt(fv)}`}>
      <Field label="Investment Amount" value={`₹ ${a.toLocaleString("en-IN")}`}>
        <input type="range" min={10000} max={5000000} step={10000} value={a} onChange={(e) => setA(+e.target.value)} className="w-full accent-brand" />
      </Field>
      <Field label="Years" value={`${y} yrs`}>
        <input type="range" min={1} max={30} step={1} value={y} onChange={(e) => setY(+e.target.value)} className="w-full accent-brand" />
      </Field>
    </CalcShell>
  );
}

function RetirementCalc() {
  const [age, setAge] = useState(30);
  const [target, setTarget] = useState(20000000);
  const years = Math.max(60 - age, 1);
  const r = 0.12 / 12;
  const n = years * 12;
  const sip = (target * r) / (Math.pow(1 + r, n) - 1);
  return (
    <CalcShell title="Retirement SIP" result={`₹ ${fmt(sip)} / mo`}>
      <Field label="Current Age" value={`${age} yrs`}>
        <input type="range" min={20} max={55} step={1} value={age} onChange={(e) => setAge(+e.target.value)} className="w-full accent-brand" />
      </Field>
      <Field label="Retirement Corpus" value={`₹ ${(target / 10000000).toFixed(1)} Cr`}>
        <input type="range" min={5000000} max={100000000} step={500000} value={target} onChange={(e) => setTarget(+e.target.value)} className="w-full accent-brand" />
      </Field>
    </CalcShell>
  );
}

function Articles() {
  return (
    <section className="border-y border-border bg-brand-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Articles & Guides</div>
        <h2 className="mt-4 font-display text-5xl text-ink">Investor education.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-3xl border border-border bg-card p-7 hover:-translate-y-1 transition cursor-pointer"
            >
              <FileText className="size-5 text-brand" />
              <div className="mt-5 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                {a.read}
              </div>
              <h3 className="mt-2 font-display text-2xl text-ink">{a.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{a.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Downloads() {
  const docs = [
    "RSI Investor Starter Kit (PDF)",
    "SIP Goal Planner Worksheet",
    "Insurance Coverage Checklist",
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Downloadable PDFs</div>
        <h2 className="mt-4 font-display text-5xl text-ink">Take it offline.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {docs.map((d) => (
            <a
              key={d}
              href="#"
              className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 hover:border-brand transition"
            >
              <span className="text-ink font-medium">{d}</span>
              <Download className="size-5 text-brand" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-border bg-brand-bg py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">FAQs</div>
        <h2 className="mt-4 font-display text-5xl text-ink">Common questions.</h2>
        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card overflow-hidden">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={f.q}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left p-6 hover:bg-brand-soft/40 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-xl text-ink">{f.q}</span>
                  <ChevronDown
                    className={`size-5 text-brand mt-1 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
                {isOpen && (
                  <p className="mt-4 text-ink-muted leading-relaxed text-sm">{f.a}</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
