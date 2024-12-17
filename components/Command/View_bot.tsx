import React from "react";
import style from "@/public/style/view_bot.module.css";
import Image from "next/image";

interface BotView {
  img_url?: string;
  name: string;
  description: string;
}

const View_Bot = ({bot_view}: { bot_view: BotView }) => {
  return (
    <div className={style.view}>
      <Image
        src="/img/profile-bot.png"
        alt=""
        className={style.bot_background}
        width={1000}
        height={1000}
      />
      <Image
        src={bot_view.img_url || "/img/image-profile-default.png"}
        alt=""
        className={style.profile}
        width={100}
        height={100}
      />
      <p className={style.title_bot}>{bot_view.name.length > 19 ? bot_view.name.substr(0, 19)+"..." : bot_view.name}</p>
      <p className={style.title_bot_id}>{bot_view.name.length > 19 ? bot_view.name.substr(0, 19)+"..." : bot_view.name}</p>
      <p className={style.title_bot_role}>{bot_view.name.length > 19 ? bot_view.name.substr(0, 19)+"..." : bot_view.name}</p>
      <p className={style.description_bot}>{bot_view.description}</p>
    </div>
  );
};

export default View_Bot;
