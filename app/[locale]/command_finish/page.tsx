"use client";
import Command from "@/components/Command_finish/Command";
import Info_command from "@/components/Command_finish/Info_command";
import style from "@/public/style/command.module.css";
import { useState, useEffect } from "react";

const Command_finish = () => {
    const [bot, setBot] = useState(() => ({
        bot_view: JSON.parse(localStorage.getItem("botData") || "{}"),
        command: [],
    }));

    useEffect(() => {
        const storedBotData = JSON.parse(localStorage.getItem("botData") || "{}");
        setBot((prevBot) => ({ ...prevBot, bot_view: storedBotData }));
    }, []);

    return (
        <main>
            <div className={style.container_commande}>
                <Command bot={bot} setBot={setBot} />
                <Info_command bot={bot} setBot={setBot} />
            </div>
        </main>
    );
};

export default Command_finish;
