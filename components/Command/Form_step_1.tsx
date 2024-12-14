"use client";
import style from "@/public/style/form_step_1.module.css";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const Form_step_1 = ({ bot, setBot }: { bot: any; setBot: any }) => {
  const t = useTranslations("command");
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBot((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(bot);
  };

  function convertBlobToBase64(blob: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          if (typeof reader.result === "string") {
            resolve(reader.result.split(",")[1]); // Extraire la base64
          } else {
            reject(new Error("Failed to convert blob to base64"));
          }
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bot),
      });

      if (response.ok) {
        localStorage.setItem("botData", JSON.stringify(bot));

        router.push("/command_finish");
      } else {
        console.error(
          "Erreur lors de l'envoi des données :",
          await response.json()
        );
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={style.form}
      action="" // Ce champ devrait être vide ou non défini
      method="post" // Optionnel, car `fetch`
    >
      <div className={style.form_group}>
        <label>
          {t("title_bot")} <span className={style.required}>*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={bot.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={style.form_group}>
        <label>{t("img_bot")}</label>
        <input
          type="file"
          name="img"
          id="img"
          onChange={async (e: any) => {
            const fileInput = document.querySelector('input[type="file"]');
            if (!fileInput) {
              throw new Error("File input not found");
            }
            const fileInputElement = fileInput as HTMLInputElement;
            if (
              !fileInputElement.files ||
              fileInputElement.files.length === 0
            ) {
              throw new Error("No file selected");
            }
            const file = fileInputElement.files[0]; // Exemple de récupération du fichier

            // Convertir le fichier Blob en base64
            const base64Image = await convertBlobToBase64(file);

            setBot((prevData: any) => ({
              ...prevData,
              img: base64Image,
              img_url: URL.createObjectURL(e.target.files[0]),
            }));
          }}
        />
      </div>
      <div className={style.form_group}>
        <label>{t("host.title")}</label>
        <select name="host" id="host" value={bot.host} onChange={handleChange}>
          <option value="false">{t("host.false")}</option>
          <option value="true">{t("host.true")}</option>
        </select>
      </div>
      <div className={style.form_group}>
        <label>{t("description")}</label>
        <textarea
          name="description"
          id="description"
          value={bot.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className={style.form_group}>
        <label>{t("comment")}</label>
        <textarea
          name="comment"
          id="comment"
          value={bot.comment}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit">{t("next_step")}</button>
    </form>
  );
};

export default Form_step_1;
