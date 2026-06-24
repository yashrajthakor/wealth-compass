import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site-data";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="size-14 grid place-items-center rounded-full bg-emerald-500 text-white shadow-glass transition hover:scale-105"
      >
        <MessageCircle className="size-6" />
      </a>
      <a
        href={`tel:${SITE.phoneRaw}`}
        aria-label="Call"
        className="size-14 grid place-items-center rounded-full bg-brand text-white shadow-soft transition hover:scale-105"
      >
        <Phone className="size-5" />
      </a>
    </div>
  );
}
