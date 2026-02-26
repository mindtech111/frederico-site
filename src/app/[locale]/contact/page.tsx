import { getTranslations } from "next-intl/server";
import { getContact } from "@/lib/queries";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { type Locale } from "@/i18n/config";

export const runtime = 'edge';

export async function generateMetadata() {
  return { title: "Contact" };
}

const SOCIAL_ICONS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  vimeo: "Vimeo",
  youtube: "YouTube",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
  const contact = await getContact();
  const l = locale as Locale;
  const introText = contact?.introText?.[l] || contact?.introText?.en;

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl font-light mb-12 pb-6 border-b border-[var(--color-border)]">
        {t("contact.title")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: intro + contact details */}
        <div>
          {introText && (
            <div className="mb-10">
              <PortableTextRenderer value={introText} />
            </div>
          )}

          <div className="space-y-6">
            {contact?.email && (
              <div>
                <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mb-1">
                  {t("contact.email")}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-serif text-base hover:opacity-60 transition-opacity"
                >
                  {contact.email}
                </a>
              </div>
            )}

            {contact?.studio && (contact.studio.street || contact.studio.city) && (
              <div>
                <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mb-1">
                  {t("contact.studio")}
                </p>
                <address className="font-serif text-base not-italic leading-relaxed">
                  {contact.studio.street && <span>{contact.studio.street}<br /></span>}
                  {contact.studio.city && <span>{contact.studio.city}<br /></span>}
                  {contact.studio.country && <span>{contact.studio.country}</span>}
                </address>
              </div>
            )}

            {contact?.socialLinks && contact.socialLinks.length > 0 && (
              <div>
                <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mb-2">
                  {t("contact.followUs")}
                </p>
                <div className="flex flex-col gap-1">
                  {contact.socialLinks.map((link: {
                    platform: string;
                    url: string;
                    label?: string;
                  }, i: number) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-sm hover:opacity-60 transition-opacity"
                    >
                      {SOCIAL_ICONS[link.platform] || link.label || link.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: gallery representation */}
        {contact?.representation && contact.representation.length > 0 && (
          <div>
            <p className="font-sans text-[11px] tracking-widest uppercase text-[var(--color-text-muted)] mb-6">
              {t("contact.representation")}
            </p>
            <div className="space-y-5">
              {contact.representation.map((rep: {
                gallery: string;
                city?: string;
                country?: string;
                url?: string;
              }, i: number) => (
                <div key={i}>
                  {rep.url ? (
                    <a
                      href={rep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-base hover:opacity-60 transition-opacity"
                    >
                      {rep.gallery}
                    </a>
                  ) : (
                    <p className="font-serif text-base">{rep.gallery}</p>
                  )}
                  {(rep.city || rep.country) && (
                    <p className="font-serif text-sm text-[var(--color-text-muted)]">
                      {[rep.city, rep.country].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
