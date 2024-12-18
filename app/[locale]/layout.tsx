import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { useMessages } from "next-intl";
import "./global.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string | undefined };
}) {
  return {
    title: locale === "fr" ? "Mon Bot Discord" : "My Discord Bot",
    description:
      locale === "fr"
        ? "Bienvenue sur mon bot Discord"
        : "Welcome to my Discord bot",
    applicationName: "My Discord Bot",
    keywords:
      locale === "fr"
        ? ["discord", "bot", "français"]
        : ["discord", "bot", "english"],
    viewport: "width=device-width, initial-scale=1",
    ogType: "website",
    cardType: "summary_large_image",
    defaultImage: "/public/img/logo.png",
    creator: "@khraii",
    metaRobots: "index, follow",
   
    twitter: {
      title: locale === "fr" ? "Mon Bot Discord" : "My Discord Bot",
      description: locale === "fr" ? "Bienvenue sur mon bot Discord" : "Welcome to my Discord bot",
      // If you add an twitter-image.(jpg|jpeg|png|gif) image to the /app folder, you don't need the code below
      images: "/public/img/logo.png",
      card: "summary_large_image",
      creator: "@marc_louvion",
    },
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children?: ReactNode;
  params: { locale: string | undefined };
}) {
  const messages = useMessages();

  return (
    <html lang={locale || "fr"} className={font.className}>
      <head>
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        ></script>
      </head>

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
