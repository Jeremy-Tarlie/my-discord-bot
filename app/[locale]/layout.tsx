import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { useMessages } from "next-intl";
import "./global.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { generateMeta } from "@/utils/generateMeta";
import Head from "next/head";

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface LayoutProps {
  children?: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const messages = useMessages();
  const locale = useLocale();

  const meta = {
    title: locale === "fr" ? "Mon Bot Discord" : "My Discord Bot",
    description:
      locale === "fr"
        ? "Bienvenue sur mon bot Discord"
        : "Welcome to my Discord bot",
    imageUrl: "https://example.com/og-image.jpg",
    url: "https://example.com",
  };

  return (
    <html lang={locale || "fr"} className={font.className}>
      <Head>{generateMeta(meta)}</Head>

      <NextIntlClientProvider locale={locale || "fr"} messages={messages}>
        <body suppressHydrationWarning>
          <div className="container">
            <Header locale={locale || "fr"} />
            {children}
            <Footer />
          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
