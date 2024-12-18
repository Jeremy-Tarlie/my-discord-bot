import React from "react";
import style from "@/public/style/info_command.module.css";
import { useTranslations } from "next-intl";
import { load } from "recaptcha-v3"; // Import reCAPTCHA loader
import toast from "react-hot-toast";

interface Bot {
  price: number;
  host?: boolean;
  bot_view: {
    discord: string;
    email: string;
  };
}

const Info_command = ({
  bot,
  setBot,
}: {
  bot: Bot;
  setBot: React.Dispatch<React.SetStateAction<Bot>>;
}) => {
  const t = useTranslations("command_finish");
  const prefixe = "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        throw new Error("reCAPTCHA site key is not defined");
      }
      const recaptcha = await load(siteKey); // Replace with your site key
      const token = await recaptcha.execute("submit_form");
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...bot, recaptchaToken: token }),
      });

      if (!response.ok) {
        toast.error(t("error.error_submit"));
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success(t("success.success_submit"));
    } catch (error) {
      toast.error(t("error.error_submit"));
    }
  };

  return (
    <div className={style.info_commande}>
      <div className={style.price_prefixe}>
        <p>{`${t("prefixe")} ${prefixe}`}</p>
        <p>{`${t("price")} ${bot.price} € ${
          bot.host ? `${t("price_mounth")}` : ""
        }`}</p>
      </div>
      <p>{t("techno")}</p>
      <div className={style.detail_commande}>
        <p>{t("info.partie1")}</p>
        <p>{t("info.partie2")}</p>
        <p>{t("info.partie3")}</p>
      </div>
      {/* <p>{t("delay")}</p> */}

      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className={style.form}
      >
        <div className={style.contact}>
          <div className={style.form_group}>
            <label htmlFor="discord">
              Discord <span className={"required"}>*</span>
            </label>
            <input
              type="text"
              id="discord"
              name="discord"
              required
              value={bot.bot_view.discord || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBot((prevData: Bot) => ({
                  ...prevData,
                  bot_view: {
                    ...prevData.bot_view,
                    discord: e.target.value,
                  },
                }));
              }}
            />
          </div>
          <div className={style.form_group}>
            <label htmlFor="email">
              Email <span className={"required"}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={bot.bot_view.email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBot((prevData: Bot) => ({
                  ...prevData,
                  bot_view: {
                    ...prevData.bot_view,
                    email: e.target.value,
                  },
                }));
              }}
            />
          </div>
        </div>

        <button type="submit">{t("finish")}</button>
      </form>
    </div>
  );
};

export default Info_command;
