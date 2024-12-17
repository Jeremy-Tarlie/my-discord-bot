"use client";
import style from "@/public/style/header.module.css";
import { useRouter } from "@/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    router.push("/", { locale: selectedLocale });
  };
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Link href="/">
          <Image
            width={50}
            height={50}
            src="/img/bot-discord-logo.png"
            alt="logo"
          />
          <p>MyDiscordBot</p>
        </Link>
        <div>
          <h3>Langue</h3>
          <select name="" id="" onChange={handleChange} value={locale}>
            <option value="fr">
              Français
            </option>
            <option value="en">
              Anglais
            </option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;
