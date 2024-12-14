import { NextResponse, NextRequest } from "next/server";
var nodemailer = require("nodemailer");
import { Buffer } from "buffer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const RECAPTCHA_SECRET_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_PRIVATE_KEY;

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method === "POST") {
        try {
            const bot = await req.json();
            const { recaptchaToken, bot_view, command, price } = bot;
            const {
                name: nameBot,
                description: descriptionBot,
                host: hostBot,
                comment: commentBot,
                img_url: imageBot,
                img: imgBot,
                discord,
                email: mail, // Adresse email du client
            } = bot_view;

            
            const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
            });

            const result = await response.json();

            console.log(result);

            if (!result.success || result.score < 0.5) {
                // Échec si le score est trop bas (reCAPTCHA v3 utilise un score)
                return NextResponse.json({ error: "CAPTCHA validation failed" }, { status: 400 });
            }


            // Validation des champs obligatoires
            if (!mail || !discord || !nameBot) {
                throw new Error("Email, Discord, et Nom du bot sont obligatoires.");
            }

            if (!isValidEmail(mail)) {
                throw new Error("Email invalide.");
            }



            // Formater les commandes
            const formattedCommands = command.map(
                (cmd: { name: string; description: string }, index: number) =>
                    `<li>${index + 1}. ${cmd.name} : ${cmd.description}</li>`
            ).join("");

            const delay = command.length > 20
                ? `${Math.ceil(command.length / 3)} jours`
                : "0 jour";

            const priceMounth = hostBot === "true" ? "10€/mois" : "0€/mois";

            console.log(!!imgBot);


            // Options pour l'email principal
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: [process.env.SMTP_USER, "contact@tarlie.fr"],
                subject: "Commande d'un bot",
                attachments: !!imgBot
                    ? [
                        {
                            filename: "image.png",
                            content: Buffer.from(imgBot, "base64"),
                            contentType: "image/png",
                        },
                    ]
                    : [],
                html: `
            <div>
              <h1>Nom du bot : ${nameBot}</h1>
              <h2>${hostBot === "true" ? "Le bot sera hébergé" : "Pas d'hébergement"}</h2>
            </div>
            <h3>Le prix est de ${price}€ ${hostBot === "true" ? `avec un hébergement à ${priceMounth}` : ""}</h3>
            <p><strong>Commentaire supplémentaire :</strong> ${commentBot || "Aucun"}</p>
            <p><strong>Description du bot :</strong> ${descriptionBot}</p>
         
            <p><strong>Commandes :</strong></p>
            <ul>${formattedCommands}</ul>
            <p><strong>Commande passée par :</strong> ${discord} (${mail})</p>
          `,
            };

            // Options pour l'email de confirmation au client
            const mailOptionsConfirmation = {
                from: process.env.SMTP_USER,
                to: mail, // Destination : Email client
                subject: "Confirmation de la commande",
                text: `
            Bonjour,
            Votre commande pour le bot "${nameBot}" a bien été reçue.
            Le paiement s'effectuera via PayPal et aura lieu à la fin du projet, juste avant la livraison.
            Nous vous recontacterons prochainement.
            Bien cordialement,
          `,
            };

            // Envoyer les emails
            await sendEmail(mailOptions);
            await sendEmail(mailOptionsConfirmation);

            return NextResponse.json({ success: true });
        } catch (error: any) {
            console.error("Error processing email:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}


async function sendEmail(mailOptions: any) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
            if (error) {
                console.error("Error sending email:", error);
                reject(error);
            } else {
                console.log("Email sent:", info);
                resolve(info);
            }
        });
    });
}


function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
