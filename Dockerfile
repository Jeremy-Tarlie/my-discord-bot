# Utiliser une image de base Node.js
FROM node:18-alpine

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste de votre projet dans le container
COPY . .

# Générer la version de production de l'application Next.js
RUN npm run build

# Exposer le port sur lequel Next.js écoute
EXPOSE 3000

# Lancer l'application en mode production
CMD ["npm", "start"]
