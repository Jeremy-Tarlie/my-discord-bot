import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { useMessages } from "next-intl";
import "./global.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";

const font = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: { locale: string | undefined };
}) {
  const { locale } = params;
  const title = "My Discord Bot";
  const description =
    locale === "fr"
      ? "Bienvenue sur mon bot Discord"
      : "Welcome to my Discord bot";
  const imageUrl = "https://example.com/og-image.jpg";
  const url = "https://example.com";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl }],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

interface LayoutProps {
  children?: ReactNode;
  params: { locale: string | undefined };
}

export default function RootLayout({ children, params }: LayoutProps) {
  const { locale } = params;
  const messages = useMessages();

  return (
    <html lang={locale || "fr"} className={font.className}>
      <head>
        <link rel="icon" href="/img/bot-discord-logo.png" />
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
