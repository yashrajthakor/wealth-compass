import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rudrans Systematic Investment" },
      { name: "description", content: "Speak with Dharmitsinh Solanki at RSI. Visit our Surat office, call or message us on WhatsApp." },
      { property: "og:title", content: "Contact — Rudrans Systematic Investment" },
      { property: "og:description", content: "Start a conversation. Email, call or WhatsApp our advisory team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title={<>Let's start the <em className="italic text-brand">conversation</em>.</>}
        subtitle="Whether you're starting your first SIP or reviewing a portfolio, we're a call or message away."
      />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-12">
          <Details />
          <FormBlock />
        </div>
      </section>
      <Map />
    </SiteLayout>
  );
}

function Details() {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="rounded-3xl border border-border bg-card p-8">
        <div className="font-mono text-[10px] uppercase tracking-widest text-brand">Advisor</div>
        <div className="mt-3 font-display text-3xl text-ink">{SITE.owner}</div>
        <div className="mt-1 text-sm text-ink-muted">Founder · {SITE.short}</div>
        <div className="mt-8 space-y-5 text-sm">
          <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-3 text-ink hover:text-brand">
            <span className="size-10 grid place-items-center rounded-full bg-brand-soft text-brand">
              <Phone className="size-4" />
            </span>
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-ink hover:text-brand break-all">
            <span className="size-10 grid place-items-center rounded-full bg-brand-soft text-brand">
              <Mail className="size-4" />
            </span>
            {SITE.email}
          </a>
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-ink hover:text-brand">
            <span className="size-10 grid place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <MessageCircle className="size-4" />
            </span>
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="rounded-3xl border border-border bg-brand-deep text-white p-8">
        <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gold">
          Office
        </div>
        <div className="mt-3 flex items-start gap-3">
          <MapPin className="size-5 text-brand-gold mt-1 shrink-0" />
          <div className="text-white/80 leading-relaxed">
            <div className="font-display text-2xl text-white">Rudrans Systematic Investment</div>
            {SITE.address.line1}<br />
            {SITE.address.line2}<br />
            {SITE.address.city}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormBlock() {
  const [data, setData] = useState({ name: "", mobile: "", email: "", city: "", message: "" });
  const update = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${data.name || "RSI Website"}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nMobile: ${data.mobile}\nEmail: ${data.email}\nCity: ${data.city}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  const whatsapp = () => {
    const text = encodeURIComponent(
      `Hello RSI, I'm ${data.name || "interested"} from ${data.city || "—"}.\nMobile: ${data.mobile}\nEmail: ${data.email}\n\n${data.message}`
    );
    window.open(`${SITE.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <form onSubmit={submit} className="lg:col-span-7 rounded-3xl border border-border bg-card p-8 md:p-10 space-y-5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-brand">Send us a note</div>
      <h2 className="font-display text-4xl text-ink">Tell us what you're hoping to build.</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Full Name" value={data.name} onChange={update("name")} required />
        <Input label="Mobile Number" value={data.mobile} onChange={update("mobile")} required type="tel" />
        <Input label="Email" value={data.email} onChange={update("email")} required type="email" />
        <Input label="City" value={data.city} onChange={update("city")} />
      </div>
      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest text-ink-muted block mb-2">
          Message
        </label>
        <textarea
          value={data.message}
          onChange={update("message")}
          rows={4}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-ink focus:border-brand focus:outline-none transition"
          placeholder="What are your financial goals?"
        />
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep transition"
        >
          <Send className="size-4" /> Send via Email
        </button>
        <button
          type="button"
          onClick={whatsapp}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500 text-emerald-600 px-6 py-3 text-sm font-semibold hover:bg-emerald-50 transition"
        >
          <MessageCircle className="size-4" /> Send on WhatsApp
        </button>
      </div>
    </form>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-ink-muted block mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-ink focus:border-brand focus:outline-none transition"
      />
    </div>
  );
}

function Map() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
          <iframe
            title="RSI Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.067154033221!2d72.77105279999999!3d21.1894911!2m3!1f0!2f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ddd556f8367%3A0x6d59f747975961ac!2sRUDRANS%20INVESTMENT!5e0!3m2!1sen!2sin!4v1783568250097!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
