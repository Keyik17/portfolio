import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Host_Grotesk({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.intro,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      {/* extensions often add attributes here before React loads */}
      <body suppressHydrationWarning>
        <a href="#main" className="skip">
          Skip to main content
        </a>
        <Nav />
        <div className="main">
          <main id="main" className="content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
