import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, FileText, Download, X, Clock, BookOpen, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { ARTICLES, FAQS, DOWNLOADS, SITE } from "@/lib/site-data";

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

type Article = (typeof ARTICLES)[number];
type DocItem = (typeof DOWNLOADS)[number];

function Resources() {
  const [article, setArticle] = useState<Article | null>(null);
  const [doc, setDoc] = useState<DocItem | null>(null);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Resources"
        title={<>Calculators, articles & <em className="italic text-brand">honest answers</em>.</>}
        subtitle="Free tools and clear writing to help you make better financial decisions."
      />

      <Calculators />
      <Articles onOpen={setArticle} />
      {/* <Downloads onOpen={setDoc} /> */}
      <FAQ />

      <ArticleModal article={article} onClose={() => setArticle(null)} />
      <DocModal doc={doc} onClose={() => setDoc(null)} />
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
  const [t, setT] = useState(12);
  const r = (t / 100) / 12;
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
      <Field label="Assumed return" value={`${t.toFixed(2)} %`}>
        <input type="range" min={4} max={18} step={0.25} value={t} onChange={(e) => setT(+e.target.value)} className="w-full accent-brand" />
      </Field>
    </CalcShell>
  );
}

function LumpsumCalc() {
  const [a, setA] = useState(500000);
  const [y, setY] = useState(10);
  const [t, setT] = useState(12);
  const fv = a * Math.pow(1 + t / 100, y);
  return (
    <CalcShell title="Lumpsum Calculator" result={`₹ ${fmt(fv)}`}>
      <Field label="Investment Amount" value={`₹ ${a.toLocaleString("en-IN")}`}>
        <input type="range" min={10000} max={5000000} step={10000} value={a} onChange={(e) => setA(+e.target.value)} className="w-full accent-brand" />
      </Field>
      <Field label="Years" value={`${y} yrs`}>
        <input type="range" min={1} max={30} step={1} value={y} onChange={(e) => setY(+e.target.value)} className="w-full accent-brand" />
      </Field>
      <Field label="Assumed return" value={`${t.toFixed(2)} %`}>
        <input type="range" min={4} max={18} step={0.25} value={t} onChange={(e) => setT(+e.target.value)} className="w-full accent-brand" />
      </Field>
    </CalcShell>
  );
}

function RetirementCalc() {
  const [age, setAge] = useState(30);
  const [target, setTarget] = useState(20000000);
  const [t, setT] = useState(12);
  const years = Math.max(60 - age, 1);
  const r = (t / 100) / 12;
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
      <Field label="Assumed return" value={`${t.toFixed(2)} %`}>
        <input type="range" min={4} max={18} step={0.25} value={t} onChange={(e) => setT(+e.target.value)} className="w-full accent-brand" />
      </Field>
    </CalcShell>
  );
}

function Articles({ onOpen }: { onOpen: (a: Article) => void }) {
  return (
    <section className="border-y border-border bg-brand-bg py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Articles & Guides</div>
        <h2 className="mt-4 font-display text-5xl text-ink">Investor education.</h2>
        <p className="mt-3 text-ink-muted max-w-2xl">Tap any card to read the full guide.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <motion.button
              type="button"
              key={a.slug}
              onClick={() => onOpen(a)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group text-left rounded-3xl border border-border bg-card p-7 hover:-translate-y-1 hover:border-brand hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <FileText className="size-5 text-brand" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand">
                  {a.category}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                <Clock className="size-3" />
                {a.read}
              </div>
              <h3 className="mt-2 font-display text-2xl text-ink group-hover:text-brand transition">{a.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{a.excerpt}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Read article
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Downloads({ onOpen }: { onOpen: (d: DocItem) => void }) {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-brand">Downloadable PDFs</div>
        <h2 className="mt-4 font-display text-5xl text-ink">Take it offline.</h2>
        <p className="mt-3 text-ink-muted max-w-2xl">Preview each guide, then download the PDF.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {DOWNLOADS.map((d, i) => (
            <motion.button
              type="button"
              key={d.slug}
              onClick={() => onOpen(d)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group text-left rounded-3xl border border-border bg-card p-7 hover:-translate-y-1 hover:border-brand hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <BookOpen className="size-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  {d.pages} pages · PDF
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl text-ink group-hover:text-brand transition">{d.title}</h3>
              <p className="mt-2 text-sm text-ink-muted line-clamp-3">{d.description}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand">
                <Download className="size-4" />
                Preview & download
              </div>
            </motion.button>
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

/* ---------------- Modals ---------------- */

function ModalShell({
  open, onClose, children,
}: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/60 backdrop-blur-sm p-0 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-card rounded-t-3xl sm:rounded-3xl border border-border shadow-2xl"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ArticleModal({ article, onClose }: { article: Article | null; onClose: () => void }) {
  return (
    <ModalShell open={!!article} onClose={onClose}>
      {article && (
        <>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-card/95 backdrop-blur px-7 py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand truncate">
              {article.category} · {article.read}
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border hover:bg-brand-soft/40 transition"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="px-7 py-8">
            <h2 className="font-display text-4xl text-ink leading-tight">{article.title}</h2>
            <p className="mt-3 text-ink-muted italic">{article.excerpt}</p>
            <div className="mt-8 space-y-5">
              {article.body.map((p, i) => (
                <p key={i} className="text-ink/90 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="mt-10 rounded-2xl bg-brand-soft/40 border border-border p-5">
              <div className="font-display text-lg text-ink">Want personalised guidance?</div>
              <p className="mt-1 text-sm text-ink-muted">Talk to {SITE.owner} for a free 20-minute consultation.</p>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand text-white px-5 py-2.5 text-sm font-medium hover:bg-brand-deep transition"
              >
                Book a call
              </a>
            </div>
          </div>
        </>
      )}
    </ModalShell>
  );
}

function generatePdf(doc: DocItem) {
  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const width = pdf.internal.pageSize.getWidth();
  const height = pdf.internal.pageSize.getHeight();
  const margin = 56;
  let y = margin;

  // Header band
  pdf.setFillColor(15, 123, 153);
  pdf.rect(0, 0, width, 90, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text("RUDRANS SYSTEMATIC INVESTMENT", margin, 40);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.text("Think Beyond Limits", margin, 58);
  pdf.text(SITE.phone + "  |  " + SITE.email, margin, 74);

  y = 130;
  pdf.setTextColor(11, 77, 99);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  const titleLines = pdf.splitTextToSize(doc.title, width - margin * 2);
  pdf.text(titleLines, margin, y);
  y += titleLines.length * 26 + 10;

  pdf.setTextColor(80, 80, 80);
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(11);
  const descLines = pdf.splitTextToSize(doc.description, width - margin * 2);
  pdf.text(descLines, margin, y);
  y += descLines.length * 15 + 20;

  pdf.setDrawColor(15, 123, 153);
  pdf.setLineWidth(1);
  pdf.line(margin, y, width - margin, y);
  y += 24;

  doc.sections.forEach((s, idx) => {
    if (y > height - 120) {
      pdf.addPage();
      y = margin;
    }
    pdf.setTextColor(15, 123, 153);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text(String(idx + 1).padStart(2, "0") + ".  " + s.heading, margin, y);
    y += 20;

    pdf.setTextColor(40, 40, 40);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    const lines = pdf.splitTextToSize(s.body, width - margin * 2);
    lines.forEach((line: string) => {
      if (y > height - 80) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += 15;
    });
    y += 18;
  });

  // Footer on last page
  const pageCount = pdf.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    pdf.setPage(p);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(140, 140, 140);
    pdf.text(`© ${new Date().getFullYear()} Rudrans Systematic Investment  ·  Page ${p} of ${pageCount}`, margin, height - 30);
  }

  pdf.save(`RSI-${doc.slug}.pdf`);
}

function DocModal({ doc, onClose }: { doc: DocItem | null; onClose: () => void }) {
  return (
    <ModalShell open={!!doc} onClose={onClose}>
      {doc && (
        <>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-card/95 backdrop-blur px-7 py-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand truncate">
              {doc.pages} pages · PDF Guide
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="inline-flex size-9 items-center justify-center rounded-full border border-border hover:bg-brand-soft/40 transition"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="px-7 py-8">
            <div className="inline-flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
              <BookOpen className="size-6" />
            </div>
            <h2 className="mt-4 font-display text-4xl text-ink leading-tight">{doc.title}</h2>
            <p className="mt-3 text-ink-muted">{doc.description}</p>

            <div className="mt-8 space-y-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">Inside this guide</div>
              {doc.sections.map((s, i) => (
                <div key={i} className="rounded-2xl border border-border bg-brand-bg/60 p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                    <div className="font-display text-lg text-ink">{s.heading}</div>
                  </div>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => generatePdf(doc)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-6 py-3 text-sm font-medium hover:bg-brand-deep transition"
              >
                <FileDown className="size-4" />
                Download PDF
              </button>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-brand-soft/40 transition"
              >
                Close preview
              </button>
            </div>
          </div>
        </>
      )}
    </ModalShell>
  );
}
