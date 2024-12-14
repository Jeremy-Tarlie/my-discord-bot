import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json(); // Parse le corps de la requête
    console.log("Données reçues :", data);
    console.log(data.img);
   


    if (!data.name || !data.host) {
      return NextResponse.json({
        message: "Veuillez remplir tous les champs",
      }, { status: 400 });
    }


    // Logique de traitement des données (ex: sauvegarder dans une BDD)

    return NextResponse.json({ message: "Données reçues avec succès", data });
  } catch (error) {
    console.error("Erreur de traitement des données :", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
}


async function extractBlobData(blobUrl: string) {
  try {
    console.log(blobUrl);
    // Télécharge le blob à partir de l'URL
    const response = await fetch(blobUrl);

    if (!response.ok) {
      throw new Error(`Erreur lors du téléchargement du blob : ${response.statusText}`);
    }

    // Convertit la réponse en blob
    const blob = await response.blob();

    // Utilise FileReader pour lire le contenu du blob
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Définit le callback pour gérer les données
      reader.onload = () => resolve(reader.result); // Résultat sous forme de base64 ou texte
      reader.onerror = () => reject("Erreur lors de la lecture du blob.");

      // Lire le blob comme URL Base64
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Erreur:", error);
  }
}

