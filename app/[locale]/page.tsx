import { useTranslations } from "next-intl";
import style from "@/public/style/home.module.css";

export default function LocalePage() {
  const t = useTranslations("home");

  return (
    <main>
      <div className={style.description}>
        <p>{t("home_description")}</p>
        <button>
          <a href="/command">{t("home_description_button")}</a>
        </button>
      </div>
      <div className={style.container_bubble}>
        <div className={`${style.bubble} ${style.left}`}>
          <img src="./img/Bot_dream.png" alt="" className="bubble_img" />
          <div className={style.bubble_text}>
            <h1>{t("bubble1.title")}</h1>
            <p>{t("bubble1.description")}</p>
          </div>
        </div>
        <div className={`${style.bubble} ${style.right}`}>
          <img src="./img/Bot_dream.png" alt="" className="bubble_img" />
          <div className={style.bubble_text}>
            <h1>{t("bubble2.title")}</h1>
            <p>{t("bubble2.description")}</p>
          </div>
        </div>

        <div className={`${style.bubble} ${style.left}`}>
          <img src="./img/Bot_dream.png" alt="" className="bubble_img" />
          <div className={style.bubble_text}>
            <h1>{t("bubble3.title")}</h1>
            <p>{t("bubble3.description")}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
