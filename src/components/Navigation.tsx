"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { type Locale, localeNames } from "@/i18n/config";

interface Props {
  locale: Locale;
}

export default function Navigation({ locale }: Props) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [artistOpen, setArtistOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);

  const prefix = locale === "en" ? "" : `/${locale}`;

  const isActive = (path: string) => pathname === `${prefix}${path}` || pathname.startsWith(`${prefix}${path}/`);

  const workCategories = [
    { key: "paintings", href: "/works/paintings" },
    { key: "drawings", href: "/works/drawings" },
    { key: "sculptures", href: "/works/sculptures" },
    { key: "photography", href: "/works/photography" },
    { key: "prints", href: "/works/prints" },
    { key: "videos", href: "/works/videos" },
  ] as const;

  const artistPages = [
    { key: "biography", href: "/the-artist/biography" },
    { key: "cv", href: "/the-artist/cv" },
    { key: "chronology", href: "/the-artist/chronology" },
  ] as const;

  // Build alternate locale URLs for language switcher
  const getLocaleUrl = (targetLocale: Locale) => {
    const stripLocale = pathname.replace(/^\/(de|pt)/, "");
    if (targetLocale === "en") return stripLocale || "/";
    return `/${targetLocale}${stripLocale || "/"}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href={`${prefix}/`}
          className="font-serif text-sm tracking-wide hover:opacity-70 transition-opacity"
        >
          Frederico Theophilo Neto
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* The Artist dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setArtistOpen(true)}
            onMouseLeave={() => setArtistOpen(false)}
          >
            <button
              className={`nav-link font-serif text-[13px] tracking-wide uppercase ${isActive("/the-artist") ? "active" : ""}`}
            >
              {t("theArtist")}
            </button>
            {artistOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[var(--color-bg)] border border-[var(--color-border)] py-3 min-w-[160px]">
                {artistPages.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={`${prefix}${href}`}
                    className="block px-5 py-1.5 font-serif text-[13px] hover:opacity-60 transition-opacity"
                  >
                    {t(key)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Works dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setWorksOpen(true)}
            onMouseLeave={() => setWorksOpen(false)}
          >
            <button
              className={`nav-link font-serif text-[13px] tracking-wide uppercase ${isActive("/works") ? "active" : ""}`}
            >
              {t("works")}
            </button>
            {worksOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[var(--color-bg)] border border-[var(--color-border)] py-3 min-w-[160px]">
                {workCategories.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={`${prefix}${href}`}
                    className="block px-5 py-1.5 font-serif text-[13px] hover:opacity-60 transition-opacity"
                  >
                    {t(key)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[
            { key: "exhibitions", href: "/exhibitions" },
            { key: "press", href: "/press" },
            { key: "news", href: "/news" },
            { key: "contact", href: "/contact" },
          ].map(({ key, href }) => (
            <Link
              key={key}
              href={`${prefix}${href}`}
              className={`nav-link font-serif text-[13px] tracking-wide uppercase ${isActive(href) ? "active" : ""}`}
            >
              {t(key as "exhibitions" | "press" | "news" | "contact")}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="flex items-center gap-2 ml-4 border-l border-[var(--color-border)] pl-4">
            {(["en", "de", "pt"] as Locale[]).map((l, i) => (
              <span key={l} className="flex items-center gap-2">
                <Link
                  href={getLocaleUrl(l)}
                  className={`font-sans text-[11px] tracking-widest uppercase transition-opacity ${
                    l === locale ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  {l.toUpperCase()}
                </Link>
                {i < 2 && <span className="text-[var(--color-border)]">|</span>}
              </span>
            ))}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-sans text-[11px] tracking-widest uppercase"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--color-bg)] border-t border-[var(--color-border)] px-6 py-6">
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mb-2">
                {t("theArtist")}
              </p>
              {artistPages.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`${prefix}${href}`}
                  className="block font-serif text-sm py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
            </div>
            <div>
              <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mb-2">
                {t("works")}
              </p>
              {workCategories.map(({ key, href }) => (
                <Link
                  key={key}
                  href={`${prefix}${href}`}
                  className="block font-serif text-sm py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
            </div>
            {[
              { key: "exhibitions", href: "/exhibitions" },
              { key: "press", href: "/press" },
              { key: "news", href: "/news" },
              { key: "contact", href: "/contact" },
            ].map(({ key, href }) => (
              <Link
                key={key}
                href={`${prefix}${href}`}
                className="font-serif text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {t(key as "exhibitions" | "press" | "news" | "contact")}
              </Link>
            ))}
            <div className="flex gap-3 pt-2 border-t border-[var(--color-border)]">
              {(["en", "de", "pt"] as Locale[]).map((l) => (
                <Link
                  key={l}
                  href={getLocaleUrl(l)}
                  className={`font-sans text-[11px] tracking-widest uppercase ${
                    l === locale ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
