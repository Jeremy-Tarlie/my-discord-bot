# Etape de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste de votre projet dans le container
COPY . .

# Générer la version de production de l'application Next.js
RUN npm run build

# Etape de production
FROM node:18-alpine

WORKDIR /app

# Copier le fichier .env depuis l'étape builder
COPY --from=builder /app ./

# Exposer le port sur lequel Next.js écoute
EXPOSE 3000

# Lancer l'application en mode production
CMD ["npm", "start"]
