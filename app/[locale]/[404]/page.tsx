import { useTranslations } from "next-intl";
import Image from "next/image";

export default function LocalePage() {
  const t = useTranslations("404");

  return (
    <main>
      <Image src="/img/profile-bot.png" width={200} height={200} alt="404" />
      <p>{t("title")}</p>
      <p>{t("description")}</p>
      <a href="/">{t("back")}</a>
    </main>
  );
}
