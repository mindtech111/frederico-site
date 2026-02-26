import { getTranslations } from "next-intl/server";
import { getArtist } from "@/lib/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { type Locale } from "@/i18n/config";

export const runtime = 'edge';

export async function generateMetadata() {
  return { title: "CV" };
}

export default async function CVPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const artist = await getArtist();
  const l = locale as Locale;
  const cv = artist?.cv?.[l] || artist?.cv?.en;

  return (
    <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="font-serif text-3xl font-light mb-12 pb-6 border-b border-[var(--color-border)]">
        {t("artist.cv")}
      </h1>
      {cv ? (
        <PortableTextRenderer value={cv} className="text-sm leading-loose" />
      ) : (
        <p className="font-serif text-[var(--color-text-muted)]">CV coming soon.</p>
      )}
    </div>
  );
}
