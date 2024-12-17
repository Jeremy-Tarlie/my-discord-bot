import { useTranslations } from "next-intl";
import Image from "next/image";
import style from "@/public/style/mention_legal.module.css";

export default function MentionLegalPage() {
  const t = useTranslations("mention-legal");

  return (
    <main className={style.container_mention_legal}>
        <section>
            <h2>Éditeur du site</h2>
            <ul>
                <li><strong>Nom ou pseudonyme :</strong> khraii</li>
                {/* <li><strong>Adresse :</strong> [Ton adresse physique ou mention "Adresse sur demande"]</li> */}
                <li><strong>Email :</strong> <a href="mailto:discord@tarlie.fr">discord@tarlie.fr</a></li>
                <li><strong>Contact Discord :</strong> khraii</li>
                <li><strong>Statut :</strong> Auto-entrepreneur</li>
                {/* <li><strong>SIRET :</strong> [Si applicable]</li> */}
            </ul>
        </section>

        <section>
            <h2>Activité proposée</h2>
            <p>
                Ce site propose la <strong>création de bots Discord sur commande</strong> ainsi que leur <strong>hébergement mensuel</strong>. 
                Les conditions de commande et d'hébergement sont les suivantes :
            </p>
            <ul>
                <li><strong>Commande :</strong> Via email ou Discord.</li>
                <li><strong>Paiement :</strong> Via PayPal après validation de la commande.</li>
                <li><strong>Hébergement :</strong> Facturé entre le <strong>1er et le 5</strong> du mois.</li>
                <li><strong>Suspension :</strong> En cas de non-paiement, l'hébergement sera suspendu jusqu'à régularisation.</li>
            </ul>
        </section>

        <section>
            <h2>Politique de Confidentialité (RGPD)</h2>
            <p>
                Conformément au <strong>Règlement Général sur la Protection des Données (RGPD)</strong>, l'éditeur s'engage à protéger vos données personnelles.
            </p>
            <h3>Données collectées</h3>
            <ul>
                <li>Nom ou pseudonyme</li>
                <li>Adresse email</li>
                <li>Contact Discord</li>
                <li>Identifiant PayPal</li>
            </ul>
            <h3>Finalité du traitement</h3>
            <p>Les données sont utilisées uniquement pour :</p>
            <ul>
                <li>La gestion des commandes</li>
                <li>La facturation</li>
                <li>La communication avec le client</li>
            </ul>
            <h3>Vos droits</h3>
            <p>Vous disposez des droits suivants concernant vos données personnelles :</p>
            <ul>
                <li><strong>Droit d'accès :</strong> Consultez vos données.</li>
                <li><strong>Droit de rectification :</strong> Modifiez des informations inexactes.</li>
                <li><strong>Droit d'effacement :</strong> Demandez la suppression de vos données.</li>
                <li><strong>Droit d'opposition :</strong> Refusez le traitement de vos données dans certains cas.</li>
            </ul>
            <p>Pour exercer vos droits, contactez-nous à :  
                <a href="mailto:discord@tarlie.fr">discord@tarlie.fr</a> ou via Discord : khraii.
            </p>
        </section>

        <section>
            <h2>Litiges</h2>
            <p>En cas de litige, une solution amiable sera recherchée. À défaut, les tribunaux compétents seront ceux du lieu de résidence de l'éditeur.</p>
        </section>
    </main>
  );
}
