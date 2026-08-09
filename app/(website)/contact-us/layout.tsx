import type { Metadata } from "next";
import { SITE_BASE_URL } from "@/lib/sitemap-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Boxing Essential for gear questions, training advice, partnership inquiries, or site feedback. We typically reply within 24–48 hours.",
  alternates: { canonical: `${SITE_BASE_URL}/contact-us` },
  openGraph: {
    title: "Contact Boxing Essential",
    description:
      "Reach our team for boxing gear questions, training help, or partnership opportunities.",
    url: `${SITE_BASE_URL}/contact-us`,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
