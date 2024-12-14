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

export default function RootLayout({
  children,
  params: { locale },
}: {
  children?: ReactNode;
  params: { locale?: string };
}) {
  const messages: any = useMessages();

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
            <Header locale={locale} />
            {children}
            <Footer />
          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
