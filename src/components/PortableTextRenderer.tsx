import { PortableText, type PortableTextBlock } from "next-sanity";

interface Props {
  value: PortableTextBlock[];
  className?: string;
}

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-5 last:mb-0 leading-relaxed">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-xl mt-8 mb-3 font-serif">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-lg mt-6 mb-2 font-serif">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-[var(--color-border)] pl-5 my-6 text-[var(--color-text-muted)] italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium">{children}</strong>
    ),
    link: ({
      children,
      value,
    }: {
      children?: React.ReactNode;
      value?: { href: string };
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:opacity-60 transition-opacity"
      >
        {children}
      </a>
    ),
  },
};

export default function PortableTextRenderer({ value, className }: Props) {
  if (!value) return null;
  return (
    <div className={`font-serif text-base leading-relaxed ${className || ""}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
