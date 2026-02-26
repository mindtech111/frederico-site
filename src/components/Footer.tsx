import Link from "next/link";
import { type Locale } from "@/i18n/config";

interface Props {
  locale: Locale;
}

export default function Footer({ locale }: Props) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] mt-24 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-serif text-sm text-[var(--color-text-muted)]">
          © {year} Frederico Theophilo Neto
        </p>
        <Link
          href={`${prefix}/contact`}
          className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
}
