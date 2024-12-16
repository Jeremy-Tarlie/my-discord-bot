import { useTranslations } from "next-intl";
import Image from "next/image";
import style from "@/public/style/404.module.css";

export default function LocalePage() {
  const t = useTranslations("404");

  return (
    <main className={style.container_error}>
      <Image src="/img/error-404.jpg" width={200} height={200} alt="404" />
      <p>{t("title")}</p>
      <p>{t("description")}</p>
      <a href="/">{t("back")}</a>
    </main>
  );
}
