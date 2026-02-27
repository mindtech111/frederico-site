"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { type Locale, localeNames } from "@/i18n/config";
import { Link, usePathname } from "@/i18n/navigation";

interface Props {
  locale: Locale;
}

export default function Navigation({ locale }: Props) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [artistOpen, setArtistOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);

  // Timeout refs for dropdown hover delay (prevents flicker when crossing gaps)
  const artistTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const worksTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

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

  // Dropdown handlers with delay to prevent flicker when cursor crosses gap
  const openArtist = useCallback(() => {
    if (artistTimeout.current) clearTimeout(artistTimeout.current);
    setArtistOpen(true);
  }, []);

  const closeArtist = useCallback(() => {
    artistTimeout.current = setTimeout(() => setArtistOpen(false), 150);
  }, []);

  const openWorks = useCallback(() => {
    if (worksTimeout.current) clearTimeout(worksTimeout.current);
    setWorksOpen(true);
  }, []);

  const closeWorks = useCallback(() => {
    worksTimeout.current = setTimeout(() => setWorksOpen(false), 150);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="/"
          className="font-serif text-sm tracking-wide hover:opacity-70 transition-opacity"
        >
          Frederico Theophilo Neto
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* The Artist dropdown */}
          <div
            className="relative"
            onMouseEnter={openArtist}
            onMouseLeave={closeArtist}
          >
            <button
              className={`nav-link font-serif text-[13px] tracking-wide uppercase ${isActive("/the-artist") ? "active" : ""}`}
            >
              {t("theArtist")}
            </button>
            {artistOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-[var(--color-bg)] border border-[var(--color-border)] py-3 min-w-[160px]">
                  {artistPages.map(({ key, href }) => (
                    <Link
                      key={key}
                      href={href}
                      className="block px-5 py-1.5 font-serif text-[13px] hover:opacity-60 transition-opacity"
                    >
                      {t(key)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Works dropdown */}
          <div
            className="relative"
            onMouseEnter={openWorks}
            onMouseLeave={closeWorks}
          >
            <button
              className={`nav-link font-serif text-[13px] tracking-wide uppercase ${isActive("/works") ? "active" : ""}`}
            >
              {t("works")}
            </button>
            {worksOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-[var(--color-bg)] border border-[var(--color-border)] py-3 min-w-[160px]">
                  {workCategories.map(({ key, href }) => (
                    <Link
                      key={key}
                      href={href}
                      className="block px-5 py-1.5 font-serif text-[13px] hover:opacity-60 transition-opacity"
                    >
                      {t(key)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {([
            { key: "exhibitions", href: "/exhibitions" },
            { key: "press", href: "/press" },
            { key: "news", href: "/news" },
            { key: "contact", href: "/contact" },
          ] as const).map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={`nav-link font-serif text-[13px] tracking-wide uppercase ${isActive(href) ? "active" : ""}`}
            >
              {t(key)}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="flex items-center gap-2 ml-4 border-l border-[var(--color-border)] pl-4">
            {(["en", "de", "pt"] as Locale[]).map((l, i) => (
              <span key={l} className="flex items-center gap-2">
                <Link
                  href={pathname}
                  locale={l}
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
                  href={href}
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
                  href={href}
                  className="block font-serif text-sm py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
            </div>
            {([
              { key: "exhibitions", href: "/exhibitions" },
              { key: "press", href: "/press" },
              { key: "news", href: "/news" },
              { key: "contact", href: "/contact" },
            ] as const).map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="font-serif text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
            <div className="flex gap-3 pt-2 border-t border-[var(--color-border)]">
              {(["en", "de", "pt"] as Locale[]).map((l) => (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  className={`font-sans text-[11px] tracking-widest uppercase ${
                    l === locale ? "opacity-100" : "opacity-40"
                  }`}
                  onClick={() => setMobileOpen(false)}
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
