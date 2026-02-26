import { getTranslations } from "next-intl/server";
import { getArtist } from "@/lib/queries";
import { type Locale } from "@/i18n/config";

export const runtime = 'edge';

export async function generateMetadata() {
  return { title: "Chronology" };
}

export default async function ChronologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const artist = await getArtist();
  const l = locale as Locale;

  const chronology: Array<{
    year: number;
    event: { en?: string; de?: string; pt?: string };
  }> = artist?.chronology || [];

  const sorted = [...chronology].sort((a, b) => b.year - a.year);

  return (
    <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="font-serif text-3xl font-light mb-12 pb-6 border-b border-[var(--color-border)]">
        {t("artist.chronology")}
      </h1>

      {sorted.length === 0 ? (
        <p className="font-serif text-[var(--color-text-muted)]">Chronology coming soon.</p>
      ) : (
        <div className="space-y-4">
          {sorted.map((entry, i) => {
            const eventText = entry.event?.[l] || entry.event?.en || "";
            return (
              <div
                key={i}
                className="grid grid-cols-[64px_1fr] gap-6 pb-4 border-b border-[var(--color-border)] last:border-0"
              >
                <span className="font-serif text-sm text-[var(--color-text-muted)] pt-0.5">
                  {entry.year}
                </span>
                <p className="font-serif text-sm leading-relaxed">{eventText}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
