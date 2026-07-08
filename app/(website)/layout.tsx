import "../globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageTransitionProvider } from "@/components/page-transition-provider";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://boxingessential.com"),
  title: {
    default: "Boxing Essential - Train Smarter. Fight Better. Stay Stronger.",
    template: "%s | Boxing Essential",
  },
  description:
    "Your complete resource for boxing training, nutrition, gear reviews, and fight strategy. Expert-backed content for every level.",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "5RvZNo1YT849c8qyWwmvkVj8POYL970zvCXZj5jg0Hk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} min-h-screen flex flex-col`}>
        <PageTransitionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PageTransitionProvider>
      </body>
    </html>
  );
}
