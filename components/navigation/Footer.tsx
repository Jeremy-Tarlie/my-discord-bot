import style from "@/public/style/footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.copyrigth}>
        <p>MyDiscordBot</p>
        <p>© 2024 MyDiscordBot. Tous droits réservés.</p>
      </div>
      <div>
        <Link href="/mention-legal">
          <p>Politique de confidentialité</p>
        </Link>
        <Link href="/mention-legal">
          <p>Mentions légales</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
