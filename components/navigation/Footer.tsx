import style from "@/public/style/footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.copyrigth}>
        <p>MyDiscordBot</p>
        <p>© 2024 MyDiscordBot. Tous droits réservés.</p>
      </div>
      <div>
        <p>Conditions d'utilisation</p>
        <p>Politique de confidentialité</p>
        <p>Plan du site</p>
      </div>
    </footer>
  );
};

export default Footer;
