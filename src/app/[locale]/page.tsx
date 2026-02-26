import { getTranslations } from "next-intl/server";
import { getHomepageImages } from "@/lib/queries";
import HomeCarousel from "@/components/HomeCarousel";
import { type Locale } from "@/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const images = await getHomepageImages();

  return (
    <HomeCarousel
      images={images}
      locale={locale as Locale}
      viewWorkLabel={t("viewWork")}
    />
  );
}
