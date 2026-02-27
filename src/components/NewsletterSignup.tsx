"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function NewsletterSignup() {
  const t = useTranslations("newsletter");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
      } else if (data.error === "duplicate") {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="font-serif text-sm text-[var(--color-text-muted)]">
        {t("success")}
      </p>
    );
  }

  return (
    <div>
      <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mb-4">
        {t("title")}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder={t("namePlaceholder")}
          required
          className="font-serif text-sm bg-transparent border-b border-[var(--color-border)] pb-2 outline-none focus:border-[var(--color-text)] transition-colors placeholder:text-[var(--color-text-muted)]/50 w-full sm:w-40"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder={t("emailPlaceholder")}
          required
          className="font-serif text-sm bg-transparent border-b border-[var(--color-border)] pb-2 outline-none focus:border-[var(--color-text)] transition-colors placeholder:text-[var(--color-text-muted)]/50 w-full sm:w-56"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="font-sans text-[11px] tracking-widest uppercase border border-[var(--color-border)] px-5 py-2 hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] transition-colors disabled:opacity-40"
        >
          {status === "loading" ? "..." : t("submit")}
        </button>
      </form>
      {status === "duplicate" && (
        <p className="font-serif text-xs text-[var(--color-text-muted)] mt-2">
          {t("duplicate")}
        </p>
      )}
      {status === "error" && (
        <p className="font-serif text-xs text-red-600 mt-2">
          {t("error")}
        </p>
      )}
    </div>
  );
}
