import { useTranslations } from "next-intl";
import style from "@/public/style/home.module.css";
import Image from "next/image";
import Link from "next/link";

export default function LocalePage() {
  const t = useTranslations("home");

  return (
    <main>
      <div className={style.description}>
        <p>{t("home_description")}</p>
        <button>
          <Link href="/command">{t("home_description_button")}</Link>
        </button>
      </div>
      <div className={style.container_bubble}>
        <div className={`${style.bubble} ${style.left}`}>
          <Image
            src="/img/Bot_dream.png"
            alt=""
            className="bubble_img"
            width={500}
            height={500}
          />
          <div className={style.bubble_text}>
            <h1>{t("bubble1.title")}</h1>
            <p>{t("bubble1.description")}</p>
          </div>
        </div>
        <div className={`${style.bubble} ${style.right}`}>
          <Image
            src="/img/Bot_personnality.png"
            alt=""
            className="bubble_img"
            width={500}
            height={500}
          />
          <div className={style.bubble_text}>
            <h1>{t("bubble2.title")}</h1>
            <p>{t("bubble2.description")}</p>
          </div>
        </div>

        <div className={`${style.bubble} ${style.left}`}>
          <Image 
          src="/img/Bot_result.png" 
          alt="" 
          className="bubble_img" 
          width={500}
          height={500}
          />
          <div className={style.bubble_text}>
            <h1>{t("bubble3.title")}</h1>
            <p>{t("bubble3.description")}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
