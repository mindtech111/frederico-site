import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Frederico Theophilo Neto",
    template: "%s | Frederico Theophilo Neto",
  },
  description:
    "Visual artist working across painting, drawing, sculpture, photography, prints, and video.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://fredericotheophiloneto.com"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
